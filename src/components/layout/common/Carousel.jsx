import React from 'react'
import narnia1 from '../../../assets/img/narnia1.webp'
import harryPotter1 from '../../../assets/img/harry_potter1.webp'
import lordOfRings1 from '../../../assets/img/el_senor_de_los_anillos_1.jpeg'
import narnia1Copy from '../../../assets/img/narnia1.webp'

export const Carousel = () => {
  return (
    <div className='carousel'>

        <div className="carousel__layout">
            
            <div className="carousel__layout__container carousel__layout__container--1">
                <img className="carousel__layout__container__img " src={narnia1} alt="" />
            </div>

            <div className="carousel__layout__container carousel__layout__container--2">
                <img className="carousel__layout__container__img " src={harryPotter1} alt="" />
            </div>

            <div className="carousel__layout__container carousel__layout__container--3">
                <img className="carousel__layout__container__img " src={lordOfRings1} alt="" />
            </div>

            <div className="carousel__layout__container carousel__layout__container--4">
                <img className="carousel__layout__container__img " src={narnia1Copy} alt="" />
            </div>

        </div>


        
    </div>
  )
}
