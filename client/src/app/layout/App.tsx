import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AboutPage from "../../feature/about/AboutPage";
import BasketPage from "../../feature/basket/BasketPage";
import { setBasket } from "../../feature/basket/basketSlice";
import Catalog from "../../feature/catalog/Catalog"
import ProductDetails from "../../feature/catalog/ProductDetails";
import CheckoutPage from "../../feature/checkout/CheckoutPage";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContest";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import Loading from "./Loading";

function App() {
  const dispatch = useAppDispatch()
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie('buyerId')
    if(buyerId){
      agent.Basket.get()
      .then(basket=>dispatch(setBasket(basket)))
      .catch(error=>console.error(error))
      .finally(()=>setLoading(false))
    }
    else setLoading(false)
  },[setBasket])

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

  if(loading)  return <Loading message="initialising app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
        
      </Container>
    </ThemeProvider>
  );
}

export default App;
