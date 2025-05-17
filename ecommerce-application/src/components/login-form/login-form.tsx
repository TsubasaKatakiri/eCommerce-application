import { useState } from "react";
import './login-form.css'
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../api/login";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const onSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        let formError = verifyForm(email, password, setEmailError, setPasswordError);
        if(formError) return;

        setSubmitDisabled(true);
        try {
            await loginUser(email, password, dispatch);
            setFormError(null);
            history.go(-1);
        } catch (error) {
            setFormError('Incorrect email or password');
        } finally {
            setSubmitDisabled(false)
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(e.target.value);
        if(e.target.value.length === 0) setEmailError('Email is required');
        else setEmailError('');
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if(e.target.value.length === 0) setPasswordError('Password is required');
        else setPasswordError('');
    }

    return (
        <form onSubmit={onSubmit} className='login-form_wrapper'>
            {formError && <span className='login-form_error'>{formError}</span>}
            <div className='login-form_field-group'>
                <label 
                    htmlFor='email'
                    className='login-form_label'
                >
                    Email
                </label>
                <input 
                    className='login-form_field'
                    type="text" 
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                />
                {emailError !== '' && <span className='login-form_error'>{emailError}</span>}
            </div>
            <div className='login-form_field-group'>
                <label 
                    htmlFor='password'
                    className='login-form_label'
                >
                    Password
                </label>
                <input 
                    className='login-form_field'
                    type="password" 
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                />
                {passwordError !== '' && <span className='login-form_error'>{passwordError}</span>}
            </div>
            <button type="submit" disabled={submitDisabled} className='login-form_submit'>
                {submitDisabled ? 'Signing In...': 'Sign In'}
            </button>
        </form>
    );
};

export default LoginForm;


function verifyForm(
    email: string, 
    password: string, 
    setEmailError: (error: string) => void, 
    setPasswordError: (error: string) => void
): boolean {
    let formError = false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!email) {
        setEmailError('Email is required');
        formError = true;
    }
    else if (!emailRegex.test(email)) {
        setEmailError('Please provide a valid email');
        formError = true;
    }
    if(!password) {
        setPasswordError('Password is required')
        formError = true;
    }
    return formError;
}