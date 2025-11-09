'use client';

import {SessionProvider} from "next-auth/react";


// what ever we wrap it will pass here as children
const AuthProvider = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default AuthProvider;