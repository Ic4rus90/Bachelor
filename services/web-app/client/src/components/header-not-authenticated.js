import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import securityseal from '../pages/securityseal.png';
import { useAuth0 } from '@auth0/auth0-react';



const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button variant="none" style={{ marginRight: '10px' }} onClick={() => loginWithRedirect()}>Log in</Button>;
};
  
  

const RegisterButton = () => {
    const { loginWithRedirect } = useAuth0();

    const HandleRegistration = async () => {
        await loginWithRedirect({
        appState: {
            returnTo: origin,
        },
        authorizationParams: {
            screen_hint: "signup",
        },
        });
    };

    return (
        <Button variant="outline-light" style={{ marginRight: '10px' }} onClick={HandleRegistration}>Sign up</Button>
    );
};




export default function HeaderNotAuthenticated() {
    return (
      <div className="App">
        <Navbar expand="lg" style={{ backgroundColor: '#21212B' }}  data-bs-theme="dark">
            <Container fluid>
                <img src={securityseal} height={40} alt="Security Seal Logo"/>
                <Navbar.Brand href="/" style={{ color: 'white' }}>Security Seal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <Button variant="none" style={{ color: 'white' }}>
                            Home
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="none" style={{ color: 'white' }}>
                            About
                            </Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <LoginButton />
                        <RegisterButton />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
}