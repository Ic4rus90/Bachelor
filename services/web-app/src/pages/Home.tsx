import React from 'react';

function LoginButton() {
    return (
      <button>
        Login
      </button>
    );
  }

  function RegisterButton() {
    return (
      <button>
        Register
      </button>
    );
  }


  const Home: React.FC = () => {
    return (
      <div className="Home">
        <h1>Welcome to the Home Page</h1>
        <LoginButton />
        <RegisterButton />
      </div>
    );
  }
  
  export default Home;