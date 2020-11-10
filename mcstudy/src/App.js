import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Components/Homepage';
import Messages from './Components/Messages';
import RateaCourse from './Components/RateaCourse';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import CourseReviews from './Components/CourseReviews';
import Navigation from './Components/Navigation';


function App() {
  return (
    <div className="app">
      <Navigation />
      <Router>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/messages' component={Messages}/>
        <Route path='/rateacourse' component={RateaCourse}/>
        <Route path='/coursereviews' component={CourseReviews}/>
      </Router>
    </div>
  );
}

export default App;
