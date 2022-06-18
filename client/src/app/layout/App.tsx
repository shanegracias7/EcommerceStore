import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AboutPage from "../../feature/about/AboutPage";
import Catalog from "../../feature/catalog/Catalog"
import ProductDetails from "../../feature/catalog/ProductDetails";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import ServerError from "../errors/ServerError";
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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/catalog/:id" component={ProductDetails} />
        <Route path="/server-error" component={ServerError} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
