import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable, Image, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSignup = () => {
    if (email === "" || password === "") {
      Toast.show({
        type: 'error',
        text1: 'Erro...',
        text2: 'Preencha todos os campos!',
        visibilityTime: 2000,
      });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Cadastro realizado com sucesso!',
          visibilityTime: 2000,
          onHide: () => navigation.navigate('login') // Atraso de 2 segundos antes de navegar
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.texto_cima}>Sabor Na Mão</Text>
        <Image source={require('../../img/cadastro.png')} style={styles.imagem} />
        <View style={styles.quadrado}>
          <Text style={styles.texto1}>Crie sua conta</Text>
          <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={styles.texto}>Já tem uma conta? <Text style={styles.texto2}>Faça o login</Text></Text>
          </Pressable>

          <TextInput
            style={styles.input}
            placeholder="Crie seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Crie sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.texto3}>*mínimo 6 caracteres</Text>

          <Pressable style={styles.botao} onPress={handleSignup}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} /> {/* Adicione o Toast aqui */}
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
    top: 80
  },
  imagem: {
    width: 360,
    height: 360,
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
    backgroundColor: 'rgba(248, 209, 45, 0.7)',
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
    borderColor: 'rgba(248, 209, 45, 0.7)',
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
  texto3: {
    fontSize: 12,
    color: 'red',
    top: -135,
    left: -110
  },
});

export default SignupScreen;