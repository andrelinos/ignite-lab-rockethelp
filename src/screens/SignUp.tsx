import { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme, HStack, Link } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();
    const { colors } = useTheme();

    const handleSignUp = () => {
        if (email === '' || password === '') {
            return Alert.alert('Criar Conta', 'Informe e-mail e senha');
        }
        if (password !== confirmPassword) {
            return Alert.alert('Criar Conta', 'Senhas diferentes');
        }

        setIsLoading(true);
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                //console.log(response)
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Criar Conta', 'E-mail inválido.');
                }
                console.log(error);
                setIsLoading(false);
            });
    };

    function handleSignIn() {
        navigation.navigate('signin');
    }

    return (
        <VStack flex={1} bg="gray.600" px={8} pt={24} alignItems="center">
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Crie sua conta
            </Heading>

            <VStack
                justifyContent={'center'}
                alignItems="center"
                space={4}
                mb={8}
            >
                <Input
                    placeholder="E-mail"
                    InputLeftElement={
                        <Icon
                            as={<Envelope color={colors.gray[300]} />}
                            ml={4}
                        />
                    }
                    onChangeText={setEmail}
                />

                <Input
                    placeholder="Senha"
                    InputLeftElement={
                        <Icon as={<Key color={colors.gray[300]} />} ml={4} />
                    }
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <Input
                    placeholder="Confirmar senha"
                    InputLeftElement={
                        <Icon as={<Key color={colors.gray[300]} />} ml={4} />
                    }
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />
            </VStack>

            <Button
                title="Criar conta"
                w="full"
                onPress={handleSignUp}
                isLoading={isLoading}
            />
            <HStack pt={2} px={0} w="full" justifyContent="flex-end">
                <Button
                    title="Já tenho conta"
                    variant="ghost"
                    onPress={handleSignIn}
                    // isLoading={isLoading}
                />
            </HStack>
        </VStack>
    );
}
