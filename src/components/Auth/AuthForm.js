/*
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./AuthForm.css"; // Assuming you've created the CSS file for styling

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <div className="auth-modal">
      <div className="auth-header">
        {/* <Link to="/" className="close-button">
          &times;
        </Link> }
        <h2 className="auth-title">{isSignup ? "Signup" : "Login"}</h2>

      </div>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-container">
          {!isAdmin && isSignup && (
            <>
              <label className="auth-label">Name</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                type="text"
                name="name"
                className="auth-input"
              />
            </>
          )}
          <label className="auth-label">Email</label>
          <input
            value={inputs.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="auth-input"
          />
          <label className="auth-label">Password</label>
          <input
            value={inputs.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="auth-input"
          />
          <button type="submit" className="auth-submit-button">
            {isSignup ? "Signup" : "Login"}
          </button>
          {!isAdmin && (
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="auth-toggle-button"
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
*/

// Signup Validation

import React, { useState } from "react";
import "./AuthForm.css"; // Ensure the CSS file is there

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  const [isSignup, setIsSignup] = useState(true);
  const [errors, setErrors] = useState({}); // For validation errors

  const validateInputs = () => {
    let errors = {};
    if (isSignup && (!inputs.name || !/^[A-Za-z\s]+$/.test(inputs.name))) {
      errors.name = "Name must contain only letters.";
    }
    if (!inputs.email || !/^\S+@\S+\.\S+$/.test(inputs.email)) {
      errors.email = "Invalid email format.";
    }
    if (!inputs.password || inputs.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    
    return errors;
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <div className="auth-modal">
      <div className="auth-header">
        <h2 className="auth-title">{isSignup ? "Signup" : "Login"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-container">
          {!isAdmin && isSignup && (
            <>
              <label className="auth-label">Name</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                type="text"
                name="name"
                className="auth-input"
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </>
          )}
          <label className="auth-label">Email</label>
          <input
            value={inputs.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="auth-input"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <label className="auth-label">Password</label>
          <input
            value={inputs.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="auth-input"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

        

          <button type="submit" className="auth-submit-button">
            {isSignup ? "Signup" : "Login"}
          </button>

          {!isAdmin && (
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="auth-toggle-button"
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

