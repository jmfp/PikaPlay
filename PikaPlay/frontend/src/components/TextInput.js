import React from 'react'

export default function TextInput(props) {
  return (
    <div className={props.className}>
        <input type={props.type} onChange={props.onChange}/>
    </div>
  )
}
