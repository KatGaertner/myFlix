import PropTypes from "prop-types";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // because default is reloading the entire page

    const data = {
      username: username,
      password: password,
    };

    fetch("https://movie-api-93299-83ca7447ffdb.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userData) {
          localStorage.setItem("userData", JSON.stringify(data.userData));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.userData, data.token);
        } else {
          alert(data.info.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
