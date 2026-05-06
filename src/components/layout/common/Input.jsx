import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export const Input = ({
  name,
  id,
  select,
  type,
  label,
  placeholder,
  register,
  required,
  minLength,
  maxLength,
  pattern,
  icon,
  icon2,
  options,
  errors,
  validateCustom,
  watch,
  watchOptions,
}) => {

  const location = useLocation();

  const handleViewPassword = ({ target }) => {
    const passwordInput = document.querySelector("input[name='password']");
    const type = passwordInput.getAttribute("type");

    if (type === "text") {
      passwordInput.setAttribute("type", "password");
      target.style.color = "black";
    } else if (type === "password") {
      passwordInput.setAttribute("type", "text");
      target.style.color = "blue";
    }
  };

  if (!select) {
    return (
      <div className="input">
        <label className="input__label" name={name} htmlFor="">
          {label}
        </label>
        {icon && <FontAwesomeIcon icon={icon} className="icon-awesome" />}

        {!validateCustom ? (
          <input
            className={`input__field ${location.pathname == "/public/login" ? "input__field--login" : ""}`}
            {...register(name, { required, minLength, maxLength, pattern })}
            type={type}
            placeholder={placeholder}
          />
        ) : (
          <input
            className={`input__field ${location.pathname == "/public/login" ? "input__field--login" : ""}`}
            {...register(name, {
              required,
              minLength,
              maxLength,
              pattern,
              validate: (value) => validateCustom(value, watch, watchOptions),
              onChange: (e) => console.log(errors?.message)
            })}
            type={type}
            placeholder={placeholder}
          />
        )}

        {icon2 && (
          <FontAwesomeIcon
            icon={icon2}
            className="icon-awesome2"
            onClick={handleViewPassword}
          />
        )}
        <p className={`input__message input__message--error`}>{errors?.message}</p>
      </div>
    );
  } else {
    return options ? (
      <div className="input">
        <label className="input__label">{label}</label>
        <select
          className="select"
          {...register(name, { required, minLength, maxLength, pattern })}
        >
          <option value="">Seleccione</option>
          {Object.keys(options).map((el) => (
            <option key={el} className="options" value={el}>
              {options[el]}
            </option>
          ))}
        </select>
        <p className={`input__message input__message--error`}>{errors?.message}</p>
      </div>
    ) : (
      <h3>No se incluyeron las opciones</h3>
    );
  }
};
