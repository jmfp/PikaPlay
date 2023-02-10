import React from 'react'

export default function Button(props) {
  return (
    <div className={props.className} onClick={props.onClick}>
        <p className={props.textStyle}>
            {props.text}
        </p>
        {props.children}
    </div>
  )
}
