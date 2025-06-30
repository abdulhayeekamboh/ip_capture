import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const App = () => {

  const [name, setname] = useState('');


  async function submit() {
  try {
    const response = await axios.post('http://localhost:4000/api', { name });
    console.log(response.data);
  } catch (error) {
    console.error('Frontend error:', error);
  }
}


     

  return (
    <div className='page'>
      <input value={name} onChange={(e)=>{
        setname(e.target.value)
      }} type="text"  placeholder='Enter User Name'/>
      <button onClick={submit}>submit</button>
      <a href="#"><p>link</p></a>
    </div>
  )
}

export default App