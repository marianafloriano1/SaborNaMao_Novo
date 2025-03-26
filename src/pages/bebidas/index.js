import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const nav = useNavigation();
  const [showSucos, setShowSucos] = useState(false);
  const [showVitaminas, setShowVitaminas] = useState(false);
  const [showChas, setShowChas] = useState(false);



  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('home')}>
          <FontAwesome name="arrow-circle-left" size={28} color="#d6705d" />
        </TouchableOpacity>
        <Text style={styles.texto2}>Área de Bebidas</Text>

        {/* Container para os Pressables com estilo flexDirection: 'row' */}
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => setShowSucos(!showSucos)} // Alterna a visibilidade dos sucos
          >
            <Text style={styles.texto}>Naturais</Text>
          </Pressable>

          <Pressable
            style={styles.pressable2}
            onPress={() => setShowVitaminas(!showVitaminas)} // Alterna a visibilidade dos sucos
          >
            <Text style={styles.texto}>Vitaminas</Text>
          </Pressable>

          <Pressable
            style={styles.pressable3}
            onPress={() => setShowChas(!showChas)} // Alterna a visibilidade dos sucos
          >
            <Text style={styles.texto}>Chás</Text>
          </Pressable>
        </View>

        <View style={styles.quadrado}>
          {showSucos && (
            <View style={styles.sucosContainer}>
              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('limao')}
              >
                <Text style={styles.texto}>Suco de Limão</Text>
              </Pressable>

              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('abacaxi')}
              >
                <Text style={styles.texto3}>Suco de Abacaxi</Text>
              </Pressable>

              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('morango')}
              >
                <Text style={styles.texto}>Suco de Morango</Text>
              </Pressable>

              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('melancia')}
              >
                <Text style={styles.texto3}>Suco de Melancia</Text>
              </Pressable>

              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('cenoura')}
              >
                <Text style={styles.texto}>Suco de Cenoura</Text>
              </Pressable>

              <Pressable
                style={styles.sucoPressable}
                onPress={() => nav.navigate('verde')}
              >
                <Text style={styles.texto3}>Suco Verde</Text>
              </Pressable>
            </View>
          )}

          {showVitaminas && (
            <View style={styles.sucosContainer}>
              <Pressable
                style={styles.vitaminaPressable}
                onPress={() => nav.navigate('vitamina_melancia')}
              >
                <Text style={styles.texto}>Vitamina de Melancia</Text>
              </Pressable>

              <Pressable
                style={styles.vitaminaPressable}
                onPress={() => nav.navigate('vitamina_banana')}
              >
                <Text style={styles.texto3}>Vitamina de Banana</Text>

              </Pressable>
              <Pressable
                style={styles.vitaminaPressable}
                onPress={() => nav.navigate('vitamina_morango')}
              >
                <Text style={styles.texto}>Vitamina de Morango</Text>
              </Pressable>

              <Pressable
                  style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('vitamina_mamao')}
              >
                  <Text style={styles.texto3}>Vitamina de Mamão</Text>
              </Pressable>

              <Pressable
                  style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('vitamina_maca')}
              >
                  <Text style={styles.texto}>Vitamina de Maçã</Text>
              </Pressable>

              <Pressable
               style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('vitamina_acai')}
              >
                  <Text style={styles.texto3}>Vitamina de Açaí</Text>
              </Pressable>

            </View>
          )}

          {showChas && (
            <View style={styles.sucosContainer}>
              <Pressable
               style={ styles.chaPressable}
                onPress={() => nav.navigate('canela')}
              >
                <Text style={styles.texto}>Chá de Canela</Text>
              </Pressable>

              <Pressable
                 style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('gengibre')}
              >
                  <Text style={styles.texto3}>Chá de Gengibre</Text>
              </Pressable>

              <Pressable
                style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('macha')}
              >
                  <Text style={styles.texto}>Chá Verde</Text>
              </Pressable>

              <Pressable
                style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('hibisco')}
              >
                  <Text style={styles.texto3}>Chá de Hibisco</Text>
              </Pressable>

              <Pressable
                 style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('laranja_cha')}
              >
                  <Text style={styles.texto}>Chá de Laranja</Text>
              </Pressable>

              <Pressable
              style={ styles.vitaminaPressable }
                onPress={() => nav.navigate('margarida')}
              >
                  <Text style={styles.texto3}>Chá de Margarida</Text>
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
  sucosContainer: {
    marginTop: 30, // Para dar espaço entre os filtros e os sucos
  },
  sucoPressable: {
    width: 170,
    height: 160,
    backgroundColor: 'rgba(255, 193, 154, 0.5)',
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
  vitaminaPressable: {
    width: 170,
    height: 160,
    backgroundColor: 'rgba(255, 187, 171,  0.5)',
    borderRadius: 25,
    marginTop: 30,
    marginLeft: 30,
    position: 'relative',
    overflow: 'hidden'
  },
  chaPressable:{
    width: 170,
    height: 160,
    backgroundColor: 'rgba(251, 202, 142, 0.5)',
    borderRadius: 25,
    marginTop: 30,
    marginLeft: 30,
    position: 'relative',
    overflow: 'hidden'
  },

});
