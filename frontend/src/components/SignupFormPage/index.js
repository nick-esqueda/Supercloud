import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signupUser } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);


  useEffect(() => {
    const validationErrors = [];
    if (email === '') validationErrors.push('please enter your email');
    if (email && !email.includes('@')) validationErrors.push('email must be a valid');
    if (username === '') validationErrors.push('please enter a username');
    if (password === '') validationErrors.push('please enter your password');
    if (confirmPassword === '') validationErrors.push('please confirm your password');
    setValidationErrors(validationErrors);

    if (!validationErrors.length) setShowErrors(false);
  }, [email, username, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) return setShowErrors(true);

    if (password === confirmPassword) {
      setValidationErrors([]);

      return dispatch(signupUser({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setValidationErrors(data.errors);
            setShowErrors(true);
          }
        });
    } else {
      setShowErrors(true);
      return setValidationErrors(['passwords must match']);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <ul>
        {showErrors && validationErrors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={256}
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
