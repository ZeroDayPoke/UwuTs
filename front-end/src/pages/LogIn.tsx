import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // User's login information
    const loginInfo = {
      email,
      password,
    };

    console.log("Sending login request with info:", loginInfo);

    // Send a POST request to the /login endpoint
    const response = await fetch("http://localhost:3100/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
      credentials: 'include',
    });

    console.log("Received response:", response);

    if (response.ok) {
      console.log("User successfully logged in");
      navigate("/account");
    } else {
      console.log("Error logging in");
    }
  };

  return (
    <div className="LogIn">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default LogIn;
