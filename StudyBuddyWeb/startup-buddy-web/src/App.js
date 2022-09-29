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
import CompanyDescriptionScreen from './components/Wizard/CompanyDescriptionScreen'; 
import BusinessModelScreen from './components/Wizard/BusinessModelScreen';
import BusinessModelQuestionsScreen from './components/Wizard/BusinessModelQuestionsScreen';
import BusinessModelDrawIOScreen from './components/Wizard/BusinessModelDrawIOScreen';
import FundRaisingScreen from './components/Wizard/FundRaisingScreen';
import SocialMediaScreen from './components/Wizard/SocialMediaScreen';
import PitchScreen from './components/Wizard/PitchScreen';
import Layout from './components/Layout/Layout';
import ExportDataScreen from './components/Wizard/ExportDataScreen';
import OrganizationTypeSuggestionScreen from './components/Wizard/OrganizationTypeSuggestionScreen';


function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>    
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
     <Route exact path="/companyDescriptionScreen">
       <CompanyDescriptionScreen/>
     </Route>
     <Route exact path="/businessModelScreen">
       <BusinessModelScreen/>
     </Route>
     <Route exact path="/businessModelQuestionsScreen">
       <BusinessModelQuestionsScreen/>
     </Route>
     <Route exact path="/businessModelDrawIOScreen">
       <BusinessModelDrawIOScreen/>
     </Route>
     <Route exact path="/fundRaisingScreen">
       <FundRaisingScreen/>
     </Route>
     <Route exact path="/socialMediaScreen">
       <SocialMediaScreen/>
     </Route>
     <Route exact path="/pitchScreen">
       <PitchScreen/>
     </Route>
     <Route exact path="/exportDataScreen">
       <ExportDataScreen/>
     </Route>
     <Route exact path="/suggestionsScreen">
       <OrganizationTypeSuggestionScreen/>
     </Route>
    </Switch>
    </BrowserRouter>
    </TranslationProvider>
    </Layout>
  );
}

export default App;
