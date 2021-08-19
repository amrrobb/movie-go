import './App.css';
import {Switch, Route} from 'react-router-dom'
import {Home, Edit, Detail, Favorites, Search} from './views'
import {NavBar, AddForm} from './components'

function App() {
  return (
    <>
    <NavBar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/add">
        <AddForm />
      </Route>
      <Route path="/favorites">
        <Favorites />
      </Route>
      <Route path="/detail/:id">
        <Detail/>
      </Route>
      <Route path="/edit/:id">
        <Edit />
      </Route>
      <Route path="/search/:input">
        <Search />
      </Route>
    </Switch>
    </>
  );
}

export default App;