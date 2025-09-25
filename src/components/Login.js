import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isReset) {
        const { error } = await resetPassword(formData.email);
        if (error) {
          setMessage(`Error: ${error.message}`);
        } else {
          setMessage('Password reset email sent! Check your inbox.');
          setIsReset(false);
        }
      } else if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setMessage('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          setMessage(`Error: ${error.message}`);
        } else {
          // Email confirmation disabled – user should be able to sign in immediately
          setMessage('Account created! You can sign in now.');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setMessage(`Error: ${error.message}`);
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '' });
    setMessage('');
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
    setIsReset(false);
    resetForm();
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
    setIsReset(false);
    resetForm();
  };

  const switchToReset = () => {
    setIsReset(true);
    setIsSignUp(false);
    resetForm();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logowings.png" alt="Logo" className="login-logo" />
          <h2 className="login-title">
            {isReset ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="login-subtitle">
            {isReset 
              ? 'Enter your email to reset your password' 
              : isSignUp 
                ? 'Sign up for Anteros' 
                : 'Sign in to your account'
            }
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {!isReset && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>
          )}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                minLength="6"
              />
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading 
              ? 'Loading...' 
              : isReset 
                ? 'Send Reset Email' 
                : isSignUp 
                  ? 'Create Account' 
                  : 'Sign In'
            }
          </button>

          {message && (
            <div className={`login-message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="login-footer">
          {!isReset && (
            <>
              {isSignUp ? (
                <p>
                  Already have an account?{' '}
                  <button type="button" className="link-button" onClick={switchToSignIn}>
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button type="button" className="link-button" onClick={switchToSignUp}>
                    Sign Up
                  </button>
                </p>
              )}
              
              {!isSignUp && (
                <p>
                  <button type="button" className="link-button" onClick={switchToReset}>
                    Forgot your password?
                  </button>
                </p>
              )}
            </>
          )}

          {isReset && (
            <p>
              Remember your password?{' '}
              <button type="button" className="link-button" onClick={switchToSignIn}>
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
