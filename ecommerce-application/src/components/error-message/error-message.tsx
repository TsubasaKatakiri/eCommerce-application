import './error-message.css';

const ErrorMessage = () => {
    return (
        <div className='error-wrapper'>
            <span className='error-text'>Something went wrong, please, reload the page and try again.</span>
            <button className='error_button' onClick={() => location.reload()}>Reload page</button>
        </div>
    );
};

export default ErrorMessage;