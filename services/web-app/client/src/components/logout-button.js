import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import './logout-button.css'

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button className="sign-out-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;

