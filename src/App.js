import Movies from './Components/Movies';
/*import About from './Components/About';*/
/*import Home from './Components/Home';*/
import Nav from './Nav';
//BrowserRouter hamare app ko routing ki facility dene ke kaam aata hai aur isme sabko wrap karte hai
//Route is used to create route component
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  return (
  <Router>
    {/*exact general route jaise / hai usi ke sath lagda hai*/}
    {/*ye nav component har ek route pe aayega ye wo component hai jo page change hone pe bhi fix rahta hai*/}
    <Nav/>
    <Switch> 
      {/*path signifies kis path pe kaam karega aur uspe component konsa render hoga*/}
    {/*<Route path='/' exact component={Home}/>*/}
    <Route path='/movies' component={Movies}/>
    {/*ye bina props ke passing hai*/}
    {/* <Route path='/about' component={About} isAuth={true} /> */}
    {/*jo bhi props hame route pass karte hai wo internally hame props callback function me mil jate hai render ke, 
    uske sath hum component daal sakte
    hai jaise About aur uspe apna prop daal sakte hai{...props} ye About ka route hai agar Movies ka hota to 
    About ki jagah Movies likhte*/}
    {/*<Route path='/about' render={(props)=>(
      <About {...props} isAuth={true}/>
    )}/>*/}
  </Switch>
  </Router>
  );
}

export default App;