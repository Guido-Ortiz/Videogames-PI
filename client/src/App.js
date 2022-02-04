import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path = '/home'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
