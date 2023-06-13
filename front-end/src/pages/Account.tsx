import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3100/users/account");
        if (response.status === 401) {
          setError("Not logged in");
          return;
        }
        const user = await response.json();
        setUser(user);
      } catch (err) {
        console.error(err);
        setError("An error occurred");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Your email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Account;
