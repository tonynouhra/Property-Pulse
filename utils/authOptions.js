import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        //Invoked whenever a session is checked on successful sign in
        async signIn({profile}) {
            //1. Connect to DB
            //2. Check if user exists
            //3. If not, create user adn add to DB
            //4. Return true/false based on success/failure
            return true;
        }
        //Modifies the session object
        ,
        async session({session}) {
            //1. Connect to DB
            //2. Get user from DB based on session.user.email
            //3. assign the user id to session.user.id or Add custom fields to session objec
            //3. return session
            return session;
        }
    }
}

