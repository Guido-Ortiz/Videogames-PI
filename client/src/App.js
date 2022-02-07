import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/'>
          <Landing />
        </Route>

        <Route exact path = '/home'>
          <Home />
        </Route>

        <Route path = '/create'>
          <CreateVideogame />
        </Route>

        <Route exact path = '/home/:id'>
          <VideogameDetail />
        </Route>          

      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
