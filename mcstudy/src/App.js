import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Components/Homepage';
import Messages from './Components/Messages';
import {Route, BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/messages' component={Messages}/>
      </Router>
    </div>
  );
}

export default App;
