import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';
import { Recovery } from '../screens/Recovery';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signin" component={SignIn} />
            <Screen name="signup" component={SignUp} />
            <Screen name="recovery" component={Recovery} />
        </Navigator>
    );
}
