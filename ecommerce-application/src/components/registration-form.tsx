import { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const apiHost = import.meta.env.VITE_API_HOST;
const projectKey = import.meta.env.VITE_PROJECT_KEY;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const accessToken = localStorage.getItem('anonymousToken');
    if (!accessToken) {
      alert('Please obtain an anonymous token first.');
      return;
    }

    const customerDraft = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    try {
      const response = await fetch(`${apiHost}${projectKey}/me/signup`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerDraft),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful!');
        console.log(result);
      } else {
        const error = await response.json();
        console.log(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      console.log('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
      <button type="submit">Register</button>
    </form>
  );
};
export default RegistrationForm;
