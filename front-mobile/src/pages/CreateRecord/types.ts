export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';

export type Game = {
    id: number;
    title: string;
    platform: GamePlatform;
    label: string; // usado para integrar com o componente RNPickerSelect
    value: number; // usado para integrar com o componente RNPickerSelect
}