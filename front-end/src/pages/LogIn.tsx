import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";

interface LogInProps {
  onLogin: () => void;
}

function LogIn({ onLogin }: LogInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // User's login information
    const loginInfo = {
      email,
      password,
    };

    try {
      await userApi.login(loginInfo);

      // Notify parent component (App)
      onLogin();

      navigate("/account");
    } catch (error) {
      console.error(error);
      setError(error.message);
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
        {error && <p>{error}</p>}
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default LogIn;
