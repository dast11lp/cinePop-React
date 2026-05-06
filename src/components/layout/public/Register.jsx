import { useState } from "react";
import { Input } from "../common/Input";
import { useForm } from "react-hook-form";
import { registerOptions } from "../../../helpers/formOptions";
import { useDispatch } from "react-redux";
import { registerFetchMiddleware } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const { register, handleSubmit, watch,formState: {errors} } = useForm({
    mode:'onChange'
  });
  const [formOptions] = useState({ ...registerOptions });

  const onSubmit = (data)  => {
    dispatch(registerFetchMiddleware(data))
    navigate("/public/login")
  }
  
  return (
    <form className="register" onSubmit={handleSubmit(onSubmit)}>
      <h2>Registro</h2>
      {Object.values(formOptions).map((el, i) => (
        <div key={i} className= {`register__field register__field--${i+1}`} >
          <Input
            key={i}
            name={el.name}
            id={`id--${i+1}`}
            select={el?.select}
            label={el.label}
            type={el.type}
            placeholder={el.placeholder}
            register={register}
            required={el.required}
            minLength={el.minLength}
            maxLength={el.maxLength}
            pattern={el.pattern}
            icon={el.icon}
            icon2={el.icon2}
            options= {el.options}
            errors= {errors[el.name]}
            validateCustom = {el.validate}
            watch = {watch}
            watchOptions = {el.watchOptions}
          />
        </div>
      ))}
      <button className="button button--regis" >Registrarse</button>
    </form>
  );
};
