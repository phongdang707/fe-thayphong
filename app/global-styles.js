import { css, createGlobalStyle } from 'styled-components';

import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from 'assets/fonts/Roboto-Regular.ttf';
import colors from 'utils/colors';

const fontFaces = css`
  @font-face {
    font-family: 'Roboto-Bold';
    font-style: normal;
    font-weight: bold;
    src: url(${RobotoBold});
    src: url(${RobotoBold}) format('embedded-opentype'),
      url(${RobotoBold}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto-Medium';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMedium});
    src: url(${RobotoMedium}) format('embedded-opentype'),
      url(${RobotoMedium}) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    src: url(${RobotoRegular});
    src: url(${RobotoRegular}) format('embedded-opentype'),
      url(${RobotoRegular}) format('truetype');
  }
`;

const GlobalStyle = createGlobalStyle`
  ${fontFaces}
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Roboto, Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${colors.snow};
  }

  body.fontLoaded {
    font-family: 'Roboto', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', serif;
    line-height: 1.5em;
  }

  .overflow-x {
    overflow-x: auto;
    &:hover {
      ::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }
  }
  .overflow-y {
    overflow-y: auto;
    &:hover {
      ::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }
  }
  /* ::-webkit-scrollbar {
    position: absolute;
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
    -webkit-overflow-scrolling: auto;
  }
  ::-webkit-scrollbar-thumb {
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.5);
  } */
  ::-webkit-scrollbar:vertical {
    width: 7px;
    -webkit-overflow-scrolling: auto;
  }
`;

export default GlobalStyle;
