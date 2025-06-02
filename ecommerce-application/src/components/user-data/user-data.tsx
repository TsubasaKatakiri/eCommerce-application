import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './user-data.css';
import { changeUserData } from '../../api/change-user-data';
import { showToast } from '../../store/toast-slice';

const UserData = () => {
    const customer = useAppSelector((state) => state.user.customer);
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [firstNameError, setFirstNameError] = useState<string | undefined>();
    const [lastNameError, setLastNameError] = useState<string | undefined>();
    const [dateOfBirthError, setDateOfBirthError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    useEffect(() => {
        if(customer){
            if(customer.firstName) setFirstName(customer.firstName);
            if(customer.lastName) setLastName(customer.lastName);
            if(customer.dateOfBirth) setDateOfBirth(customer.dateOfBirth);
            setEmail(customer.email);
        }
    }, [customer])

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
        if(!ifRightAge(selectedDate)) setDateOfBirthError('Must be at least 13 years old');
        else setDateOfBirthError(undefined);
    }

    const handleEmailNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(event.target.value.length === 0) setLastNameError('Must contain at least one character');
        else if (emailRegex.test(event.target.value) === false) setEmailError('Must be a valid email');
        else setEmailError(undefined);
    }

    const handleCancelEdit = (): void => {
        if(customer){
            if(customer.firstName) setFirstName(customer.firstName);
            if(customer.lastName) setLastName(customer.lastName);
            if(customer.dateOfBirth) setDateOfBirth(customer.dateOfBirth);
            setEmail(customer.email);
        }
        setFirstNameError(undefined);
        setLastNameError(undefined);
        setDateOfBirthError(undefined);
        setEmailError(undefined);
        setEditMode(false);
    }

        const isFormValid = () => 
            firstName.trim() 
        && lastName.trim() 
        && email.trim() 
        && dateOfBirth
        && !firstNameError
        && !lastNameError
        && !dateOfBirthError
        && !emailError

    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        
        setSubmitDisabled(true);
        if(customer && firstName && lastName && dateOfBirth && email){
            const version = +customer?.version;
            try {
                await changeUserData(customer?.id, version, firstName, lastName, dateOfBirth, email, dispatch);
                dispatch(showToast({ status: 'success', text: 'User data changed successfully' }));
                setEditMode(false);
            } catch {
                dispatch(showToast({ status: 'error', text: 'Failed to update user data' }));
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
                    <button className='user-data_button' type="submit" disabled={submitDisabled || !isFormValid()}>
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

function ifRightAge(date: Date): boolean {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - date.getFullYear();
  const thisYearBirthday =
    currentDate.getMonth() > date.getMonth() || (currentDate.getMonth() === date.getMonth() && currentDate.getDate() >= date.getDate());
  if (!thisYearBirthday) age--;
  return age >= 13;
}