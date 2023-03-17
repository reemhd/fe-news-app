import React from 'react'
import error404 from '../assets/404.png'

export const WrongPathError = () => {
  return (
    <img src={error404} alt="error" className="error" />
  )
}
