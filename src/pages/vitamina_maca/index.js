import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const nav = useNavigation();
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
    item9: false,
    item10: false,
    item11: false,
    item12: false,
     item13: false,
    item14: false,
        item15: false,
    item16: false,
    item17: false,
    item18: false,
    item19: false,
    item20: false,
    
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
     step10: false,
      step11: false,

  });

  // Função para alternar a marcação de um item
  const toggleCheck = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <View style={styles.container}>

<TouchableOpacity style={styles.seta} onPress={() => nav.navigate('bebidas')}>
          <FontAwesome name="arrow-circle-left" size={28} color="#f28d76" />
        </TouchableOpacity>

      <View style={styles.row}>
  
        <Text style={styles.paragraph}>
        Vitamina de maçã
        </Text>
      </View>

      <Text style={styles.ingredientes}>  INGREDIENTES</Text>
      
      <View style={styles.ingredientesContainer}>
        <View style={styles.ingredientesColuna}>
          <TouchableOpacity onPress={() => toggleCheck('item1')}>
            <Text style={styles.topicos}>
              {checkedItems.item1 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}1 maçã vermelha com casca e sem sementes;
            </Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => toggleCheck('item2')}>
            <Text style={styles.topicos}> 
              {checkedItems.item2 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}1 copo de leite desnatado gelado;
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleCheck('item3')}>
            <Text style={styles.topicos}> 
              {checkedItems.item3 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}adoçante a gosto;
            </Text>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => toggleCheck('item4')}>
            <Text style={styles.topicos}> 
              {checkedItems.item4 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>}2 gotas de essência de baunilha.
            </Text>
          </TouchableOpacity>
       
          
        </View>
      </View>

      <Text style={styles.ingredientes}>  MODO DE PREPARO</Text>
      <TouchableOpacity onPress={() => toggleCheck('step1')}>
        <Text style={styles.topicos}>
          {checkedItems.step1 ? <Text style={styles.check}>✓ </Text> : <Text style={styles.bolinha}>⚪ </Text>} <Text style={styles.numero}>1</Text>Leve todos os ingredientes para bater no liquidificador até ficar homogêneo. Sirva em seguida!
        </Text>
      </TouchableOpacity>
     
     
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fdede9',
    padding: 45,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
    color: '#f28d76',
  },

  ingredientes: {
    marginTop: 50,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f28d76',
    paddingVertical: 5,
  },
  ingredientesContainer: {
    flexDirection: 'row', // Exibe em duas colunas
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ingredientesColuna: {
    flex: 1,
    marginRight: 10,
  },
  topicos: {
    marginBottom: 10,
    lineHeight: 24,
  },
  numero: {
    color: '#f28d76',
    fontWeight: 'bold',
    fontSize: 19,
    margin: 6,
  },
  check: {
    color: '#32CD32', // Cor verde para o check
    fontSize: 20,
    marginRight: 5,
  },
});
