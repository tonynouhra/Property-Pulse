import {authOptions} from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);// API route for NextAuth authentication

export {handler as GET, handler as POST}; // Exporting the handler for both GET and POST requests