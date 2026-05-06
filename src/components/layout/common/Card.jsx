import React from 'react'

export const Card = ({movie}) => {
  return (
    <div className='card'>
      <div className='card__img-container '>
        <img  className="card__img-container__img" src={movie.poster} alt="" />
      </div>

    
      <div className='card__content '>
        <h2 className='card__movie-meta card__movie-meta--title '>{movie.movieName}</h2>
        <div>
          <p className='card__movie-meta'>{movie.language}</p>
          <p className='card__movie-meta'>{movie.director}</p>
          <p className='card__movie-meta'>{movie.country}</p>
          <p className='card__movie-meta'>{movie.protagonists}</p>
        </div>
      </div>
      
    </div>
  )
}
