import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const nav = useNavigation();
  const [showCrianca, setShowCrianca] = useState(false);
  const [showBebe, setShowBebe] = useState(false);




  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('home')}>
          <FontAwesome name="arrow-circle-left" size={28} color="#92ab79" />
        </TouchableOpacity>
        <Text style={styles.texto2}>Comidas Infantis</Text>

        {/* Container para os Pressables com estilo flexDirection: 'row' */}
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => setShowSucos(!showSucos)} // Alterna a visibilidade dos sucos
          >
            <Text style={styles.texto}>Mini chefe</Text>
          </Pressable>

          <Pressable
            style={styles.pressable2}
            onPress={() => setShowVitaminas(!showVitaminas)} // Alterna a visibilidade dos sucos
          >
            <Text style={styles.texto}>Introdução Alimentar</Text>
          </Pressable>

        </View>

        <View style={styles.quadrado}>
          {showCrianca && (
            <View style={styles.criancaContainer}>
              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('picole')}
              >
                <Text style={styles.texto}>Picolé de Iogurte</Text>
              </Pressable>

              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('bolochoco')}
              >
                <Text style={styles.texto3}>Bolo de Chocolate</Text>
              </Pressable>

              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('brigadeiro')}
              >
                <Text style={styles.texto}>Brigadeiro</Text>
              </Pressable>

              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('raspadinha')}
              >
                <Text style={styles.texto3}>Raspadinha</Text>
              </Pressable>

              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('pave')}
              >
                <Text style={styles.texto}>Pave de Chocolate</Text>
              </Pressable>

              <Pressable
                style={styles.criancaPressable}
                onPress={() => nav.navigate('danone')}
              >
                <Text style={styles.texto3}>Danoninho Caseiro</Text>
              </Pressable>
            </View>
          )}

          {showBebe && (
            <View style={styles.criancaContainer}>
              <Pressable
                style={styles.bebePressable}
                onPress={() => nav.navigate('sopa')}
              >
                <Text style={styles.texto}>Sopa</Text>
              </Pressable>

              <Pressable
                style={styles.bebePressable}
                onPress={() => nav.navigate('papinha')}
              >
                <Text style={styles.texto3}>Papinha</Text>

              </Pressable>
              <Pressable
                style={styles.bebePressable}
                onPress={() => nav.navigate('panqueca_maca')}
              >
                <Text style={styles.texto}>Panqueca de Maçã</Text>
              </Pressable>

              <Pressable
                  style={ styles.bebePressable }
                onPress={() => nav.navigate('panqueca_banana')}
              >
                  <Text style={styles.texto3}>Panqueca de Banana</Text>
              </Pressable>

              <Pressable
                  style={ styles.bebePressable }
                onPress={() => nav.navigate('pao')}
              >
                  <Text style={styles.texto}>Pão</Text>
              </Pressable>

              <Pressable
               style={ styles.bebePressable }
                onPress={() => nav.navigate('macarrao_bebe')}
              >
                  <Text style={styles.texto3}>Macarrão com Espinafre</Text>
              </Pressable>

            </View>
          )}

         

          
        

        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecece',
  },
  seta: {
    position: 'fixed',
    right: 10,
    top: 86,
    zIndex: 1,
    left: 20,
  },
  texto2: {
    fontSize: 24,
    textAlign: 'left',
    justifyContent: 'flex-start',
    marginLeft: 55,
    marginTop: 55,
  },
  texto: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  quadrado: {
    backgroundColor: 'white',
    position: 'relative',
    zIndex: -1,
    flex: 1,
    width: '100%', // ou mantenha 430 se preferir
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    top: 50,
  },
  rowContainer: {
    flexDirection: 'row', // Organiza os itens horizontalmente
    justifyContent: 'space-evenly', // Espaçamento igual entre os itens
    marginTop: 30,
  },
  pressable: {
    width: 130,
    height: 50,
    backgroundColor: '#ffc19a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pressable2: {
    width: 130,
    height: 50,
    backgroundColor: '#f28d76',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pressable3: {
    width: 130,
    height: 50,
    backgroundColor: '#fbca8e',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  criancaContainer: {
    marginTop: 30, // Para dar espaço entre os filtros e os sucos
  },
  criancaContainer: {
    width: 170,
    height: 160,
    backgroundColor: 'rgba(198, 219, 178,  0.5)',
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  teste: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bebePressable: {
    width: 170,
    height: 160,
    backgroundColor: 'rgba(193, 219, 207, 0.5)',
    borderRadius: 25,
    marginTop: 30,
    marginLeft: 30,
    position: 'relative',
    overflow: 'hidden'
  },


});
