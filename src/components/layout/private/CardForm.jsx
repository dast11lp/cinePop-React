import { processPayment } from '../../../services/bookingService'
import { useState } from "react"
import { useSelector } from "react-redux"

export default function CardForm() {
    const purchaseSummary = useSelector(state => state.booking.purchaseSummary)
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardholderName: "",
        expirationMonth: "",
        expirationYear: "",
        securityCode: "",
        identificationType: "CC",
        identificationNumber: ""
    })

    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const mp = new window.MercadoPago("TEST-589f41a1-5439-4394-b89d-6256a0678a0b", {
            locale: "es-CO"
        })

        const token = await mp.createCardToken({
            cardNumber: cardData.cardNumber,
            cardholderName: cardData.cardholderName,
            cardExpirationMonth: cardData.expirationMonth,
            cardExpirationYear: cardData.expirationYear,
            securityCode: cardData.securityCode,
            identificationType: cardData.identificationType,
            identificationNumber: cardData.identificationNumber
        })

        console.log("token:", token)

        const user = JSON.parse(localStorage.getItem("user"))

        const paymentBody = {
            fullname: cardData.cardholderName,
            cc: cardData.identificationNumber,
            email: "test@test.com", // después lo cambiamos por el email real del usuario
            token: token.id,
            price: purchaseSummary.totalMount,
            // paymentMethodId: token.payment_method_id,
            // paymentMethodId: token.bin_attributes?.brand?.code,
            paymentMethodId: "visa",
            reservationId: purchaseSummary.reservationId,
            listChairs: purchaseSummary.chairs.map(c => c.id)
        }

        console.log("paymentBody:", paymentBody)

        const result = await processPayment(paymentBody)
        console.log("resultado pago:", result)

    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Número de Tarjeta</label>
                <input name="cardNumber" onChange={handleChange} />
            </div>
            <div>
                <label>Nombre en la tarjeta</label>
                <input name="cardholderName" onChange={handleChange} />
            </div>
            <div>
                <label>Mes de vencimiento</label>
                <input name="expirationMonth" onChange={handleChange} />
            </div>
            <div>
                <label>Año de vencimiento</label>
                <input name="expirationYear" onChange={handleChange} />
            </div>
            <div>
                <label>CVV</label>
                <input name="securityCode" onChange={handleChange} />
            </div>
            <div>
                <label>Número de identificación</label>
                <input name="identificationNumber" onChange={handleChange} />
            </div>
            <button type="submit">Pagar</button>
        </form>
    )
}