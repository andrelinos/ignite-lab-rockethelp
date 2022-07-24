import { NavigationContainer } from '@react-navigation/native';

import { Loading } from '../components/Loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../context/authContext';

export function Routes() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {user ? <AuthRoutes /> : <AppRoutes />}
        </NavigationContainer>
    );
}
