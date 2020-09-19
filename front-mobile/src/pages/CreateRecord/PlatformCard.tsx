import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { GamePlatform } from './types';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

// São os parâmetros da função "PlatformCard"
type Props = {
    platform: GamePlatform;
    onChange: (platform: GamePlatform) => void; // void: a função não retorna nada.
    icon: string;
    activePlatform?: GamePlatform; // A ? é para dizer que é opcional essa Prop (parâmetro)
};

const PlatformCard = ({ platform, onChange, icon, activePlatform }: Props) => {

    // Verificando qual plataforma está ativa (foi clicada)
    const isActive = platform === activePlatform;

    const backGroundColor = isActive ? '#fad7c8' : '#FFF';
    const textColor = isActive ? '#ED7947' : '#9E9E9E';

    return (
        <RectButton
            style={[styles.platformCard, {backgroundColor: backGroundColor}]}
            onPress={() => onChange(platform)}
        >
            <Icon name={icon} size={60} color={textColor} />
            <Text style={[styles.platformCardText, {color: textColor}]}>
                {platform === 'PLAYSTATION' ? 'PS' : platform}
            </Text>
        </RectButton>
    );
};

const styles = StyleSheet.create({
    platformCard: {
      paddingTop: 30,
      paddingBottom: 20,
      width: '30%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    platformCardText: {
      marginTop: 40,
      color: '#9E9E9E',
      fontSize: 24,
      fontFamily: "Play_700Bold",
      textAlign: 'center'
    },
});

export default PlatformCard;