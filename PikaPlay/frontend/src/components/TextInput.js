import React from 'react'

export default function TextInput(props) {
  return (
    <div>
        <input placeholder={props.placeholder} className={props.className} type={props.type} onChange={props.onChange}/>
    </div>
  )
}
