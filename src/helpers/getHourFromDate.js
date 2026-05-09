const getTime = (dateString) => {
  const date = new Date(dateString);

  return `${date.getHours()}:${date.getMinutes()
    .toString()
    .padStart(2, "0")}`;
};


export default getTime;