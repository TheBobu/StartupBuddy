import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { TranslationProvider } from './store/translation-context';
import PersonalDetailsScreen from './components/Wizard/PersonalDetailsScreen';
import ProductDescriptionScreen from './components/Wizard/ProductDescriptionScreen';
import MarketResearchScreen from './components/Wizard/MarketResearchScreen';
import MarketResearchInDetailsScreen from './components/Wizard/MarketResearchInDetailsScreen';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <TranslationProvider>
    <BrowserRouter>
    <Switch>
    <Route exact path="/auth">
      {!isLoggedIn ? <Authentication /> : <Redirect to="/" />}
     </Route>
     <Route exact path="/">
       <PersonalDetailsScreen/>
     </Route>
     <Route exact path="/productDescriptionScreen">
       <ProductDescriptionScreen/>
     </Route>
     <Route exact path="/marketResearchScreen">
       <MarketResearchScreen/>
     </Route>
     <Route exact path="/marketResearchInDetailsScreen">
       <MarketResearchInDetailsScreen/>
     </Route>
    </Switch>
    </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
