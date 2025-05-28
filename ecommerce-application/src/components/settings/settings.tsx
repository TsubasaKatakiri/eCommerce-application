import PasswordChange from '../password-change/password-change';
import UserData from '../user-data/user-data';
import './settings.css'

const Settings = () => {
    return (
        <div className='settings-wrapper'>
            <h2>Settings</h2>
            <div className='settings-section'>
                <h3>Personal information</h3>
                <UserData/>
            </div>
            <div className='settings-section'>
                <h3>Password</h3>
                <PasswordChange/>
            </div>
        </div>
    );
};

export default Settings;