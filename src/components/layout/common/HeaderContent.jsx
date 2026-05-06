import React from "react";
import { Carousel } from "./Carousel";
import starwarsTitle from '../../../assets/img/starwars-title.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const HeaderContent = () => {
  return (
    <div className="header__content">
      <div className="header__content__title">
        <div className="header__content__title__box">
          <img className="header__content__title__box__img"src={starwarsTitle}alt="movie title"/>
          <div className="header__content__title__box__info">
            <Link to="/funciones/4" className="button">Reserva ahora</Link>
            <p className="header__content__title__box__info__legend">
              <span>Mayo 4 2026</span><span>Solo en cines</span>
            </p>
          </div>
          <div className="header__content__title__box__social-media">
              <Link to="https://www.facebook.com/" target="_blank"className="header__content__title__box__social-media__icon-links">
                <FontAwesomeIcon className="header__content__title__box__social-media__icon-links__icon" icon={faFacebook} />
              </Link>
              <Link to="https://twitter.com/" target="_blank"className="header__content__title__box__social-media__icon-links">
                <FontAwesomeIcon className="header__content__title__box__social-media__icon-links__icon" icon={faTwitter} />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank" className="header__content__title__box__social-media__icon-links">
                <FontAwesomeIcon className="header__content__title__box__social-media__icon-links__icon" icon={faInstagram} />
              </Link>
           </div>
        </div>
      </div>
      <div className="header__content__right">
        <h3 className="header__content__right__message">QUÉ LA FUERZA TE ACOMPAÑE!</h3>
      </div>
    </div>
  );
};
