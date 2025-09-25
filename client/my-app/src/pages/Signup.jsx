import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetAuthState } from "../features/auth/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { loading, error, signupSuccess } = useSelector((state) => state.auth);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  
  useEffect(() => {
    if (signupSuccess) {
      alert("Signup successful! Please login.");
      navigate("/login");
      dispatch(resetAuthState()); 
    }
  }, [signupSuccess, navigate, dispatch]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const validate = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (!nameRegex.test(name)) {
      return "Name must contain only letters and spaces.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters and include an uppercase letter.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setLocalError("");

    dispatch(
      signupUser({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
    );
  };

  return (
    <div className="card">
      <h2 className="login-title">Signup</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="signup-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="toggle-password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="signup-input"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="toggle-password"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {(localError || error) && (
          <p className="login-error">{localError || error}</p>
        )}

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="login-switch">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Login here
        </Link>
      </p>
    </div>
  );
}
