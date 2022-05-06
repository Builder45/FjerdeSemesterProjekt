import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(tokenObject) {
  try {
    const tokenResponse = await axios.post("http://localhost:5117/api/" + 'Auth/RefreshToken', {
      userId: tokenObject.userId,
      refreshToken: tokenObject.refreshToken
    });

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      expires: tokenResponse.data.accessTokenExpiration,
      refreshToken: tokenResponse.data.refreshToken
    }
  }
  catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
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
        const user = await axios.post("http://localhost:5117/api/" + 'Auth/Login', 
          {
            email: credentials.email,
            password: credentials.password
          }
        );

        if (user.data.accessToken) {
          return user;
        }

        return null;
      }
      catch (e) {
        throw new Error(e);
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
      token.expires = user.data.accessTokenExpiration;
      token.refreshToken = user.data.refreshToken;
    }

    // Skaf ny token, hvis den gamle er udløbet:
    if (Date.now() >= token.expires) {
      token = refreshAccessToken(token);
    }

    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {

    session.userId = token.userId;
    session.accessToken = token.accessToken;
    session.error = token.error;
    
    return Promise.resolve(session);
  }
};

export const options = {
  providers,
  callbacks,
  pages: {}
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;