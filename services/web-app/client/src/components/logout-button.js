<<<<<<< HEAD
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
=======
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import './logout-button.css'
>>>>>>> web-app

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
<<<<<<< HEAD
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
=======
    <Button className="sign-out-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
>>>>>>> web-app
  );
};

export default LogoutButton;

