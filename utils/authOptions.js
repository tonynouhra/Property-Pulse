import connectDB from "@/config/database";
import User from "@/models/User";
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
            await connectDB();
            //2. Check if user exists
            const userExists = await User.findOne({email: profile.email});
            if (!userExists) {
                //3. If not, create user and add to DB
                // Create a unique username by using email prefix
                const username = profile.email.split('@')[0];

                try {
                    await User.create({
                        username: username,
                        email: profile.email,
                        image: profile.picture
                    });
                } catch (error) {
                    console.log('Error creating user:', error);
                    return false;
                }
            }
            //4. Return true/false based on success/failure
            return true;
        }
        //Modifies the session object
        ,
        async session({session}) {
            //1. Connect to DB
            await connectDB();

            //2. Get user from DB based on session.user.email
            const user = await User.findOne({email: session.user.email});
            if (user) {
                session.user.id = user._id.toString();// Convert ObjectId to string
            }
            //3. assign the user id to session.user.id or Add custom fields to session objec
            //3. return session
            return session;
        }
    }
}

