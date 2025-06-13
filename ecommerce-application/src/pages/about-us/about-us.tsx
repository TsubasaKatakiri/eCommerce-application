import logoRsschool from '../../assets/svg/rsschool-logo.svg';
import type {ReactElement} from 'react';
import './about-us.css'

const AboutUs = (): ReactElement => {
    return (
        <div>
            <a href='https://rs.school/'>
                <img className='logo-rs' src={logoRsschool} alt='logo rsSchool'/>
            </a>
        </div>
    )
}
export default AboutUs;