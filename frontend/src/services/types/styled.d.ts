// styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary2: string;
      secondary: string;
      secondaryContrast: string,
      background: string;
      backgroundTile: string;
      text: string;
      textContrast: string;
      borderColor: string;
      borderColor2: string;
      borderColor3: string;
      danger: string;

      navBackground: string;

      lectureBackground: string;
      lectureColor: string;
      practiceBackground: string;
      practiceColor: string;
      laboratoryBackground: string;
      laboratoryColor: string;
      examBackground: string;
      examColor: string;
      workshopBackground: string;
      workshopColor: string;
      discussionBackground: string;
      discussionColor: string;
    };
  }
}
