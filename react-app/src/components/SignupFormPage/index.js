import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <ul className="modal-errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />

        <label for="uname">Username</label>
        <input
          id="uname"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Username"
          required
        />

        <label for="pwrd">Password</label>
        <input
          id="pwrd"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <label for="cpwrd">Confirm Password</label>
        <input
          id="cpwrd"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat Password"
          required
        />

        <button className="oval-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
