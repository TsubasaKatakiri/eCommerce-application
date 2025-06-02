import { Image } from '@commercetools/platform-sdk';
import './slider-modal.css';
import ChevronLeft from '../../assets/svg/chevron-left.svg?react';
import ChevronRight from '../../assets/svg/chevron-right.svg?react';

interface Properties{
    onClose: () => void;
    currentImage: Image;
    handleForward: () => void;
    handleBack:  () => void;
}

const SliderModal: React.FC<Properties> = ({onClose, currentImage, handleForward, handleBack}: Properties) => {
    return (
        <div className='slider-modal_wrapper'>
            <div className='slider-modal'>
                <div className='slider-modal_header'>
                    <button onClick={onClose} className='slider-modal_button'>Close</button>
                </div>
                <div className='slider-modal_body'>
                    <button className='slider-modal_left' onClick={handleBack}>
                        <ChevronLeft/>
                    </button>
                    <img src={currentImage.url} alt={'image'} className='slider-modal_image'/>
                    <button className='slider-modal_right' onClick={handleForward}>
                        <ChevronRight/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SliderModal;