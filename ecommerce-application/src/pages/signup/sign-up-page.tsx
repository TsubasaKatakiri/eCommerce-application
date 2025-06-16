import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-up-page.css';
import { registerUser } from '../../api/register';

import EyeClosed from '../../assets/svg/eye-see.svg?react';
import Eye from '../../assets/svg/eye-show.svg?react';
import { useAppDispatch } from '../../store/hooks';
import { loginUser } from '../../api/login';
import { routeList } from '../../const/routes';
import { passwordChecker } from '../../helpers/password-checker';
import { checkAge } from '../../helpers/check-age';
import { checkPostalCode } from '../../helpers/check-postal-code';
import { showToast } from '../../store/toast-slice';

export type Data = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  billingStreet: string;
  billingCity: string;
  billingCountry: string;
  billingPostal: string;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostal: string;
  defaultBillingAddress: boolean;
  defaultShippingAddress: boolean;
  isSameAddress: boolean;
};

const SignUpPage = (): ReactElement => {
  const [defaultShippingAddress, setdefaultShippingAddress] = useState<boolean>(false);
  const [defaultBillingAddress, setdefaultBillingAddress] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  //New form - main fields

  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [firstNameError, setFirstNameError] = useState<string | undefined>();
  const [lastNameError, setLastNameError] = useState<string | undefined>();
  const [dateOfBirthError, setDateOfBirthError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  //new form - address fields

  const [billingStreet, setBillingStreet] = useState<string>('');
  const [billingCity, setBillingCity] = useState<string>('');
  const [billingCountry, setBillingCountry] = useState<string>('');
  const [billingPostal, setBillingPostal] = useState<string>('');
  const [shippingStreet, setShippingStreet] = useState<string>('');
  const [shippingCity, setShippingCity] = useState<string>('');
  const [shippingCountry, setShippingCountry] = useState<string>('');
  const [shippingPostal, setShippingPostal] = useState<string>('');

  const [billingStreetError, setBillingStreetError] = useState<string | undefined>();
  const [billingCityError, setBillingCityError] = useState<string | undefined>();
  const [billingPostalError, setBillingPostalError] = useState<string | undefined>();
  const [shippingStreetError, setShippingStreetError] = useState<string | undefined>();
  const [shippingCityError, setShippingCityError] = useState<string | undefined>();
  const [shippingPostalError, setShippingPostalError] = useState<string | undefined>();

  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const data: Data = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      billingStreet,
      billingCity,
      billingCountry,
      billingPostal,
      shippingStreet,
      shippingCity,
      shippingCountry,
      shippingPostal,
      defaultBillingAddress,
      defaultShippingAddress,
      isSameAddress,
    };
    setSubmitDisabled(true);
    try {
      await registerUser(data);
      dispatch(showToast({ status: 'success', text: 'Registered successfully. Logging in...' }));
      await loginUser(data.email, data.password, dispatch);
      setFormError(undefined);
      navigate('/');
    } catch {
      dispatch(showToast({ status: 'error', text: 'Something went wrong, please, check all fields and try again' }));
      setFormError('Something went wrong, please, check all fields and try again');
    } finally {
      setSubmitDisabled(false);
    }
  };

  const countries: string[][] = [
    ['Germany',  'DE'],
    ['United States', 'US'],
    ['Russia', 'RU'],
    ['Belarus', 'BY'],
    ['France', ' FR'],
    ['Spain', 'ES'],
  ];

  const optionsBilling = countries.map((country, index) => {
    return (
      <option className="singup-form__option" value={country[1]} key={index}>
        {countries[index][0]}
      </option>
    );
  });
  const optionsShipping = countries.map((country, index) => {
    return (
      <option className="singup-form__option" value={country[1]} key={index}>
        {countries[index][0]}
      </option>
    );
  });

  //Normal field handlers

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(event.target.value.length === 0) setLastNameError('Must contain at least one character');
    else if (emailRegex.test(event.target.value) === false) setEmailError('Must be a valid email');
    else setEmailError(undefined);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(event.target.value);
    passwordChecker(event.target.value, setPasswordError);
  }

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
    const firstNameRegex = /^[A-Za-z\s-/]+$/;
    if(event.target.value.length === 0) setFirstNameError('Must contain at least one character');
    else if (firstNameRegex.test(event.target.value) === false) setFirstNameError('Must contain no special characters or numbers');
    else setFirstNameError(undefined);
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
    const lastNameRegex = /^[A-Za-z\s-/]+$/;
    if(event.target.value.length === 0) setLastNameError('Must contain at least one character');
    else if (lastNameRegex.test(event.target.value) === false) setLastNameError('Must contain no special characters or numbers');
    else setLastNameError(undefined);
  }

  const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateOfBirth(event.target.value);
    const selectedDate = new Date(event.target.value);
    if(!checkAge(selectedDate)) setDateOfBirthError('Must be at least 13 years old');
    else setDateOfBirthError(undefined);
  }

  //Address field handlers

  const handleStreetName = (event: React.ChangeEvent<HTMLInputElement>, setStreetName: (name: string) => void, setStreetNameError: (error: string | undefined) => void):void => {
    setStreetName(event.target.value);
    if(event.target.value.length === 0) setStreetNameError('Must contain at least one character');
    else setStreetNameError(undefined);
  }
  
  const handleCity = (event: React.ChangeEvent<HTMLInputElement>, setCity: (name: string) => void, setCityError: (error: string | undefined) => void):void => {
    setCity(event.target.value);
    const cityRegex = /^[A-Za-z\s-/]+$/
    if(event.target.value.length === 0) setCityError('Must contain at least one character');
    else if (cityRegex.test(event.target.value) === false) setCityError('Must contain no special characters or numbers');
    else setCityError(undefined);
  }
  
  const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>, setCountry: (name: string) => void): void => {
    setCountry(event.target.value);
  }
  
  useEffect(() => {
    if(billingPostal && billingPostal.length > 0){
      checkPostalCode(billingCountry, billingPostal, setBillingPostalError);
    }
  }, [billingPostal, billingCountry])

  useEffect(() => {
    if(shippingPostal && shippingPostal.length > 0){
      checkPostalCode(shippingCountry, shippingPostal, setShippingPostalError);
    }
  }, [shippingPostal, shippingCountry])
  
  const handlePostalCode = (event: React.ChangeEvent<HTMLInputElement>, setPostalCode: (name: string) => void):void => {
    setPostalCode(event.target.value);
  }

  //same address

  const handleSetSameAddress = ():void => {
    if(isSameAddress){
      setIsSameAddress(false);
    } else {
      setIsSameAddress(true);
      setShippingStreet(billingStreet)
      setShippingCity(billingCity)
      setShippingCountry(billingCountry);
      setShippingPostal(billingPostal);
    }
  }

  const isFormValid = () => 
      firstName.trim()
    && lastName.trim()
    && email.trim()
    && dateOfBirth
    && password
    && billingStreet.trim()
    && billingCity.trim()
    && billingCountry
    && billingPostal
    && shippingStreet.trim()
    && shippingCity.trim()
    && shippingCountry
    && shippingPostal
    && !firstNameError
    && !lastNameError
    && !dateOfBirthError
    && !emailError
    && !passwordError
    && !billingStreetError
    && !billingCityError
    && !billingPostalError
    && !shippingStreetError
    && !shippingCityError
    && !shippingPostalError

  return (
    <>
      <div className="signup_wrapper">
        <form className="singup-form__wrapper" onSubmit={onSubmit}>
          <h1 className="singup-form__title">Sign Up</h1>
          <p className="singup-form__register">Have you not registered yet?</p>
          {formError && <span className="singup-form__error">{formError}</span>}
          <div className="signup-form__group">
            <label className="singup-form__label">Email</label>
            <div className="singup-form__input-group">
              <input
                className="singup-form__input"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError !== '' && <span className="user-data_error">{emailError}</span>}
            </div>
          </div>

          <div className="signup-form__group">
            <label className="singup-form__label">Password</label>
            <div className="singup-form__input-group">
              <div className="singup-form__input-password">
                <input
                  className="singup-form__input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="signup-form_password-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? <Eye width="24px" height="24px" /> : <EyeClosed width="24px" height="24px" />}
                </button>
              </div>
              {passwordError !== '' && <span className="login-form_error">{passwordError}</span>}
            </div>
          </div>

          <div className="signup-form__group">
            <label className="singup-form__label">Firstname</label>
            <div className="singup-form__input-group">
              <input
                className="singup-form__input"
                placeholder="firstname"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {firstNameError !== '' && <span className="user-data_error">{firstNameError}</span>}
            </div>
          </div>

          <div className="signup-form__group">
            <label className="singup-form__label">Lastname</label>
            <div className="singup-form__input-group">
              <input
                className="singup-form__input"
                placeholder="lastname"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {lastNameError !== '' && <span className="user-data_error">{lastNameError}</span>}
            </div>
          </div>

          <div className="signup-form__group">
            <label className="singup-form__label">Birthday</label>
            <div className="singup-form__input-group">
              <input
                className="singup-form__input"
                type="date"
                placeholder="birthday"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
              {dateOfBirthError !== '' && <span className="user-data_error">{dateOfBirthError}</span>}
            </div>
          </div>

          <div className="signup-form__address">
            <fieldset className="singup-form__fielset">
              <legend className="singup-form__legend">Billing Address</legend>

              <div className="signup-form__group">
                <label className="singup-form__label">Street</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="street"
                    value={billingStreet}
                    onChange={(e) => handleStreetName(e, setBillingStreet, setBillingStreetError)}
                  />
                  {billingStreetError !== '' && <span className="user-data_error">{billingStreetError}</span>}
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label">City</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="city"
                    value={billingCity}
                    onChange={(e) => handleCity(e, setBillingCity, setBillingCityError)}
                  />
                  {billingCityError !== '' && <span className="user-data_error">{billingCityError}</span>}
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label">Country</label>
                <div className="singup-form__input-group">
                  <select
                    className="singup-form__select"
                    value={billingCountry}
                    onChange={(e) => handleCountry(e, setBillingCountry)}
                  >
                    {optionsBilling}
                  </select>
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label">Postal</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="postal"
                    value={billingPostal}
                    onChange={(e) => handlePostalCode(e, setBillingPostal)}
                  />
                  {billingPostalError !== '' && <span className="user-data_error">{billingPostalError}</span>}
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label-chetbox">
                  <input
                    className="singup-form__checkbox"
                    type="checkbox"
                    checked={defaultBillingAddress}
                    onChange={() => setdefaultBillingAddress(!defaultBillingAddress)}
                  />
                  <div className="singup-form__custom-checkbox"></div>
                  Use this as the default billing address
                </label>
              </div>
            </fieldset>

            <fieldset className="singup-form__fielset">
              <legend className="singup-form__legend">Shipping Address</legend>

              <div className="signup-form__group">
                <label className="singup-form__label">Street</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="street"
                    value={shippingStreet}
                    onChange={(e) => handleStreetName(e, setShippingStreet, setShippingStreetError)}
                  />
                  {shippingStreetError !== '' && <span className="user-data_error">{shippingStreetError}</span>}
                </div>
              </div>
              <div className="signup-form__group">
                <label className="singup-form__label">City</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="city"
                    value={shippingCity}
                    onChange={(e) => handleCity(e, setShippingCity, setShippingCityError)}
                  />
                  {shippingCityError !== '' && <span className="user-data_error">{shippingCityError}</span>}
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label">Country</label>
                <div className="singup-form__input-group">
                  <select
                    className="singup-form__select"
                    value={shippingCountry}
                    onChange={(e) => handleCountry(e, setShippingCountry)}
                  >
                    {optionsShipping}
                  </select>
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label">Postal</label>
                <div className="singup-form__input-group">
                  <input
                    className="singup-form__input"
                    placeholder="postal"
                    value={shippingPostal}
                    onChange={(e) => handlePostalCode(e, setShippingPostal)}
                  />
                  {shippingPostalError !== '' && <span className="user-data_error">{shippingPostalError}</span>}
                </div>
              </div>

              <div className="signup-form__group">
                <label className="singup-form__label-chetbox">
                  <input
                    className="singup-form__checkbox"
                    type="checkbox"
                    checked={defaultShippingAddress}
                    onChange={() => setdefaultShippingAddress(!defaultShippingAddress)}
                  />
                  <div className="singup-form__custom-checkbox"></div>
                  Use this as the default shipping address
                </label>
              </div>
            </fieldset>
          </div>

          <div className="singup-form__group-commonaddress">
            <label className="singup-form__label-checkbox">
              <input
                className="singup-form__checkbox"
                type="checkbox"
                checked={isSameAddress}
                onChange={handleSetSameAddress}
              />
              <div className="singup-form__custom-checkbox"></div>
              Use the same address for both shipping and billing.
            </label>
          </div>
          <div className="signup-form__group">
            <button className="signup-form__submit" type="submit" disabled={submitDisabled || !isFormValid()}>
              {submitDisabled ? 'Submitting...' : 'Submit'}
            </button>
            <button className="signup-form__submit" type="button" onClick={() => navigate(routeList.MAIN)}>
              Main page
            </button>
            <button className="signup-form__submit" type="button" onClick={() => navigate(routeList.LOGIN)}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
