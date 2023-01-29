import React from 'react'
import { useState } from 'react';
import './button.scss';

export const Button = ({className, children, onClick, type, variant}) => {
  return (
    <button type={type} onClick={onClick} className={className ? 'btn ' + className : 'btn' }>{children}</button>
  )
}
