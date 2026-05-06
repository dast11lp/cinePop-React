export const SerializeForm = (form) => {
  const formData = new FormData(form);

  const fullObject = {};

  for (const [name, value] of formData) {
    fullObject[name] = value;
  }

  return fullObject;
};
