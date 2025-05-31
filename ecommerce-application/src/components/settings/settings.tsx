import PasswordChange from '../password-change/password-change';
import UserData from '../user-data/user-data';
import './settings.css'

const Settings = () => {
    return (
        <div className='settings_wrapper'>
            <h2 className='settings_title'>Settings</h2>
            <div className='settings_section'>
                <h3 className='settings_section-title'>Personal information</h3>
                <UserData/>
            </div>
            <div className='settings_section'>
                <h3 className='settings_section-title'>Password</h3>
                <PasswordChange/>
            </div>
        </div>
    );
};

export default Settings;