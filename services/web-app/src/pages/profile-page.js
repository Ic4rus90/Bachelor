/*
import LogoutButton from "../auth";


function ProfilePage() {
  return (
    <div className="Profile">
      <h1>Welcome to the Profile Page</h1>
      <LogoutButton />
    </div>
  );
}

export default ProfilePage;
*/

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {

    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default ProfilePage;