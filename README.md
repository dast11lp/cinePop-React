# 🎬 CinePop — Frontend React

Frontend de una plataforma de reservas de cine. Permite autenticarse, explorar la cartelera, seleccionar sillas y pagar boletos con MercadoPago.

## Stack tecnológico

- **React 18** + **Vite**
- **Redux Toolkit** para manejo de estado global
- **React Router** para navegación
- **React Hook Form** para formularios
- **MercadoPago SDK** para tokenización de tarjetas
- **SCSS** personalizado

## Funcionalidades

- Registro e inicio de sesión con JWT
- Cartelera con scroll infinito y carga paginada
- Detalle de película y selección de función
- Selección visual de sillas por función
- Modal de confirmación antes del pago
- Procesamiento de pagos con MercadoPago
- Historial de compras paginado
- Rutas protegidas por autenticación

## Vista previa

### Inicio de sesión
![Login](./imagenes_readme/login.png)

### Cartelera con scroll infinito
![Home](./imagenes_readme/home.png)
![Scroll infinito](./imagenes_readme/infinit_scroll_1.png)
![Scroll infinito 2](./imagenes_readme/infinit_scroll_2.png)

### Detalle de película y función
![Detalle](./imagenes_readme/details_movie_and_function.png)

### Selección de sillas
![Sillas 1](./imagenes_readme/select_chairs_1.png)
![Sillas 2](./imagenes_readme/select_chairs_2.png)
![Sillas 3](./imagenes_readme/select_chairs_3.png)
![Sillas 4](./imagenes_readme/select_chairs_4.png)
![Sillas 5](./imagenes_readme/select_chairs_5.png)

### Selección de número de boletos

![Tickets 1](./imagenes_readme/getTickets_1.png)
![Tickets 2](./imagenes_readme/getTickets_2.png)

### Resumen y pago
![Resumen y pago 1](./imagenes_readme/resume&payment_1.png)
![Resumen y pago 2](./imagenes_readme/resume&payment_2.png)
![Resumen y pago 3](./imagenes_readme/resume&payment_3.png)
![Resumen y pago 4](./imagenes_readme/resume&payment_4.png)

### Historial de compras
![Historial](./imagenes_readme/history.png)

## Flujo de reserva y pago

![Flujo](./flujo_reserva_pago.svg)

## Cómo correrlo localmente

### Requisitos
- Node.js instalado
- Backend corriendo — ver [repositorio del backend](https://github.com/dast11lp/cinema-microservicios-backend-spring-boot)

### Pasos

```bash
git clone https://github.com/dast11lp/cinePop-React.git
cd cinePop-React
npm install
npm run dev
```

## Backend

El backend en Spring Boot con arquitectura de microservicios está disponible en:
[github.com/dast11lp/cinema-microservicios-backend-spring-boot](https://github.com/dast11lp/cinema-microservicios-backend-spring-boot)

---

Desarrollado por Daniel — Ingeniero de Sistemas
