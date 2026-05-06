export const formatDate = (dateUnformatted) => {
  const dateformatted = new Date(dateUnformatted);
  return `${dateformatted.getFullYear()}/${
    dateformatted.getMonth() + 1 < 10
      ? 0 + (dateformatted.getMonth() + 1).toString()
      : dateformatted.getMonth()
  }/${dateformatted.getDate()}`;
};
