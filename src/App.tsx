import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
   box-sizing: border-box ;
}
body {
   font-family: 'Source Sans Pro', sans-serif;
   background-color: ${props => props.theme.bgColor};
   color: ${props => props.theme.textColor};
}
a{
   text-decoration: none;
   color:inherit;
}
`;

const Buttons = styled.div`
  display: flex;
  margin: 25px 16px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  max-width: 480px;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0,0.5);
  padding:16px 16px;
  border-radius: 10px;
  color: ${(props) => props.theme.accentColor};
`;


function App() {
  const darkAtom = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const onclickBtn = () => setDarkAtom((props) => !props)
  function ModeBtn() {
    return (
      <Buttons>
        <Button onClick={onclickBtn}>mode btn</Button>
      </Buttons >
    )
  }
  return (
    <ThemeProvider theme={darkAtom ? darkTheme : lightTheme} >
      <ModeBtn />
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  )
}

export default App;
