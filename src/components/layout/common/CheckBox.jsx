import React from 'react'

export const CheckBox = () => {
  return (
    <div className='checkbox-custom'>
        <input type="checkbox" name="" id="checkbox" className='checkbox-custom__input'/>
        <label htmlFor="checkbox" className='checkbox-custom__label'>
            <span className='checkbox-custom__btn'></span>
            autoriza el tratamiento de datos
        </label>
    </div>
  )
}
