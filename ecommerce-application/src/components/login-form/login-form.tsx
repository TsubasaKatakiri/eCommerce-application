import { useState } from 'react';
import type { ReactElement } from 'react';
import './login-form.css';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../api/login';
import EyeClosed from '../../assets/svg/eye-see.svg?react';
import Eye from '../../assets/svg/eye-show.svg?react';
import { useNavigate } from 'react-router-dom';

const LoginForm = (): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const formError: boolean = verifyForm(email, password, setEmailError, setPasswordError);
    if (formError) return;

    setSubmitDisabled(true);
    try {
      await loginUser(email, password, dispatch);
      setFormError(undefined);
      navigate('/');
    } catch {
      setFormError('Incorrect email or password');
    } finally {
      setSubmitDisabled(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    if (event.target.value.length === 0) setEmailError('Email is required');
    if (EMAIL_REGEX.test(event.target.value) === false) setEmailError('Email is incorrect');
    else setEmailError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    if (event.target.value.length === 0) setPasswordError('Password is required');
    else setPasswordError('');
  };

  const handlePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit} className="login-form_wrapper">
      {formError && <span className="login-form_error">{formError}</span>}
      <div className="login-form_field-group">
        <label htmlFor="email" className="login-form_label">
          Email
        </label>
        <input
          className="login-form_field"
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        {emailError !== '' && <span className="login-form_error">{emailError}</span>}
      </div>
      <div className="login-form_field-group">
        <label htmlFor="password" className="login-form_label">
          Password
        </label>
        <div className="login-form_password-input">
          <input
            className="login-form_field"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <button type="button" className="login-form_password-visible-button" onClick={handlePasswordVisibility}>
            {showPassword ? <Eye width="24px" height="24px" /> : <EyeClosed width="24px" height="24px" />}
          </button>
        </div>
        {passwordError !== '' && <span className="login-form_error">{passwordError}</span>}
      </div>
      <button type="submit" disabled={submitDisabled} className="login-form_submit">
        {submitDisabled ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;

function verifyForm(
  email: string,
  password: string,
  setEmailError: (error: string) => void,
  setPasswordError: (error: string) => void,
): boolean {
  let formError = false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    setEmailError('Email is required');
    formError = true;
  } else if (!emailRegex.test(email)) {
    setEmailError('Please provide a valid email');
    formError = true;
  }
  if (!password) {
    setPasswordError('Password is required');
    formError = true;
  }
  return formError;
}
