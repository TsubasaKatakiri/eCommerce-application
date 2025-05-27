import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import './user-page.css';
import { userLinks } from './user-links';

const UserPage = () => {
    const customer = useAppSelector((store) => store.user);
    const location = useLocation();
    const currentPath: string | undefined = location.pathname.split('/').filter(item => item !== '')[1];

    console.log(customer);

    return (
        <div className='user-page_wrapper'>
            <div className='user-page_user-info'>
                <div className='user-page_avatar'>
                    <span className='user-page_avatar-text'>
                        {customer.customer?.firstName?.slice(0, 1)}{customer.customer?.lastName?.slice(0, 1)}
                    </span>
                </div>
                <div className='user-page_user-data'>
                    <span className='user-page_username'>
                        {customer.customer?.firstName} {customer.customer?.lastName}
                    </span>
                    <span className='user-page_email'>
                        {customer.customer?.email}
                    </span>
                </div>
            </div>
            <div className='user-page_content'>
                <div className='user-page_menu'>
                    {userLinks.map(item => 
                        <Link key={item.id} to={item.path} className={`user-page_menu-link ${currentPath === item.id ? 'active' : ''}`}>{item.name}</Link>
                    )}
                </div>
                <div className='user-page_subpage'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default UserPage;