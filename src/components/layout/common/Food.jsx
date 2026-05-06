import React from 'react'
import CardFood from './CardFood'

import burgerImage from '../../../assets/img/burger_freesh_drink.jpg';
import hotdogImage from '../../../assets/img/hotdog.jpg';
import sodaImage from '../../../assets/img/soda.jpg';


export const Food = () => {
  const foods = [
    {
        id: 1,
        name: "Combo",
        description: "Un combo clásico que combina una refrescante soda, crujientes papas fritas y una jugosa hamburguesa. Ideal para satisfacer el hambre con sabores deliciosos y familiares.",
        img: burgerImage,
    },
    {
        id: 2,
        name: "Perro caliente",
        description: "Un perro caliente jugoso y sabroso, envuelto en un pan suave y esponjoso, acompañado de salsas y toppings que resaltan su sabor único. Un clásico irresistible que combina texturas crujientes y cremosas en cada bocado.",
        img: hotdogImage
    },
    {
        id: 3,
        name: "Gaseosa",
        description: "Un refresco burbujeante y refrescante que sacia la sed al instante, con su característico sabor dulce y una sensación ligera en el paladar. Perfecto para acompañar cualquier comida o disfrutar por sí solo en cualquier momento del día.",
        img: sodaImage
    }]
  return (
    <div>
      <h2>Comidas</h2>
        {foods.length > 0 && foods.map((food)=> (<CardFood food={food}/>))}
    </div>
  )
}
