// styles/theme.ts
import { EThemeList } from '../types/theme.types';
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    // primary: '#7F8AEF',
    // primary: 'linear-gradient(333deg, rgba(193,174,253,1) 0%, rgba(149,234,255,1) 100%)',
    primary: 'linear-gradient(33deg, rgba(113,126,238,1) 0%, rgba(189,179,253,1) 100%)',
    primary2: '#717EEE',
    secondary: '#9f9f9f',
    secondaryContrast: '#f1f1f1',
    background: '#F4F6FA',
    backgroundTile: '#ffffff',
    text: '#131336',
    textContrast: '#ffffff',
    borderColor: '#e1e1e1',
    borderColor2: '#8a8a8a',
    borderColor3: '#CBCBCB',
    danger: '#E9513F',

    navBackground: '#F4F6FA50',

    lectureBackground: '#90D6A0',
    lectureColor: '#ffffff',
    practiceBackground: '#9885FB',
    practiceColor: '#ffffff',
    laboratoryBackground: '#ffd955',
    laboratoryColor: '#ffffff',
    examBackground: '#C4B0FF',
    examColor: '#ffffff',
    workshopBackground: '#FFBD92',
    workshopColor: '#ffffff',
    discussionBackground: '#FFBD92',
    discussionColor: '#ffffff',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: 'linear-gradient(33deg, rgba(113,126,238,1) 0%, rgba(189,179,253,1) 100%)',
    primary2: '#717EEE',
    secondary: '#1A202C',
    secondaryContrast: '#C2C2C2',
    background: '#1A1A1A',
    // backgroundTile: '#1E1E1E',
    backgroundTile: '#141414',
    text: '#ffffff',
    textContrast: '#131336',
    borderColor: '#2E3234',
    borderColor2: '#3D3E3E',
    borderColor3: '#505050',
    danger: '#E9513F',

    navBackground: '#1A1A1AAA',

    lectureBackground: '#90D6A0',
    lectureColor: '#131336',
    practiceBackground: '#95EAFF',
    practiceColor: '#131336',
    laboratoryBackground: '#DFEB8A',
    laboratoryColor: '#131336',
    examBackground: '#C4B0FF',
    examColor: '#131336',
    workshopBackground: '#FFA461',
    workshopColor: '#131336',
    discussionBackground: '#FFA461',
    discussionColor: '#131336',
  },
};

export const blackTheme: DefaultTheme = {
  colors: {
    // primary: 'linear-gradient(333deg, rgba(193,174,253,1) 0%, rgba(149,234,255,1) 100%)',
    primary: 'linear-gradient(33deg, rgba(113,126,238,1) 0%, rgba(189,179,253,1) 100%)',
    primary2: '#717EEE',
    secondary: '#7c7c7c',
    secondaryContrast: '#484848',
    background: '#000000',
    backgroundTile: '#121212',
    text: '#F7F7F7',
    textContrast: '#131336',
    borderColor: '#262829',
    borderColor2: '#3D3E3E',
    borderColor3: '#505050',
    danger: '#E9513F',
    navBackground: '#121212BB',

    lectureBackground: '#00D708',
    lectureColor: '#131336',
    practiceBackground: '#95EAFF',
    practiceColor: '#131336',
    laboratoryBackground: '#DFEB8A',
    laboratoryColor: '#131336',
    examBackground: '#C4B0FF',
    examColor: '#131336',
    workshopBackground: '#fca064',
    workshopColor: '#131336',
    discussionBackground: '#fca064',
    discussionColor: '#131336',
  },
};

export const pinkTheme: DefaultTheme = {
  colors: {
    primary: 'linear-gradient(333deg, #AA4465 0%, #861657 100%)',
    primary2: '#861657',
    secondary: '#ff1493',
    secondaryContrast: '#C2C2C2',
    background: '#fe7676',
    backgroundTile: '#ff9190',
    text: '#fcffff',
    textContrast: '#ffffff',
    borderColor: '#fb97a0',
    borderColor2: '#9c565c',
    borderColor3: '#9c565c',
    danger: '#E9513F',

    navBackground: '#fe767650',

    lectureBackground: '#90D6A0',
    lectureColor: '#131336',
    practiceBackground: '#95EAFF',
    practiceColor: '#131336',
    laboratoryBackground: '#DFEB8A',
    laboratoryColor: '#131336',
    examBackground: '#C4B0FF',
    examColor: '#131336',
    workshopBackground: '#FFBD92',
    workshopColor: '#131336',
    discussionBackground: '#FFBD92',
    discussionColor: '#131336',
  },
};

export const themes = {
  [EThemeList.LIGHT]: lightTheme,
  [EThemeList.DARK]: darkTheme,
  [EThemeList.BLACK]: blackTheme,
  [EThemeList.PINK]: pinkTheme,
  [EThemeList.AUTO]: lightTheme,
};
