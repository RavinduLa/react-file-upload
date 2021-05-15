import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Upload from "./components/Upload";
import Download from "./components/Download";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/upload'} exact component={Upload} />
          <Route path={'/download'} exact component={Download} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
