import { get, post } from "./api";

export const loginFetch = async (user) => {
  const request = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (request.status === 401 || request.status === 500) throw request.status;

  return request.json();
};

export const registerFetch = (body) => post("auth/register", body);
