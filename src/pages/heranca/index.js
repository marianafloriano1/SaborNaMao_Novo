import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Pressable, Image, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const scrollViewRef = useRef(null);
    const nav = useNavigation();

    const profilePics = [
        require('../../img/perfil1.png'),
        require('../../img/perfil2.png'),
        require('../../img/perfil3.png'),
        require('../../img/perfil4.png'),
        require('../../img/perfil5.png'),
        require('../../img/perfil6.png'),
    ];

    const getRandomPic = () => {
        return profilePics[Math.floor(Math.random() * profilePics.length)];
    };

    const [profilePic, setProfilePic] = useState(getRandomPic());
    const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [recipeName, setRecipeName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipeDetailsModalVisible, setRecipeDetailsModalVisible] = useState(false); // Adicionando o estado do modal de detalhes

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status === 'granted');
            loadRecipes();
        })();
    }, []);

    const loadRecipes = async () => {
        try {
            const recipes = await AsyncStorage.getItem('savedRecipes');
            if (recipes !== null) {
                setSavedRecipes(JSON.parse(recipes));
            }
        } catch (error) {
            console.error("Erro ao carregar receitas:", error);
        }
    };

    const saveRecipes = async (recipes) => {
        try {
            await AsyncStorage.setItem('savedRecipes', JSON.stringify(recipes));
        } catch (error) {
            console.error("Erro ao salvar receitas:", error);
        }
    };

    const handleTakePhoto = async () => {
        if (cameraPermission === null) {
            alert('Você precisa dar permissão para usar a câmera!');
            return;
        }
        if (cameraPermission === false) {
            alert('Permissão para usar a câmera foi negada!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSaveData = async () => {
        if (!recipeName || !authorName || !ingredients || !instructions || !photo) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos e tire uma foto.');
            return;
        }

        const newRecipe = {
            recipeName,
            authorName,
            ingredients,
            instructions,
            photo,
        };

        const updatedRecipes = [...savedRecipes, newRecipe];
        setSavedRecipes(updatedRecipes);
        await saveRecipes(updatedRecipes); // Salva no AsyncStorage

        setAddRecipeModalVisible(false);

        // Limpar os campos após salvar
        setRecipeName('');
        setAuthorName('');
        setIngredients('');
        setInstructions('');
        setPhoto(null);

        Alert.alert('Sucesso', 'Receita salva com sucesso!');
    };

    const openRecipeDetailsModal = (recipe) => {
        setSelectedRecipe(recipe);
        setRecipeDetailsModalVisible(true); // Agora o modal é aberto
    };

    const deleteRecipe = (index) => {
        Alert.alert("Excluir", "Tem certeza que deseja excluir esta receita?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                onPress: async () => {
                    const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
                    setSavedRecipes(updatedRecipes);
                    await saveRecipes(updatedRecipes); // Atualiza o AsyncStorage após excluir
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View style={styles.container}>
           <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <ImageBackground source={require('../../img/fundo_heranca.png')} style={styles.fundo}>
                    <TouchableOpacity style={styles.seta} onPress={() => nav.navigate('home')}>
                        <FontAwesome name="angle-left" size={28} color="#565656" />
                        <Text style={styles.texto_seta}>Voltar</Text>
                    </TouchableOpacity>

                    <Image source={profilePic} style={styles.perfil}></Image>
                    <Text style={styles.texto_dois}>Minhas receitas</Text>
                    <Text style={styles.texto_tres}>As receitas de família são heranças cheias de memórias e carinho, conectando gerações pelo sabor.</Text>

                    <Pressable>
                        <View style={styles.retangulo}></View>
                        <TouchableOpacity
                            style={styles.mais}
                            onPress={() => setAddRecipeModalVisible(true)}
                        >
                            <FontAwesome name="plus" size={28} color="rgba(86, 86, 86, 0.5)" />
                            <Text style={styles.texto_mais}>Aqui, você pode adicioná-las e guardá-las para que nunca se percam.</Text>
                        </TouchableOpacity>
                    </Pressable>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={addRecipeModalVisible}
                        onRequestClose={() => setAddRecipeModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.seta2} onPress={() => setAddRecipeModalVisible(false)} >
                                    <FontAwesome name="angle-left" size={28} color="#565656" />
                                    <Text style={styles.texto_seta2}>Voltar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleTakePhoto}>
                                    <Image
                                        source={photo ? { uri: photo } : require('../../img/img_heranca.png')}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>

                                <Text style={styles.texto_receita}>Nome da receita:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={recipeName}
                                    onChangeText={setRecipeName}
                                />

                                <Text style={styles.texto_receita4}>Autor da receita:</Text>
                                <TextInput
                                    style={styles.input4}
                                    value={authorName}
                                    onChangeText={setAuthorName}
                                />

                                <Text style={styles.texto_receita2}>Digite os ingredientes:</Text>
                                <TextInput
                                    style={styles.input2}
                                    value={ingredients}
                                    onChangeText={setIngredients}
                                    multiline={true}
                                    numberOfLines={5} // Número de linhas iniciais visíveis
                                />

                                <Text style={styles.texto_receita3}>Digite o modo de preparo:</Text>
                                <TextInput
                                    style={styles.input3}
                                    value={instructions}
                                    onChangeText={setInstructions}
                                    multiline={true}
                                    numberOfLines={5} // Número de linhas iniciais visíveis
                                />

                                <TouchableOpacity style={styles.botao_salvar} onPress={handleSaveData}>
                                    <Text style={styles.texto_botao}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.savedRecipesContainer}>
                        {savedRecipes.map((recipe, index) => (
                            <TouchableOpacity key={index} style={styles.recipeCard}>
                                <Image source={{ uri: recipe.photo }} style={styles.savedRecipeImage} />
                                <View style={styles.recipeTextContainer}>
                                    <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                                    <Text style={styles.authorName}>{recipe.authorName}</Text>
                                    <Text style={styles.recipeDescription}>
                                        {recipe.ingredients.substring(0, 100)}...
                                    </Text>
                                    <TouchableOpacity style={styles.viewRecipeButton} onPress={() => openRecipeDetailsModal(recipe)}>
                                        <Text style={styles.viewRecipeButtonText}>Visualizar receita</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(index)}>
                                        <FontAwesome name="trash" size={20} color="red" />
                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={recipeDetailsModalVisible}
                        onRequestClose={() => setRecipeDetailsModalVisible(false)}
                    >
                        <View style={styles.modalContainer2}>
                            <View style={styles.modalContent2}>
                                <TouchableOpacity style={styles.seta3} onPress={() => setRecipeDetailsModalVisible(false)} >
                                    <FontAwesome name="angle-left" size={28} color="#565656" />
                                    <Text style={styles.texto_seta3}>Voltar</Text>
                                </TouchableOpacity>
                                <Image source={{ uri: selectedRecipe?.photo }} style={styles.modalImage} />
                                <Text style={styles.modalText}>{selectedRecipe?.recipeName}</Text>
                                <Text style={styles.modalText2}>{selectedRecipe?.authorName}</Text>

                                {/* Exibir Ingredientes em Lista */}
                                <Text style={styles.modalTitle}>Ingredientes:</Text>
                                {selectedRecipe?.ingredients.split('\n').map((item, index) => (
                                    <Text key={index} style={styles.modalListItem}>• {item}</Text>
                                ))}

                                {/* Exibir Modo de Preparo em Lista */}
                                <Text style={styles.modalTitle2}>Modo de Preparo:</Text>
                                {selectedRecipe?.instructions.split('\n').map((step, index) => (
                                    <Text key={index} style={styles.modalListItem2}>• {step}</Text>
                                ))}
                            </View>
                        </View>
                    </Modal>


                </ImageBackground>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    seta: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
    },
    fundo: {
        width: '100%',
        height: '100%',
        marginTop: 10,
    },
    texto_seta: {
        top: -26,
        left: 23,
        fontSize: 17,
        fontFamily: 'monospace',
    },
    perfil: {
        width: 100,
        height: 100,
        left: 150,
        top: 30,
    },
    texto_dois: {
        fontSize: 16,
        fontFamily: 'monospace',
        top: 50,
        left: 130,
    },
    texto_tres: {
        fontSize: 13,
        fontFamily: 'monospace',
        top: 60,
        left: 70,
        width: 290,
    },
    retangulo: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: 350,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        left: 29,
        top: 90,
        borderRadius: 9,
        borderStyle: 'dotted',
        borderColor: '#565656',
        borderWidth: 1,
    
    },
    mais: {
        position: 'absolute',
        zIndex: 1,
        left: 189,
        top: 120,
    },
    texto_mais: {
        fontSize: 10,
        fontFamily: 'monospace',
        left: -80,
        top: 10,
        width: 230,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 10,
        width: 369,
        alignItems: 'center',
        height: 800,
    },
    seta2: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 1,
    },
    texto_seta2: {
        top: -26,
        left: 23,
        fontSize: 17,
        fontFamily: 'monospace',
    },
    input: {
        height: 40,
        width: 270,
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        color: '#565656',
        margin: 20,
        top: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
    texto_receita: {
        top: 56,
        left: -60,
        fontFamily: 'monospace',
        fontSize: 15,
    },
    input2: {
        height: 130,
        width: 270,
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        color: '#565656',
        margin: 20,
        top: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        paddingTop: 10, // Mantém o texto no topo
        textAlignVertical: 'top',
    },
    texto_receita2: {
        top: 24,
        left: -25,
        fontFamily: 'monospace',
        fontSize: 15,
    },
    texto_receita3: {
        top: 10,
        left: -18,
        fontFamily: 'monospace',
        fontSize: 15,
    },
    input3: {
        height: 130,
        width: 270,
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        color: '#565656',
        margin: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        paddingTop: 10, // Mantém o texto no topo
        textAlignVertical: 'top',
    },
    input4: {
        height: 40,
        width: 270,
        fontSize: 16,
        padding: 10,
        borderRadius: 8,
        color: '#565656',
        margin: 20,
        top: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
    texto_receita4: {
        top: 40,
        left: -50,
        fontFamily: 'monospace',
        fontSize: 15,
    },
    img: {
        width: 290,
        height: 170,
        borderRadius: 9,
        borderStyle: 'dotted',
        borderColor: '#565656',
        borderWidth: 1,
        top: 40,
    },
    photo: {
        width: 290,
        height: 170,
        borderRadius: 9,
        marginTop: 10,
    },
    savedRecipesTitle: {
        fontSize: 18,
        fontFamily: 'monospace',
        marginBottom: 10,
    },
    savedRecipe: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    savedRecipeTitle: {
        fontSize: 16,
        fontFamily: 'monospace',
    },
    savedRecipeImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
    },
    savedRecipesContainer: {
    marginTop: 30, // Adiciona um espaço entre o botão de adicionar e os cards
    paddingBottom: 20, // Evita sobreposição do último card
},

    recipeTextContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    recipeName: {
        fontSize: 18,
        fontFamily: 'monospace',
    },
    authorName: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'monospace',

    },
    recipeDescription: {
        fontSize: 12,
        fontFamily: 'monospace',
    },
    viewRecipeButton: {
        backgroundColor: '#e0e0e0',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-end',

    },
    viewRecipeButtonText: {
        fontSize: 10,
        fontFamily: 'monospace',

    },
    botao_salvar: {
        borderRadius: 5,
        backgroundColor: '#6CC696',
        height: 25,
        width: 70,
        bottom: 10,
        left: 120,
    },
    texto_botao: {
        color: '#fff',
        fontSize: 16,
        left: 11
    },

    //modal receita

    modalContainer2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent2: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 20,
        borderRadius: 10,
        width: 369,
        alignItems: 'center',
        height: 800,
    },
    seta3: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 1,
    },
    texto_seta3: {
        top: -26,
        left: 23,
        fontSize: 17,
        fontFamily: 'monospace',
    },
    modalImage: {
        width: 270,
        height: 170,
        borderRadius: 3,
        marginTop: 50,
    },
    modalText: {
        fontSize: 18,
        marginVertical: 5,
        top: 30,
        left: -90,
        fontFamily: 'monospace'
    },
    modalTitle: {
        fontSize: 18,
        marginVertical: 5,
        top: 50,
        left: -46,
        fontFamily: 'monospace'
    },
    modalListItem: {
        fontSize: 18,
        marginVertical: 5,
        top: 50,
        left: -60,
        fontFamily: 'monospace'

    },
    modalText2: {
        fontSize: 18,
        marginVertical: 5,
        top: 30,
        left: -74,
        fontFamily: 'monospace'
    },
    modalTitle2: {
        fontSize: 18,
        marginVertical: 5,
        top: 60,
        left: -30,
        fontFamily: 'monospace'
    },
    modalListItem2: {
        fontSize: 18,
        marginVertical: 5,
        top: 60,
        left: -60,
        fontFamily: 'monospace'

    },
   recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15, // Espaço entre os cards
    marginHorizontal: 20, // Para não encostar nas bordas
    elevation: 3, // Sombra para destacar
    top: 70
},

});
