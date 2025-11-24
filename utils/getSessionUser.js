import {authOptions} from "@/utils/authOptions";
import {getServerSession} from "next-auth";

export const getSessionUser = async (request) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return null;
        }
        return {
            id: session.user.id,
            user: session.user

        }
    } catch (error) {
        console.error('Error getting session user:', error);
        return null;
    }

}