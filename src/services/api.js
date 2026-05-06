const API_URL = import.meta.env.VITE_API_URL;

export const get = (path) =>
  fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((r) => r.json());

export const getAuth = (path) =>
  fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((r) => r.json());

export const post = (path, body) =>
  fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const postAuth = (path, body) =>
  fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  }).then(async (r) => {
    const data = await r.json();
    return {
      status: r.status,
      data: data
    };
  });

