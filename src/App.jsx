import {useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);

  const passwordRef=useRef(null)

  const [password, setPassword] = useState("")

  const copypasstoclip= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password)

  })
 

  const passwordgenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*-_+="

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, number, char])

  useEffect(()=>{
    passwordgenerator()
  },[length,number,char,passwordgenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-7 py-6 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' 
        value={password}
        ref={passwordRef} 
        className='outline-none w-full px-3 py-3 my-3 bg-white text-black'
        placeholder='Password'
        readOnly
        ></input>
        <button onClick={copypasstoclip} className='bg-blue-500 px-3 my-3 mx-2 text-black hover:bg-blue-800'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className='px-1'>Length:{length}</label>

            <input 
            type='checkbox'
            className='mx-1'
            defaultChecked={number}
            onChange={(e)=>{
              setNumber(!number) 
            }}
            />
            <label>Numbers</label>
            <input 
            type='checkbox'
            className='mx-1'
            defaultChecked={char}
            onChange={(e)=>{
              setChar(!char)
            }}
            />
            <label>Character</label>
        </div>
      </div>

    </div>
    </>
  )
}

export default App
