import React from 'react';
import {BiLoaderCircle} from "react-icons/bi";

const Loader = () => {
  return (
    <div className={'flex flex-col items-center justify-center m-4'}>
      <span>Подожди чуть-чуть, сейчас все загрузим...</span>
      <BiLoaderCircle size={'3rem'} className={'animate-pulse'}/>
    </div>
  );
};

export default Loader;