import logo from './logo.svg';
import './App.css';

// Importing Authentication
import { AuthProvider } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit';

//Pages Import
import Home from './main/Home';
import Features from './main/Features';
import Login from './login/Login';
import Triggers from './main/Triggers';

//Bootsatrap Import
import { Container, Row, Col} from 'react-bootstrap';

//Navigation Import
import Navbar from './navigation/Navbar';
import Sidebar from './navigation/Sidebar';

//Router Import
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const AuthApp = () => {
  const isAuthenticated = useIsAuthenticated()

  if(isAuthenticated()){
    return (
      <Router>
        <Navbar />
        <Container fluid style={{paddingLeft: "0px", paddingRight: "0px"}}>
        <Row>
          <Col xs="auto">
            <Sidebar />
          </Col>
          <Col>
            <Switch>
              <Route path='/Triggers'><Triggers /></Route>
              <Route path='/Features'><Features /></Route>
              <Route path='/'><Home /></Route>
            </Switch>
          </Col>
        </Row>
        </Container>
      </Router>
    );
  } 
  else {
    return (
      <>
        <Login />
      </>
    )
  }
}

const App = () => {
  return (
    <AuthProvider authStorageType = {'localstorage'}
                  authStorageName={'_auth_t'}
                  authTimeStorageName={'_auth_time'}
                  stateStorageName={'_auth_state'}>
      <AuthApp />                
    </AuthProvider>
  )
}

export default App;
