import React, {FC, useState} from 'react';
import {api} from "../APIs/API";
import {useNavigate} from "react-router-dom";

interface IData {
  token: string
  password: string
}

interface msgProps {
  ok?: string
  err?: string
}

const PasswordReset: FC = () => {
  const [data, setData] = useState<IData>({
    token: '',
    password: ''
  });
  const [msg, setMsg] = useState<msgProps | null>(null);
  const nav = useNavigate()
  const sendDataHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    api.updatePassword(data).then(r => {
      setMsg({ok: r.data.message})
      setMsg({ok: r.data.message})
      nav('/signIn')
    })
      .catch(err => setMsg({err: err.response.data.message}))
  };

  return (
    <div className={'h-screen'}>
      <div className={'flex justify-center h-full items-center'}>
        <form className={'flex flex-col bg-neutral-700 p-4 gap-2 rounded-lg'}>
          <h1 className={'text-center text-lg'}>Смена пароля</h1>
          {msg?.ok && <h2>{msg.ok}</h2>}
          {msg?.err && <h2>{msg.err}</h2>}
          <label className={''}>
            Token
            <input type="text"
                   name={'token'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.token}
                   onChange={e => setData({...data, token: e.target.value})}/>
          </label>
          <label className={''}>
            Новый пароль
            <input type="password"
                   name={'password'}
                   className={'w-full p-2 bg-stone-900'}
                   value={data.password}
                   onChange={e => setData({...data, password: e.target.value})}/>
          </label>
          <button className={'bg-neutral-900 p-2 mt-2 hover:bg-neutral-800 transition-all'}
                  onClick={e => sendDataHandler(e)}>
            Сменить пароль
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;