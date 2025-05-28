import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './user-data.css';
import { changeUserData } from '../../api/change-user-data';

const UserData = () => {
    const customer = useAppSelector((state) => state.user.customer);
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string | undefined>();
    const [lastName, setLastName] = useState<string | undefined>();
    const [dateOfBirth, setDateOfBirth] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();

    const [firstNameError, setFirstNameError] = useState<string | undefined>();
    const [lastNameError, setLastNameError] = useState<string | undefined>();
    const [dateOfBirthError, setDateOfBirthError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();

    const [formError, setFormError] = useState<string | undefined>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    useEffect(() => {
        if(customer){
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setDateOfBirth(customer.dateOfBirth);
            setEmail(customer.email);
        }
    }, [customer])

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setLastName(event.target.value);
    }

    const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setDateOfBirth(event.target.value);
    }

    const handleEmailNameChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setEmail(event.target.value);
    }

    const handleCancelEdit = (): void => {
        if(customer){
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setDateOfBirth(customer.dateOfBirth);
            setEmail(customer.email);
        }
        setEditMode(false);
    }


    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        
        // const formError: boolean = verifyForm(email, password, setEmailError, setPasswordError);
        // if (formError) return;
        
        setSubmitDisabled(true);
        if(customer && firstName && lastName && dateOfBirth && email){
            const version = +customer?.version;
            try {
                await changeUserData(customer?.id, version, firstName, lastName, dateOfBirth, email, dispatch);
                setFormError(undefined);
                setEditMode(false);
            } catch {
                setFormError('Failed to save data');
            } finally {
                setSubmitDisabled(false);
            }
        }
    };

    return (
        <form onSubmit={onSubmit} className="user-data_wrapper">
            <div className='user-data_data-block'>
                {editMode
                    ? (<div className='user-data_input-block'>
                        <input
                            className="user-data_input"
                            type='text'
                            id="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="First name"
                        />
                        {firstNameError !== '' && <span className="user-data_error">{firstNameError}</span>}
                    </div>)
                    : (<div className='user-data_string'>{firstName}</div>)
                }
            </div>
            <div className='user-data_data-block'>
                {editMode
                    ? (<div className='user-data_input-block'>
                        <input
                            className="user-data_input"
                            type='text'
                            id="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Last name"
                        />
                        {lastNameError !== '' && <span className="user-data_error">{lastNameError}</span>}
                    </div>)
                    : (<div className='user-data_string'>{lastName}</div>)
                }
            </div>
            <div className='user-data_data-block'>
                {editMode
                    ? (<div className='user-data_input-block'>
                        <input
                            className="user-data_input"
                            type='date'
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={handleDateOfBirthChange}
                            placeholder="Date of birth"
                        />
                        {dateOfBirthError !== '' && <span className="user-data_error">{dateOfBirthError}</span>}
                    </div>)
                    : (<div className='user-data_string'>{dateOfBirth}</div>)
                }
            </div>
            <div className='user-data_data-block'>
                {editMode
                    ? (<div className='user-data_input-block'>
                        <input
                            className="user-data_input"
                            type='text'
                            id="email"
                            value={email}
                            onChange={handleEmailNameChange}
                            placeholder="Email"
                        />
                        {emailError !== '' && <span className="user-data_error">{emailError}</span>}
                    </div>)
                    : (<div className='user-data_string'>{email}</div>)
                }
            </div>
            <div className='user-data_buttons'>
                {editMode 
                ? (<>
                    <button className='user-data_button' type='button' onClick={handleCancelEdit}>Cancel</button>
                    <button className='user-data_button' type="submit" disabled={submitDisabled}>
                        {submitDisabled ? 'Applying...' : 'Apply'}
                    </button>
                </>)
                : <button type='button' className='user-data_button' onClick={() => setEditMode(true)}>Edit</button>
                }
            </div>
        </form>
    );
};

export default UserData;