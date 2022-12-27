import { useEffect, useState } from "react";
import { auth } from "./firebase";

export default function useAuth() {
    const [authUser, setAuthUser] = useState("loading");
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setAuthUser(user ?? false))
        // Unsubscribes from the auth state listener when component unmounts
        return unsubscribe
    }, []);
  
    return authUser;
}