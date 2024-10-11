import React from 'react'

const Gendercheckbox = ({input1,setInput1}) => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className={'label gap-2 cursor-pointer'}>
                <span className='label-text'> Male</span>
                <input type="radio" className='checkbox border-slate-900' name="gender" value="male" onChange={(e)=>setInput1({...input1,gender:e.target.value})}/>
            </label>
        </div>
        <div className='form-control'>
            <label className={'label gap-2 cursor-pointer'}> 
                <span className='label-text'> Female</span>
                <input type="radio" className='checkbox border-slate-900' name="gender" value="female" onChange={(e)=>setInput1({...input1,gender:e.target.value})}/>
            </label>
        </div>
    </div>
  )
}

export default Gendercheckbox
