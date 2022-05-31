import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt_decode from 'jwt-decode';

const baseURL = process.env.WEBSHOP_API_BASE_URL || 'http://localhost:5117/api/';

function getDecodedToken(accessToken) {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken;
  }
  catch (error) {
    return null;
  }
}

async function refreshAccessToken(tokenObject) {
  console.log(tokenObject.userId, tokenObject.refreshToken);
  try {
    const tokenResponse = await axios.post(baseURL + 'Auth/RefreshToken', {
      userId: tokenObject.userId,
      refreshToken: tokenObject.refreshToken
    });

    console.log(tokenResponse.data.refreshToken);
    const decodedToken = getDecodedToken(tokenResponse.data.accessToken);

    return {
      userId: tokenObject.userId,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpires: decodedToken?.exp ?? Date.now(),
      refreshToken: tokenResponse.data.refreshToken,
      role: decodedToken?.role
    }
  }
  catch (error) {
    console.log("error: " + error, error.message);
    return {
      ...tokenObject,
      error: "ErrorRefreshingAccessToken",
    }
  }
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "text", placeholder: "test@mail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      try {
        const user = await axios.post(baseURL + 'Auth/Login', 
          {
            email: credentials.email,
            password: credentials.password
          }
        );

        if (user.data.accessToken) {
          const decodedToken = getDecodedToken(user.data.accessToken);
          user.data.decodedToken = decodedToken;
          return user;
        }

        return null;
      }
      catch (error) {
        throw new Error(error);
      }
    }
  })
];

// jwt callback:
// Kaldes hver gang der laves et login eller der tilgås adgang til useSession/getSession:
// 'user' indeholder data som blev sendt videre i CredentialsProvider ved login
// 'token' indeholder token data per session
// session callback:
// Kaldes hver gang der bruges useSession/getSession.
// Her sendes oplysninger der er relevante for klienten!
// (Ved brug af session bliver jwt callback kaldt før session callback)
const callbacks = {
  jwt: async ({ token, user }) => {
    if (user) {
      // Kode køres kun ved login:
      token.userId = user.data.userId;
      token.accessToken = user.data.accessToken;
      token.accessTokenExpires = user.data.decodedToken?.exp ?? Date.now();
      token.refreshToken = user.data.refreshToken;
      token.role = user.data.decodedToken?.role;
      console.log(token.refreshToken);
    }

    const currentTime = Date.now();
    if (!token.accessToken || currentTime < (token.accessTokenExpires * 1000)) {
      return Promise.resolve(token);
    }

    token.accessTokenExpires = null;

    // Skaf ny token, hvis den gamle er udløbet:
    token = await refreshAccessToken(token);
    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {
    session.user.accessToken = token.accessToken;
    session.user.role = token.role;
    session.error = token.error;

    return session;
  }
};

const events = {
  // Send logout request til backend, når NextAuth logger brugeren af:
  signOut: async ({ token }) => {
    try {
      await axios.post(baseURL + 'Auth/Logout', {}, {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`
        }
      });
    }
    catch (error) {
    }
  }
}

export const options = {
  providers,
  callbacks,
  events,
  pages: {}
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;