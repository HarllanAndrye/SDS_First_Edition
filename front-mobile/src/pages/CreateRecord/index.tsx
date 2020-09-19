import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import RNPickerSelect from 'react-native-picker-select'; // Usado para criar um comboBox
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import Axios from 'axios';
import { RectButton } from 'react-native-gesture-handler'; // Criar o botão


// Criando objeto para o "RNPickerSelect"
const placeholder = {
  label: 'Selecione o Game',
  value: null
}

const BASE_URL = "http://192.168.1.8:8080"; // Não pode utilizar "localhost", tem que ser o IP da máquina

// Função para converter a estrutura retornada da API para a estrutura lida pelo RNPickerSelect
const mapSelectValues = (games: Game[]) => {
  return games.map(game => ({
    ...game, // Obter tudo que já existe no objeto game
    label: game.title,
    value: game.id
  }));
};

const CreateRecord = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>(); // criando um estado do tipo GamePlatform
  const [selectedGame, setSelectedGame] = useState(''); // Estado para representar o que o usuário selecionou no comboBox
  const [allGames, setAllGames] = useState<Game[]>([]); // Estado para armazenar todos os jogos (uma lista) para ser adicionada ao comboBox.
  const [filteredGames, setFilteredGames] = useState<Game[]>([]); // Estado para os jgos filtrados de acordo com a plataforma

  const handleChangePlatform = (selectedPLatform: GamePlatform) => {
    setPlatform(selectedPLatform);
    // Criando o filtro da plataforma, ou seja, quando clicar em uma plataforma, filtra os jogos referentes a mesma
    const gamesByPlatform = allGames.filter(game => game.platform === selectedPLatform);
    setFilteredGames(gamesByPlatform);
  };

  const handleSubmit = () => {
    const payload = {name, age, gameId: selectedGame}; // Mesma estrutura que a API recebe para salvar os dados
    Axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        Alert.alert('Dados salvos com sucesso!');
        setName('');
        setAge('');
        setSelectedGame('');
        setPlatform(undefined);
      })
      .catch(() => Alert.alert('Erro ao salvar os dados!'));
  };

  // Quando o componete for inicializado, o código dentro do useEffect será executado.
  useEffect(() => {
    Axios.get(`${BASE_URL}/games`)
      .then(response => {
        const selectValues = mapSelectValues(response.data);
        setAllGames(selectValues);
      })
      .catch(() => Alert.alert('Erro ao listar os jogos!'));
  }, []);

    return (
        <>
            <Header />
            <View style={styles.container}>
              <TextInput
                style={styles.inputText} 
                placeholder="Nome" 
                placeholderTextColor="#9E9E9E" 
                onChangeText={text => setName(text)} 
                value={name}
              />
              <TextInput 
                style={styles.inputText} 
                placeholder="Idade" 
                placeholderTextColor="#9E9E9E" 
                keyboardType="numeric" maxLength={3} 
                onChangeText={text => setAge(text)} 
                value={age}
              />
              <View style={styles.platformContainer}>
                <PlatformCard platform="PC" icon="laptop" activePlatform={platform} onChange={handleChangePlatform} />
                <PlatformCard platform="XBOX" icon="xbox" activePlatform={platform} onChange={handleChangePlatform} />
                <PlatformCard platform="PLAYSTATION" icon="playstation" activePlatform={platform} onChange={handleChangePlatform} />
              </View>
              <RNPickerSelect
                placeholder={placeholder}
                value={selectedGame}
                onValueChange={value => setSelectedGame(value)}
                items={filteredGames}
                style={pickerSelectStyles}
                Icon={() => {
                  return <Icon name="chevron-down" color="#9E9E9E" size={25} />
                }}
              />
              <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>SALVAR</Text>
                </RectButton>
              </View>
            </View>
        </>
    );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});

const styles = StyleSheet.create({
    container: {
      marginTop: '15%',
      paddingRight: '5%',
      paddingLeft: '5%',
      paddingBottom: 50
    },
    inputText: {
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      fontFamily: "Play_700Bold",
      fontSize: 16,
      paddingLeft: 20,
      marginBottom: 21
    },
    platformContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footer: {
      marginTop: '15%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#00D4FF',
      flexDirection: 'row',
      borderRadius: 10,
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: "Play_700Bold",
      fontWeight: 'bold',
      fontSize: 18,
      color: '#0B1F34',
    }
});

export default CreateRecord;