import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    const values = [
      {
        username,
        password,
      },
    ];
    event.preventDefault();
    alert(JSON.stringify(values,null,2))
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username
            <input
              name="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
