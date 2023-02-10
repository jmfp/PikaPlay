import React from 'react'

export default function Image(props) {
  if(props.backgroundImage){
    return (
        <div className={props.className} style={{backgroundImage: `url(${props.image})`, filter: `${props.filter}` , backgroundColor: `${props.backgroundColor}`}}>
            {props.children}
        </div>
      )
  }else{
    return (
        <img className={props.className} src={props.image}>
            {props.children}
        </img>
      )
  }
}
