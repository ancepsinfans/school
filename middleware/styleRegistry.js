'use client';
import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, createGlobalStyle } from 'styled-components';
import constants from '@/styles/constants';


const GlobalStyles = createGlobalStyle`
  :root {

    --alertGreen65: ${constants.alertGreen65};
    --alertGreen75: ${constants.alertGreen75};
    --alertGreen85: ${constants.alertGreen85};
    --alertGreen95: ${constants.alertGreen95};
    --alertGreenMain: ${constants.alertGreenMain};
    --alertRed65: ${constants.alertRed65};
    --alertRed75: ${constants.alertRed75};
    --alertRed85: ${constants.alertRed85};
    --alertRed95: ${constants.alertRed95};
    --alertRedMain: ${constants.alertRedMain};
    --alertYellow80: ${constants.alertYellow80};
    --alertYellow90: ${constants.alertYellow90};
    --alertYellow95: ${constants.alertYellow95};
    --alertYellowMain: ${constants.alertYellowMain};
    --blackMain: ${constants.blackMain};
    --black90: ${constants.black90};
    --black80: ${constants.black80};
    --black70: ${constants.black70};
    --black60: ${constants.black60};
    --black50: ${constants.black50};
    --black40: ${constants.black40};
    --black30: ${constants.black30};
    --whitePure: ${constants.whitePure};
    --whiteMain: ${constants.whiteMain};
    --white50: ${constants.white50};
    --blueMain: ${constants.blueMain};
    --blueLight: ${constants.blueLight};
    --blueDark: ${constants.blueDark};
    --blueAccent: ${constants.blueAccent};
    --blue90: ${constants.blue90};
    --blue80: ${constants.blue80};
    --blue40: ${constants.blue40};
    --blue30: ${constants.blue30};
    --orangeMain: ${constants.orangeMain};
    --orange40: ${constants.orange40};
    --orange50: ${constants.orange50};
    --orange60: ${constants.orange60};
    --redMain: ${constants.redMain};
    --redLight: ${constants.redLight};
    --yellowMain: ${constants.yellowMain};
    --yellowLight: ${constants.yellowLight};
    --redDark: ${constants.redDark};
    --red50: ${constants.red50};
    --red70: ${constants.red70};

    ${'' /* --accentBlue40: ${constants.altAccentDark};
    --accentBlue45: ${constants.accentBlue45};
    --accentBlue50: ${constants.accentBlue50};
    --accentBlue60: ${constants.accentBlue60};
    --accentBlueMain: ${constants.accentBlueMain};
    --accentBrown35: ${constants.accentBrown35};
    --accentBrown45: ${constants.accentBrown45};
    --accentBrown55: ${constants.accentBrown55};
    --accentBrown65: ${constants.accentBrown65};
    --accentBrownMain: ${constants.accentBrownMain};
    --accentPurple70: ${constants.accentPurple70};
    --accentPurple75: ${constants.accentPurple75};
    --accentPurple80: ${constants.accentPurple80};
    --accentPurple85: ${constants.accentPurple85};
    --accentPurpleMain: ${constants.accentPurpleMain};
    --accentRed75: ${constants.accentRed75};
    --accentRed80: ${constants.accentRed80};
    --accentRed85: ${constants.accentRed85};
    --accentRed90: ${constants.accentRed90};
    --accentRedMain: ${constants.altRed};
    --alertGreen65: ${constants.alertGreen65};
    --alertGreen75: ${constants.alertGreen75};
    --alertGreen85: ${constants.alertGreen85};
    --alertGreen95: ${constants.alertGreen95};
    --alertGreenMain: ${constants.alertGreenMain};
    --alertRed65: ${constants.alertRed65};
    --alertRed75: ${constants.alertRed75};
    --alertRed85: ${constants.alertRed85};
    --alertRed95: ${constants.alertRed95};
    --alertRedMain: ${constants.alertRedMain};
    --alertYellow80: ${constants.alertYellow80};
    --alertYellow90: ${constants.alertYellow90};
    --alertYellow95: ${constants.alertYellow95};
    --alertYellowMain: ${constants.alertYellowMain};
    --black30: ${constants.black30};
    --black40: ${constants.black40};
    --black50: ${constants.black50};
    --black60: ${constants.black60};
    --blackMain: ${constants.blackMain};
    --primary65: ${constants.primary65};
    --primary70: ${constants.primary70};
    --primary75: ${constants.primary75};
    --primary80: ${constants.altMain};
    --primaryMain: ${constants.altAccent2};
    --white: ${constants.white}; */}
    --tooltip-text-color: ${constants.blackMain};
    --tooltip-margin: 40px;
    --tooltip-arrow-size: 8px;
    --navHeight: 50px;
    --shadow-color: 191deg 24% 43%;
  }

  /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}

/*
  2. Remove default margin
*/
* {
  margin: 0;
  padding: 0;
  line-height: calc(1em + 0.5rem);
}

/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: auto;
  background-color: var(--whiteMain);
}

/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  ${'' /* background-color: var(--primary80); */}
}

/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg, iframe, object {
  display: block;
  max-width: 100%;
}

/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}

/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6, li, dl, dt, blockquote {
  overflow-wrap: break-word;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

a {
  color: var(--redMain);
  text-decoration: none;
}

h2 {
font-size: 28px;
font-style: normal;
font-weight: 700;
line-height: normal;
}

p {
padding: 5px 0;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

blockquote>blockquote {
  border: 3px solid var(--blueAccent);
  background-color: var(--blueMain);
  margin: 2.5% 5%;
  padding-left: 15px;
}

hr {
  color: var(--blueAccent)
}

.school {
  color: var(--redMain)
}

.bytemd {
  height: 35vh;
}

.bytemd-fullscreen.bytemd {
  top: var(--navHeight);
  z-index: 200;
}
`
export default function StyledComponentsRegistry({
  children,
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = React.useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalStyles />
      {children}
    </StyleSheetManager>
  );
}