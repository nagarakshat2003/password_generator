import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useRef } from 'react'

function App() {

  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      pass += "1234567890"
    }
    if(charAllowed){
      pass += "!@#$%^&*()_+"
    }
    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed])
  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }
  const passwordRef = useRef(null)

  return (

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-900 text-orange-500'>
      <h1 className='text-white text-center my-3'>
        Generate a Password
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='ouline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
          name=''
          id=''
          />
          <label htmlFor='length'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          name=''
          id=''
          defaultChecked={numberAllowed}
          onChange={(prev)=>{
            !prev
          }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          name=''
          id=''
          defaultChecked={charAllowed}
          onChange={(prev)=>{
            !prev
          }}
          />
          <label htmlFor="char">Characters</label>
        </div>
      </div>
      <div className='my-3 text-center'>
          <button
          onClick={generatePassword}
          className='outline-none bg-blue-700 text-white px-4 py-2 shrink-0'
          
          >Generate</button>
      </div>
    </div>

  )
}

export default App
