import React, {FC} from 'react';
import {AiTwotoneDelete} from "react-icons/ai";

interface DeleteButtonProps {
  deleteHandler: any
  delReady: boolean
  id: string
}

const DeleteButton:FC <DeleteButtonProps> = ({id, deleteHandler, delReady}) => {
  return (
    <div className={'flex gap-1 cursor-pointer bg-neutral-600 hover:bg-neutral-500 transition-all px-4 py-1 rounded-full items-center'}
         onClick={(e) => deleteHandler(e, id)}>
      <AiTwotoneDelete className={(delReady ? 'text-red-600' : 'text-neutral-400') + ' transition-all'}/>
    </div>
  );
};

export default DeleteButton;