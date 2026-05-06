import { Input } from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";

import { useForm } from "react-hook-form";
import { CheckBox } from "../common/CheckBox";

import { faEye, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

import clipBoard from "../../../assets/img/clapperboard.png";
import { useNavigate } from "react-router-dom";
import { Loading } from "../common/Loading";
import { useState } from "react";


export const Login = () => {
  const previousPage = useSelector((state) => state.previousPath.previousPage);
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(login(data, navigate, previousPage)).catch((error => {
      console.error(error);
      setLoading(false);
      if (error == 401)
        setLoadingMessage("Usuario o Contraseña Incorrecto");
    }))
  };

  const patternUsername = /[A-Za-z0-9]+/;
  const patternPassword = /[A-Za-z0-9]+/;


  if (!loading) {
    return (
      <>
        <div className="form-box">
          <div className="form-box__info">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-box__info__form"
            >
              <h2 className="heading-primary">
                Inicia Sesión en CinePop para continuar
              </h2>
              {loadingMessage && <h3 className="form-box__info__form__message">{loadingMessage}</h3>}
              <Input
                name="username"
                type="text"
                placeholder={"username"}
                register={register}
                required={"El campo es requerido"}
                minLength={{ value: 3, message: "Ingresar mínimo 3 caracteres" }}
                maxLength={{ value: 30, message: "Ingresar máximo 3 caracteres" }}
                pattern={patternUsername}
                icon={faUser}
              />
              {<span style={{color: 'red'}}>{errors?.username?.message}</span>}
              <Input
                name="password"
                type="password"
                placeholder={"password"}
                register={register}
                required={"El campo es requerido"}
                minLength={{ value: 3, message: "Ingresar mínimo 3 caracteres" }}
                maxLength={{ value: 30, message: "Ingresar máximo 3 caracteres" }}
                pattern={patternPassword}
                icon={faKey}
                icon2={faEye}
              />
              {<span style={{color: 'red'}}>{errors?.password?.message}</span>}
              {/* <CheckBox /> */}
              <button type="submit" className="button ">
                Iniciar Sesión
              </button>
            </form>
          </div>
  
          <div className="form-box__brand">
            <img className="form-box__brand__clipBoard" src={clipBoard} alt="" />
          </div>
        </div>
      </>
    );
  } else {
    return (<Loading />)
  }
};
