import React from 'react'

const CardFood = ({food}) => {
    return (
        <div className='card card--horizontal'>
            <div className='card__img-container card__img-container--horizontal'>
                <img className="card__img-container__img card__img-container__img--horizontal" src={food.img} alt="" />
            </div>
            <div className='card__content '>
                <div className='card__content card__content--horizontal'>
                    <h3>Producto: {food.name}</h3>
                    <p>Descripcion: {food.description}</p>
                    <p>Precio: $00.1</p>
                </div>
            </div>
        </div>
    )
}

export default CardFood
