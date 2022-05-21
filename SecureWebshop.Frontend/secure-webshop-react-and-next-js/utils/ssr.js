import { getSession } from "next-auth/react"

// Hjælpefunktion til getServerSideProps, som tager fat i session fra nextauth og returner 
// et objekt baseret på om der findes en session og om rollerne stemmer overens:
export function createRequiredAuth({ allowedRoles = [] }) {
  return async function ({ req }) {
    const session = await getSession({req: req});

    if (session && session.error) {
      return {
        redirect: {
          destination: '/auth/session-udloebet',
          permanent: false
        }
      };
    }
    
    if (session && session.user) {
      // Hvis der findes en session og rollen matcher:
      if (allowedRoles.includes(session.user.role)) {
        return {
          props: {
            user: session.user
          }
        };
      }

      // Hvis der findes en session, men hvor rollen ikke matcher:
      return {
        redirect: {
          destination: '/auth/ingen-adgang',
          permanent: false
        }
      };
    }

    // Hvis der ikke findes en session:
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    };
  };
}