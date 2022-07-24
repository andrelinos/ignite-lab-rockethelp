import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

type User = {
    uid: string;
    name: string;
    isAdmin: boolean;
};

type AuthContextData = {
    loading: boolean;
    user: FirebaseAuthTypes.User;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((response) => {
            setUser(response);
            setIsLoading(false);
        });

        return subscriber;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
