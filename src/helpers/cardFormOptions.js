const requiredGeneralMessage = "Campo Requerido"

export const cardFormOptions = {
  cardNumberOptions: {
    name: "cardNumber",
    type: "text",
    label: "Número de tarjeta",
    placeholder: "1234 5678 9012 3456",
    required: requiredGeneralMessage,
    minlength: 13,
    maxlength: 19,
  },
  cardholderNameOptions: {
    name: "cardholderName",
    type: "text",
    label: "Nombre en la tarjeta",
    placeholder: "Juan Perez",
    required: requiredGeneralMessage,
    minLength: 3,
    maxLength: 50,
  },
  expirationMonthOptions: {
    name: "expirationMonth",
    type: "text",
    label: "Mes de vencimiento",
    placeholder: "MM",
    required: requiredGeneralMessage,
    minLength: 2,
    maxLength: 2,
  },
  expirationYearOptions: {
    name: "expirationYear",
    type: "text",
    label: "Año de vencimiento",
    placeholder: "YYYY",
    required: requiredGeneralMessage,
    minLength: 4,
    maxLength: 4,
  },
  securityCodeOptions: {
    name: "securityCode",
    type: "password",
    label: "CVV",
    placeholder: "***",
    required: requiredGeneralMessage,
    minLength: 3,
    maxLength: 4,
  },
  identificationNumberOptions: {
    name: "identificationNumber",
    type: "text",
    label: "Número de identificación",
    placeholder: "",
    required: requiredGeneralMessage,
    minLength: 5,
    maxLength: 20,
  }
}