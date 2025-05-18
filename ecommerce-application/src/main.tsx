import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { signUpPage } from './singUpForm/SingUp-form.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <App />
		<SignUpPage />
=======
      <BrowserRouter>
      <App />
      </BrowserRouter>
>>>>>>> 4e98b371fec0cf42921a491313e87384793fb25e
  </StrictMode>,
)
