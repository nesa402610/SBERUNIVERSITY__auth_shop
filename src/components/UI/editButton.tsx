import React, {FC} from 'react';
import {AiTwotoneEdit} from "react-icons/ai";

interface EditButtonProps {
  setIsEdit: any
}

const EditButton: FC<EditButtonProps> = ({setIsEdit}) => {
  return (
    <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
         onClick={(e) => {
           e.preventDefault()
           setIsEdit(true)
         }}>
      <AiTwotoneEdit/>
    </div>
  );
};

export default EditButton;