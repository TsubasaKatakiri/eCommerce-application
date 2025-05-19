import { useNavigate } from 'react-router-dom';
const RegistrationPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Sign up page</h2>
      <form></form>
      <p>
        Already registered? <button onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
};

export default RegistrationPage;
