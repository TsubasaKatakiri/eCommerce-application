import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import './toast.css'
import { hideToast } from '../../store/toast-slice';

interface Properties {
    status: 'success' | 'error',
    text: string
}

const Toast: React.FC<Properties> = ({status, text}: Properties) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideToast());
        }, 3000);
        return () => clearTimeout(timer);
    }, [status, text, dispatch])

    return (
        <div className={`toast_wrapper ${status === 'error' ? 'toast_wrapper__error' : ''}`}>
            <span className='toast_text'>{text}</span>
            <button className='toast_close' onClick={() => dispatch(hideToast())}>X</button>
        </div>
    );
};

export default Toast;