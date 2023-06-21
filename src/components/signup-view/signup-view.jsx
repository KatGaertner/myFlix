import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // because default is reloading the entire page

    const data = {
      name: username,
      email: email,
      password: password,
      birthday: birthday,
    };

    if (event.target.reportValidity()) {
      fetch(`https://movie-api-93299-83ca7447ffdb.herokuapp.com/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Successfully signed up!");
          } else {
            let contentType = response.headers.get("content-type");
            if (contentType.includes("text/html")) {
              response.text().then((info) => alert(info));
            } else if (contentType.includes("application/json")) {
              response.json().then((info) => {
                alert(info.errors.map((e) => e.msg).join("\n"));
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="username">
        Username:*
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={5}
          pattern="^[a-zA-Z0-9]*$"
          onInvalid={(e) => {
            if (e.target.validity.patternMismatch) {
              e.target.setCustomValidity(
                "Username can only use alphanumeric characters."
              );
            } else {
              e.target.setCustomValidity("");
            }
          }}
        />
      </label>
      <label htmlFor="email">
        E-Mail:*
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="birthday">
        Birthday:
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Password:*
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
