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
      refreshToken: tokenResponse.data.refreshToken
    }
  }
  catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError"
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
        const loginResponse = await axios.post("http://localhost:5117/api/" + 'Auth/Login', 
          {
            email: credentials.email,
            password: credentials.password
          }
        );

        if (loginResponse.data.accessToken) {
          return loginResponse.data;
        }

        return null;
      }
      catch (e) {
        throw new Error(e);
      }
    }
  })
];

const callbacks = {
  jwt: async ({ token, user }) => {
    if (user) {
      // Kode køres ved login:
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
    }

    token = refreshAccessToken(token);
    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {
    session.accessToken = token.accessToken;
    session.error = token.error;

    return Promise.resolve(session);
  }
};

export const options = {
  providers,
  callbacks,
  pages: {},
  secret: 'PAFPkfapwsk3pkkp345pKP5KPOskap5'
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;