import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../feature/catalog/Catalog"
import Header from "./Header";

function App() {
  const [darkMode,setDarkMode] =useState(true);
  const paletteMode = darkMode?'dark':'light'
  const theme = createTheme({
    palette:{
      mode:paletteMode,
      background: {
        default:paletteMode==='light'? "#eaeaea":"#121212"
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
