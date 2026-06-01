import { createContext, PropsWithChildren, use, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/auth-js/dist/module/lib/types';

// Type for the authentication context data, session can be null if the user is not authenticated

type AuthData ={
    session: Session | null;
    loading: boolean
};

// Create the authentication context with default values

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true
});

// AuthProvider component to wrap the app and provide authentication state to all child components.

export default function AuthProvider({children}: PropsWithChildren) {

    // State to hold the current session, initialized to null

    const [session, setSession] = useState<Session | null>(null);
    // Initially true because when we mount we want to check if there is an existing session. Once we have checked, we can set it to false to indicate that loading is complete.
    const [loading, setLoading] = useState(true);

    // useEffect to fetch the current session when the component mounts and set it in the state. This ensures that the app knows if the user is already authenticated when it loads. Mounting means that the component is being rendered for the first time, so this is a good place to check for an existing session.

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            setSession(data.session);
            if (error) {
                console.error('Error fetching session:', error);
            }
            // Only when we have finished checking for the session do we set loading to false, which allows the app to render the appropriate screens based on whether the user is authenticated or not.
            setLoading(false);
        };

        fetchSession();
        // Listen for authentication state changes (e.g., sign in, sign out) and update the session state accordingly. This ensures that the app stays in sync with the user's authentication status in real-time.
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <AuthContext.Provider value={{session, loading}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);