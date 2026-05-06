
import { useForm } from "react-hook-form"
import { cardFormOptions } from "../../../helpers/cardFormOptions"
import { Input } from "../common/Input"
import card from "../../../assets/img/credit-card-red-black.png"
import { useDispatch, useSelector } from "react-redux"
import { processPayment } from '../../../services/bookingService'
import { setModal } from "../../../features/ui/modalSlice"

export default function CardForm() {

    const dispatch = useDispatch();
    const purchaseSummary = useSelector(state => state.booking.purchaseSummary)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {

        try {
            const mp = new window.MercadoPago("TEST-589f41a1-5439-4394-b89d-6256a0678a0b", {
                locale: "es-CO"
            })

            const token = await mp.createCardToken({
                cardNumber: data.cardNumber,
                cardholderName: data.cardholderName,
                cardExpirationMonth: data.expirationMonth,
                cardExpirationYear: data.expirationYear,
                securityCode: data.securityCode,
                identificationType: "CC",
                identificationNumber: data.identificationNumber
            })

            console.log("token:", token)

            const paymentBody = {
                fullname: data.cardholderName,
                cc: data.identificationNumber,
                email: "test@test.com", // cambiar al usuario del cliente?? 
                token: token.id,
                price: purchaseSummary.data.totalMount,
                // // paymentMethodId: token.payment_method_id, 
                // // paymentMethodId: token.bin_attributes?.brand?.code, 
                paymentMethodId: "visa",
                reservationId: purchaseSummary.data.reservationId,
                listChairs: purchaseSummary.data.chairs.map(c => c.id)
            }


            console.log("paymentBody:", paymentBody)

            const { status, data: result } = await processPayment(paymentBody);

            console.log("Código HTTP:", status);
            console.log("Cuerpo respuesta:", result);


            if (status === 201 || status === 200) {
                dispatch(setModal({
                    type: "info",
                    title: "Reserva Exitosa",
                    message: "la reserva fue realizada con éxito",
                    open: true,
                    others: {},
                }));
            } else if (status === 402) { // Pago rechazado
                dispatch(setModal({
                    type: "error",
                    title: "Pago fallido",
                    message: "Tu tarjeta fue rechazada. Revisa los fondos.",
                    open: true,
                }));
            } else {
                // Cualquier otro error (500, 400, etc)
                throw new Error(result.message || "Error desconocido");
            }

        } catch (error) {
            console.error("T-T", " ", error)
        }
    }


    return (
        <div className="form-card">
            <form onSubmit={handleSubmit(onSubmit)}>

                <Input {...cardFormOptions.cardNumberOptions} register={register} errors={errors.cardNumber} />
                <Input {...cardFormOptions.cardholderNameOptions} register={register} errors={errors.cardholderName} />
                <Input {...cardFormOptions.expirationMonthOptions} register={register} errors={errors.expirationMonth} />
                <Input {...cardFormOptions.expirationYearOptions} register={register} errors={errors.expirationYear} />
                <Input {...cardFormOptions.securityCodeOptions} register={register} errors={errors.securityCode} />
                <Input {...cardFormOptions.identificationNumberOptions} register={register} errors={errors.identificationNumber} />

                <button className="button" type="submit">Pagar</button>
            </form>
            <div className="form-card__img">
                <img src={card} alt="tarjeta"></img>
            </div>

        </div>
    )
}