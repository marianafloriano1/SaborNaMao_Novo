import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, Pressable, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();

    const handleLogin = () => {
        if (email === "" || password === "") {
            Toast.show({
                type: 'error',
                text1: 'Erro...',
                text2: 'Preencha todos os campos!',
                visibilityTime: 2000,
            });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Login realizado com sucesso!',
                    visibilityTime: 2000,
                    onHide: () => navigation.navigate('home'),
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Senha ou email incorretos!',
                    visibilityTime: 2000,
                });
            });
    };

    const handleForgotPassword = () => {
        if (email === "") {
            Toast.show({
                type: 'error',
                text1: 'Erro...',
                text2: 'Digite seu email para redefinir a senha!',
                visibilityTime: 2000,
            });
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Email de redefinição enviado!',
                    visibilityTime: 2000,
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Não foi possível enviar o email!',
                    visibilityTime: 2000,
                });
            });
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.texto_cima}>Sabor Na Mão</Text>
                <Image source={require('../../img/login.png')} style={styles.imagem} />
                <View style={styles.quadrado}>
                    <Text style={styles.texto1}>Faça o Login</Text>
                    <Pressable onPress={() => navigation.navigate('cadastro')}>
                        <Text style={styles.texto}>Não tem uma conta? <Text style={styles.texto2}>Cadastre-se!</Text></Text>
                    </Pressable>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {/* Link para "Esqueci a senha" */}
                    <Pressable onPress={handleForgotPassword}>
                        <Text style={styles.textoEsqueciSenha}>Esqueci a senha</Text>
                    </Pressable>

                    <Pressable style={styles.botao} onPress={handleLogin}>
                        <Text style={styles.botaoTexto}>Entrar</Text>
                    </Pressable>
                </View>
            </View>
            <Toast /> {/* Exibir os Toasts */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 'auto',
        backgroundColor: '#F5F5F5',
    },
    texto_cima: {
        color: '#F8D12D',
        fontWeight: 'bold',
        fontSize: 37,
        marginBottom: 10,
        top: 80,
    },
    imagem: {
        width: 340,
        height: 340,
        top: 63,
        marginRight: 100
    },
    quadrado: {
        backgroundColor: '#ececec',
        width: '100%',
        height: '100%',
        borderTopRightRadius: 80,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        backgroundColor: 'rgba(108, 198, 150, 0.7)',
        borderRadius: 9,
        height: 40,
        width: 135,
        padding: 5,
        left: 104,
        top: -100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#565656',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        elevation: 15,
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17,
    },
    input: {
        height: 50,
        width: 346,
        borderWidth: 1.5,
        borderColor: 'rgba(108, 198, 150, 0.7)',
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        color: '#565656',
        margin: 20,
        top: -120
    },
    texto: {
        fontSize: 20,
        color: '#565656',
        top: -140,
    },
    texto1: {
        marginBottom: 25,
        top: -140,
        fontSize: 22,
        color: '#565656',
    },
    texto2: {
        fontSize: 20,
        color: '#839deb',
    },
    textoEsqueciSenha: {
        fontSize: 16,
        color: '#839deb',
        marginTop: -125, // Ajuste para posicionar corretamente
        marginBottom: 20,
        right: 110        
    }
});

export default LoginScreen;
