import { useEffect } from "react";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import { ListingMovies } from "../components/layout/common/ListingMovies";
import { Login } from "../components/layout/public/Login";
import { Register } from "../components/layout/public/Register";
import { Header } from "../components/layout/common/Header";
import { Food } from "../components/layout/common/Food";
import { FunctionsMovie } from "../components/layout/common/FunctionsMovie";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/layout/common/Modal";
import { Function_ } from "../components/layout/private/Function_";
import { getLogin } from "../features/auth/authSlice";
import { GetFunctionTickets } from "../components/layout/private/GetFunctionTickets";
import { FunctionSeats } from "../components/layout/private/FunctionSeats";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { MyReserves } from "../components/layout/private/MyReserves";
import { PurchaseSummary } from "../components/layout/private/PurchaseSummary";
import { CommonLayout } from "../components/layout/common/CommonLayout";
import { setModal } from "../features/ui/modalSlice";

export const Routing = () => {
  const dispatch = useDispatch();

  const modalSlice = useSelector((state) => state.modal.modalData);
  const modalOpen = modalSlice.open;

  const message = 
  'Este proyecto tiene su propia API desarrollada en Java, la cual se ejecuta en un servidor gratuito en render.com. Por favor, ten paciencia con los tiempos de carga. En ocasiones, puede tomar hasta 10 minutos la primera vez que se realiza una llamada al servidor 😔.'
  + 'Si ves un mensaje de error de conexión, por favor intenta nuevamente.'

  useEffect(() => {
    dispatch(getLogin());

    dispatch(setModal({
      type: "error",
      title: "¡Bienvenido!",
      message,
      open: true,
    }))
  }, []);

  return (
    <HashRouter>
      <div className="layout">
        <Header />
        <div className="anyContent">
          <Routes>
            <Route path="/" element={<CommonLayout />}>
              <Route path="cartelera" element={<ListingMovies />} />
              <Route path="comidas" element={<Food />} />
              <Route path="funciones/:id" element={<FunctionsMovie />} />
            </Route>

            <Route path="/public" element={<PublicLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Register />} />
            </Route>

            <Route path="/compras" element={<PrivateLayout />}>
              <Route path="funcion/" element={<Function_ />}>
                <Route path="tickets/:id" element={<GetFunctionTickets />} />
                <Route path="seats/:id" element={<FunctionSeats />} />
                <Route path="purchaseSummary" element={<PurchaseSummary />} />
              </Route>
            </Route>

            <Route path="/usuario" element={<PrivateLayout />}>
              <Route path="miscompras" element={<MyReserves />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <span>
                    <h1>
                      <Link>Error 404</Link>
                    </h1>
                    <Link to="/">Volver al Inicio</Link>
                  </span>
                </>
              }
            />
          </Routes>
        </div>
        {modalOpen && <Modal />}
      </div>
    </HashRouter>
  );
};
