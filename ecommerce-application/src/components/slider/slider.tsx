import { Image } from '@commercetools/platform-sdk';
import './slider.css';
import { useState } from 'react';
import ChevronLeft from '../../assets/svg/chevron-left.svg?react';
import ChevronRight from '../../assets/svg/chevron-right.svg?react';
import SliderModal from '../slider-modal/slider-modal';

interface Properties{
    images: Image[];
}

const Slider: React.FC<Properties> = ({images}: Properties) => {
    const [currentImage, setCurrentImage] = useState<Image>(images[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const handleMoveBack = (): void => {
        let newIndex;
        if(currentImageIndex > 0) {
            newIndex = currentImageIndex - 1;
        } else {
            newIndex = images.length - 1;
        }
        setCurrentImageIndex(newIndex);
        setCurrentImage(images[newIndex]);
    }

    const handleMoveForward = (): void => {
        let newIndex;
        if(currentImageIndex < images.length - 1) {
            newIndex = currentImageIndex + 1;
        } else {
            newIndex = 0;
        }
        setCurrentImageIndex(newIndex);
        setCurrentImage(images[newIndex]);
    }

    const spawnModal = (): void => {
        setModalOpen(true);
    }

    return (
        <>
            <div className='slider_wrapper'>
                <button className='slider_button-left' onClick={handleMoveBack}>
                    <ChevronLeft/>
                </button>
                <img src={currentImage.url} alt={'image'} onClick={spawnModal} className='slider_image'/>
                <button className='slider_button-right' onClick={handleMoveForward}>
                    <ChevronRight/>
                </button>
            </div>
            {modalOpen && <SliderModal onClose={() => setModalOpen(false)} currentImage={currentImage} handleForward={handleMoveForward} handleBack={handleMoveBack}/>}
        </>
    );
};

export default Slider;