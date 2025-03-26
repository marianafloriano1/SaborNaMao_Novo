import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Tooltip from 'react-native-walkthrough-tooltip';


export default function App() {


  const nav = useNavigation();

  const names = ['Mister Panela', 'Mestre Cuca', 'Chef de Plantão', 'Mastre do Tempero', 'Panela Quente', 'Sabor Divino'];
  const profilePics = [
    require('../../img/perfil1.png'),
    require('../../img/perfil2.png'),
    require('../../img/perfil3.png'),
    require('../../img/perfil4.png'),
    require('../../img/perfil5.png'),
    require('../../img/perfil6.png'),

  ];

  // Função para escolher um nome e uma foto aleatória
  const getRandomProfile = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPic = profilePics[Math.floor(Math.random() * profilePics.length)];
    return { name: randomName, pic: randomPic };
  };

  // Estado para o perfil do usuário
  const [userProfile, setUserProfile] = useState(getRandomProfile());

  const [toolTipVisible, setToolTipVisible] = useState(false);

  const items = [
    { title: 'Natal', image: require('../../img/natal.png'), route: 'ceia_natal' },
    { title: 'Páscoa', image: require('../../img/pascoa.png'), route: 'pascoa' },
    { title: 'Arraiá', image: require('../../img/junina.png'), route: 'festa_junina' },
    { title: 'Halloween', image: require('../../img/hallowen.png'), route: 'halloween' },
    { title: 'Ano Novo', image: require('../../img/anonovo.png'), route: 'ano_novo' },
    { title: 'Festas', image: require('../../img/festas.png'), route: 'festa' },
  ];
  const shadowColors = ['#FF8C8C', '#B78BF1', '#FFF28D', '#00FF37', '#E8B931', '#4A4458']; // Exemplo de cores de sombra

  const [currentIndex, setCurrentIndex] = useState(0);

  //barra de pesquisa:

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  


  return (
    <View style={styles.container}>
      <ScrollView>


        <View style={styles.fundo}>




          <Tooltip
            isVisible={toolTipVisible}
            content={
              <View style={styles.tooltipContainer}>
                {/* Nome e imagem dentro do Tooltip */}
                <View style={styles.userInfo}>
                  <View style={styles.userIcon}>
                    <Image source={userProfile.pic} style={styles.userIconImage} />
                  </View>
                  <Text style={styles.userName}>{userProfile.name}</Text>
                </View>

                {/* Botão "Minhas receitas" */}
                <TouchableOpacity style={styles.recipesButton} onPress={() => { nav.navigate('heranca'); }}>
                  <Text style={styles.recipesText}>Minhas receitas</Text>
                </TouchableOpacity>

                {/* Botão "Sair" */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => { nav.navigate('login'); }}>
                  <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
              </View>
            }
            placement="bottom"
            onClose={() => setToolTipVisible(false)}
            contentStyle={styles.tooltip}
            skipAndroidStatusBar={true}
            backgroundColor="transparent"
            showChildInTooltip={false}
            arrowStyle={{
              borderTopWidth: 13,
              marginLeft: 165,
              marginTop: 9,
              color: 'white',
            }}
          >
            {/* Ícone de perfil fora do Tooltip (perfil.png) */}
            <TouchableOpacity style={styles.touchable} onPress={() => setToolTipVisible(true)}>
              <Image source={require('../../img/perfil.png')} style={styles.perfil} />
            </TouchableOpacity>
          </Tooltip>







          <View style={styles.Containerinput}>
            <TextInput
              style={styles.input}
              placeholder="Nos diga o que está procurando"
              value={searchQuery}
              onChangeText={handleSearch}
              keyboardType="default"
            />

            <Image source={require('../../img/lupa.png')} style={styles.lupa}></Image>
          </View>

          <View style={styles.bola1}>
            <Text style={styles.texto_bola1}>Mais de dezenas de receitas</Text>
          </View>

          <View style={styles.bola2}>

          </View>

          <View style={styles.bola3}>

          </View>

          <View style={styles.quadrado_fundo}>

            <Image source={require('../../img/home.png')} style={styles.img_home}  ></Image>

          </View>
          <View style={styles.bola4}>
            <Text style={styles.texto_bola4}>Prove novos sabores!</Text>
          </View>
          <View style={styles.bola5}>

          </View>
          <View style={styles.bola6}>

          </View>


          <View style={styles.buttonRow}>


            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {items.slice(currentIndex, currentIndex + 6).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => { nav.navigate(item.route); }}
                  style={[
                    styles.carouselItem,
                    {
                      shadowColor: shadowColors[index % shadowColors.length], // Alterna entre as cores definidas
                      shadowOffset: { width: 10, height: 10 },
                      shadowOpacity: 0.8,
                      shadowRadius: 1,
                      elevation: 10,
                    }
                  ]}
                >
                  <Image style={styles.buttonImage} source={item.image} />
                  <Text style={styles.texto}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>


          </View>

          <Text style={styles.texto_filtro}>Filtros:</Text>
          <View style={styles.categorias}>
            <TouchableOpacity style={styles.categoria} onPress={() => { nav.navigate('bebidas'); }}>
              <Text style={styles.texto1}>Bebidas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoria} onPress={() => { nav.navigate('kids2'); }}>
              <Text style={styles.texto1}>Kids</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoria} onPress={() => { nav.navigate('dietas'); }}>
              <Text style={styles.texto1}>Dieta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoria} onPress={() => { nav.navigate('restricao'); }}>
              <Text style={styles.texto1}>Restrições</Text>
            </TouchableOpacity>
          </View>



        </View>

        <Text style={styles.textoo}>Clique e conheça nossas receitas:</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 40,
            marginLeft: -5,

          }}>

          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#FF8C8C',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,

              }}
              onPress={() => nav.navigate('noite_garotas')}>
              <Image style={styles.img} source={require('../../img/comida-festa.png')} />
            </Pressable>

          </View>

          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#A8D0FF',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate('morando_sozinho')}>
              <Image style={styles.img} source={require('../../img/morando-sozinho.png')} />

            </Pressable>

          </View>
        </View>


        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginLeft: 10
          }}>
          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginRight: 20,
                marginBottom: 20,
                shadowColor: '#FFF28D',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate('almoco_domingo')}>
              <Image style={styles.img} source={require('../../img/almoco-domingo.png')} />

            </Pressable>

          </View>

          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginRight: 20,
                marginBottom: 20,
                shadowColor: '#A8FFB8',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate('vegano')}>


            </Pressable>

          </View>
        </View>



        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',


          }}>


          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#B78BF1',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate('vegetariano')}>



            </Pressable>

          </View>

          <View style={{ alignItems: 'center' }}>
            <Pressable
              style={{
                width: 160,
                height: 160,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginRight: 5,
                marginBottom: 10,
                shadowColor: 'pink',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 0.3,
                elevation: 26,
                borderColor: '#565656',
                borderWidth: 0.2,
              }}
              onPress={() => nav.navigate('aniversario')}>
              <Image style={styles.img} source={require('../../img/aniversario.png')} />

            </Pressable>

          </View>



        </View>




      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',

  },
  fundo: {
    padding: 20
  },

  row: {
    justifyContent: 'flex-center',
    alignItems: 'flex-center',

  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#FF8F7E',
    justifyContent: 'start',
    fontWeight: 'bold',
    marginTop: -45

  },

  img_home: {
    width: 240,
    height: 170,
  },

  quadrado_fundo: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 190,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    top: -100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },

  Containerinput: {
    height: 40,
    width: 320,
    borderRadius: 28,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10

  },
  lupa: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft: 10

  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#565656',
    marginLeft: 33
  },

  perfil: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    top: 48
  },
  bola1: {
    backgroundColor: '#F8D12D',
    width: 110,
    height: 110,
    borderRadius: '100%',
    zIndex: 1000,
    top: 40,
    left: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },
  bola2: {
    backgroundColor: '#F8D12D',
    width: 30,
    height: 30,
    borderRadius: '100%',
    zIndex: 1000,
    top: 58,
    left: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },
  bola3: {
    backgroundColor: '#F8D12D',
    width: 15,
    height: 15,
    borderRadius: '100%',
    zIndex: 1000,
    top: 13,
    left: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
  },
  bola4: {
    backgroundColor: '#F8D12D',
    width: 110,
    height: 110,
    borderRadius: '100%',
    zIndex: 1000,
    top: -155,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    alignSelf: 'flex-end'
  },
  bola5: {
    backgroundColor: '#F8D12D',
    width: 25,
    height: 25,
    borderRadius: '100%',
    zIndex: 1000,
    top: -295,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    alignSelf: 'flex-end'
  },
  bola6: {
    backgroundColor: '#F8D12D',
    width: 15,
    height: 15,
    borderRadius: '100%',
    zIndex: 1000,
    top: -330,
    right: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    alignSelf: 'flex-end'
  },
  texto_bola1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 19,
    marginTop: 22,

  },
  texto_bola4: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 32
  },


  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    marginTop: -190
  },

  carouselItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    width: 100,
    height: 130,

  },
  buttonImage: {
    width: 90,
    height: 90,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 7
  },

  texto: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 13,
    fontFamily: 'monospace'
  },

  categorias: {
    flexDirection: 'row', // Organiza os itens em linha
    flexWrap: 'wrap', // Permite que os itens quebrem linha
    justifyContent: 'space-between', // Distribui os itens em duas colunas
    margin: 10,
    top: 20,

  },

  categoria: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '49%', // Cada item ocupa metade da linha (2 colunas)
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,


  },

  textoo: {
    fontSize: 17,
    marginLeft: 15,
    color: '#565656',
    top: 10,

  },
  texto_filtro: {
    fontSize: 17,
    marginTop: 15,
    color: '#565656',
    bottom: -10,

  },
  texto1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#565656',
    fontFamily: 'monospace'
  },
  img: {
    width: 160,
    height: 160,

  },
  reciclarContainer: {
    position: 'absolute',
    bottom: 20, // Coloca o ícone a 20 pixels do fundo
    right: 20,  // Coloca o ícone a 20 pixels da direita
    zIndex: 10, // Garante que o ícone fique acima de outros elementos
  },
  reciclarImage: {
    width: 50,
    height: 50,
  },

  //tooltip

  tooltip: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 250,
    position: 'absolute',
    top: 20,
    left: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 26,
    height: 165
  },
  tooltipContainer: {
    padding: 10,
    borderRadius: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  userIconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 16,
    color: '#000'
  },
  recipesButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F8D12D',
    borderRadius: 9,
    width: 190,
    height: 40
  },
  recipesText: {
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 15,
    paddingVertical: 3,
    paddingHorizontal: 18,
    backgroundColor: 'grey',
    borderRadius: 7,
    width: 60,
    height: 25,
    left: 160
  },
  logoutText: {
    color: 'white',
    fontSize: 13,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },


  //modais

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'

  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000
  },
  closeText: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
    fontFamily: 'monospace'
  },
  modalContent: {
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  nextButton: {
    marginTop: -70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    left: 120
  },
  nextButtonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'monospace'
  },
  seta: {
    left: 90,
    bottom: 25
  },
  nextButton2: {
    marginTop: -70,
    paddingVertical: 5,
    paddingHorizontal: 27,
    borderRadius: 8,
    left: 120,
    backgroundColor: 'rgba(248, 209, 45, 0.7)',
    height: 35,
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 19,

  },
});