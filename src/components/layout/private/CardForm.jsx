
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

        const paymentBody = {
            fullname: data.cardholderName,
            cc: data.identificationNumber,
            email: "test@test.com",
            token: token.id,
            price: purchaseSummary.data.totalMount,
            paymentMethodId: "visa",
            reservationId: purchaseSummary.data.reservationId,
            listChairs: purchaseSummary.data.chairs.map(c => c.id)
        }

        
        dispatch(setModal({
            type: "confirmPayment",
            title: "¿Confirmar pago?",
            open: true,
            others: { paymentBody },
        }));

    } catch (error) {
        console.error("T-T", error)
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