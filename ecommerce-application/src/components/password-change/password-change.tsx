import { ReactElement, useState } from 'react';
import './password-change.css';

import EyeClosed from '../../assets/svg/eye-see.svg?react';
import Eye from '../../assets/svg/eye-show.svg?react';
import { changePassword } from '../../api/change-password';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showToast } from '../../store/toast-slice';

const PasswordChange = (): ReactElement => {
    const customer = useAppSelector((state) => state.user.customer);
    const dispatch = useAppDispatch();

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

    const [oldPasswordError, setOldPasswordError] = useState<string | undefined>();
    const [newPasswordError, setNewPasswordError] = useState<string | undefined>();
    const [repeatPasswordError, setRepeatPasswordError] = useState<string | undefined>();

    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const isFormValid = () => 
        oldPassword.trim() 
    && newPassword.trim() 
    && repeatPassword.trim() 
    && !oldPasswordError
    && !newPasswordError
    && !repeatPasswordError;

    const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setOldPassword(event.target.value);
        if(event.target.value.length === 0) setOldPasswordError('Field cannot be empty');
        else if (event.target.value.length < 8) setOldPasswordError('Password should be at least 8 characters long');
        else setOldPasswordError(undefined);
    }

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setNewPassword(event.target.value);
        passwordChecker(event.target.value, setNewPasswordError);
    }

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setRepeatPassword(event.target.value);
        console.log(event.target.value !== newPassword);
        passwordChecker(event.target.value, setRepeatPasswordError);
        if(event.target.value !== newPassword) setRepeatPasswordError('New and repeated passwords should match')
    }

    const handleCancel = ():void => {
        setOldPassword('');
        setNewPassword('');
        setRepeatPassword('');
    }

    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        setSubmitDisabled(true);
        if(customer){
            const version = +customer?.version;
            try {
              await changePassword(customer?.id, version, oldPassword, newPassword, dispatch);
              dispatch(showToast({ status: 'success', text: `Password updated successfully` }));
              handleCancel();
            } catch {
              dispatch(showToast({ status: 'error', text: `Failed to update password` }));
            } finally {
              setSubmitDisabled(false);
            }
        }
      };

    return (
        <form onSubmit={onSubmit} className="password-form_wrapper">
            <div className="login-form_field-group">
                <label htmlFor="oldPassword" className="login-form_label">
                    Old Password
                </label>
                <div className="login-form_password-input">
                <input
                    className="login-form_field"
                    type={showOldPassword ? 'text' : 'password'}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    placeholder="Enter your old password"
                />
                <button type="button" className="login-form_password-visible-button" onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <Eye width="24px" height="24px" /> : <EyeClosed width="24px" height="24px" />}
                </button>
                </div>
                {oldPasswordError !== '' && <span className="login-form_error">{oldPasswordError}</span>}
            </div>

            <div className="login-form_field-group">
                <label htmlFor="newPassword" className="login-form_label">
                    New Password
                </label>
                <div className="login-form_password-input">
                <input
                    className="login-form_field"
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter your new password"
                />
                <button type="button" className="login-form_password-visible-button" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <Eye width="24px" height="24px" /> : <EyeClosed width="24px" height="24px" />}
                </button>
                </div>
                {newPasswordError !== '' && <span className="login-form_error">{newPasswordError}</span>}
            </div>

            <div className="login-form_field-group">
                <label htmlFor="repeatPassword" className="login-form_label">
                    Repeat Password
                </label>
                <div className="login-form_password-input">
                <input
                    className="login-form_field"
                    type={showRepeatPassword ? 'text' : 'password'}
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    placeholder="Repeat your new password"
                />
                <button type="button" className="login-form_password-visible-button" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                    {showRepeatPassword ? <Eye width="24px" height="24px" /> : <EyeClosed width="24px" height="24px" />}
                </button>
                </div>
                {repeatPasswordError !== '' && <span className="login-form_error">{repeatPasswordError}</span>}
            </div>
            <div className='password-form_buttons'>
                <button type="submit" disabled={submitDisabled || !isFormValid()} className="password-form_button">
                    {submitDisabled ? 'Saving...' : 'Save'}
                </button>
                <button type="button" disabled={submitDisabled} onClick={handleCancel} className="password-form_button">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PasswordChange;


function passwordChecker(value: string, setError: (error: string | undefined) => void): void {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=$$$${}|;:'",.<>?/]).+$/
    if(value.length === 0) setError('Field cannot be empty');
    else if (value.length < 8) setError('Password should be at least 8 characters long');
    else if (passwordPattern.test(value) === false) setError('Password should contain at least one capital letter, one small letter, and one special character');
    else setError(undefined);
}