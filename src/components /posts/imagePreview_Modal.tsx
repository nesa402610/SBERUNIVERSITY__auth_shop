import React, {FC} from 'react';
//интерфейс модалки, isModal - отображение, setIsModal - устанавливаем модалку в true, image - ссылка на изображение
interface ImagePreviewModalProps {
  isModal: boolean
  setIsModal: any
  image: string
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({isModal, setIsModal, image}) => {
  return (
    <>
      {isModal &&
        <div className={'flex justify-center items-center fixed bg-neutral-900/80 backdrop-blur-lg w-screen top-0 h-screen z-50'} onClick={() => setIsModal(false)}>
          <div className={' p-10 flex items-center justify-center'}>
            <img className={'h-[90vh] object-contain'} src={image} alt=""/>
          </div>
        </div>
      }
    </>
  );
};

export default ImagePreviewModal;