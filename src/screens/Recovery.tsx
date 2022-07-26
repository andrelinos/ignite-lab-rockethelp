import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme, HStack } from 'native-base';
import { Envelope } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function Recovery() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const navigation = useNavigation();
    const { colors } = useTheme();

    function handleRecoveryAccount() {
        if (!email) {
            return Alert.alert('Recuperar conta', 'Informe seu e-mail.');
        }

        setIsLoading(true);

        auth()
            .sendPasswordResetEmail(email)

            .then(() => {
                Alert.alert(
                    'Recuperação de conta',
                    'Solicitação realizada com sucesso.' +
                        ' Verifique seu e-mail para continuar.',
                );
                navigation.navigate('signin');
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                return Alert.alert(
                    'Recuperação de conta',
                    'Não foi possível enviar pedido',
                );
            });
    }

    function handleSignUp() {
        navigation.navigate('signup');
    }

    function handleSignIn() {
        navigation.navigate('signin');
    }

    return (
        <VStack flex={1} bg="gray.600" px={8} pt={24} alignItems="center">
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Recupere sua conta
            </Heading>

            <VStack
                justifyContent={'center'}
                alignItems="center"
                space={4}
                mb={8}
            >
                <Input
                    placeholder="Informe seu e-mail"
                    InputLeftElement={
                        <Icon
                            as={<Envelope color={colors.gray[300]} />}
                            ml={4}
                        />
                    }
                    onChangeText={setEmail}
                />
            </VStack>

            <Button
                title="Recuperar conta"
                w="full"
                onPress={handleRecoveryAccount}
                isLoading={isLoading}
            />
            <HStack pt={2} px={0} w="full" justifyContent="space-between">
                <Button
                    title="Criar nova conta"
                    variant="ghost"
                    onPress={handleSignUp}
                />
                <Button
                    title="Acessar minha conta"
                    variant="ghost"
                    onPress={handleSignIn}
                />
            </HStack>
        </VStack>
    );
}
