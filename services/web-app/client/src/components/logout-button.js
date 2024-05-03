import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import './logout-button.css'

// Component for logout button using Auth0
const LogoutButton = () => {
  const { logout } = useAuth0(); // Access logout function

  return (
    // Logout and redirect to homepage
    <Button className="sign-out-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> 
      Log Out
    </Button>
  );
};

export default LogoutButton;

