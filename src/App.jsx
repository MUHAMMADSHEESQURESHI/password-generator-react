import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
 const [length , setLength] = useState(8)
 const [numberallowed ,setNumberallowed] = useState(false)
 const[charallowed ,setCharallowed] = useState(false)
 const [password ,setPassword] = useState("")

 //useref hook
 const passwordRef = useRef(null)
const passwordGenerator = useCallback( ()=>{ 

  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberallowed) str += "0123456789"
  
  if(charallowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\"
  
 for(let i = 1 ; i<= length ; i++){
 let char = Math.floor( Math.random()*str.length +1)
 pass += str.charAt(char)
 }
 setPassword(pass)
},[length ,numberallowed ,charallowed ,setPassword])
useEffect(()=>{
  passwordGenerator()
},[length ,numberallowed ,charallowed ,passwordGenerator])

const copyPassword = ()=>{
window.navigator.clipboard.writeText(password)
}
  return (
    <>
    <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white  text-xl '>Password Generator </h1>
      <br />
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input 
           type="text" 
           value={password}
           className=' bg-white outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passwordRef}
           />
           <button onClick ={copyPassword}className='px-3 py-0.5 shrink-0 outline-none bg-blue-700 text-white'>
            copy
           </button>

          </div>
          <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label >Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
         <input 
         type="checkbox"
         defaultChecked={numberallowed}
         id='numberInput'
         onChange={(e)=>{
          setNumberallowed(e.target.checked)
         }}
         />
         <label >Numbers</label>
          </div >
          <div className='flex items-center gap-x-1'>
         <input 
         type="checkbox"
         defaultChecked={charallowed}
         id='charInput'
         onChange={(e)=>{
          setCharallowed(e.target.checked)
         }}
         />
         <label >characters</label>
          </div >
          </div>
    </div>
      
    </>
  )
}

export default App
