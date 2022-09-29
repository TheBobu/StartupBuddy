import { BrowserRouter,Switch, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { TranslationProvider } from './store/translation-context';
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
    </Switch>
    </BrowserRouter>
    </TranslationProvider>
  );
}

export default App;
