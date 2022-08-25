import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateVideogame from "./components/CreateVideogame";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateVideogame} />
        <Route exact path="/detail/:idVideogame" component={CardDetail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
