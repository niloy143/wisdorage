import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_stripePK);

const PaymentModal = ({ data: { _id, setPaymentData, title, resalePrice } }) => {

    return (
        <>
            <input type="checkbox" id="payment-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setPaymentData(null)}>✕</button>
                    <div>
                        <h2 className='text-xl text-center my-5'>Payment for <span className='font-semibold'>{title}</span> </h2>
                        <div className='p-5'>
                            <Elements stripe={stripePromise}>
                                <CheckOutForm setPaymentData={setPaymentData} resalePrice={resalePrice} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CheckOutForm = ({ setPaymentData, resalePrice }) => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='text-error mt-2'>{error}</p>
            <div className='flex justify-end'>
                <button className='btn btn-neutral mt-5' type="submit" disabled={!stripe}>Pay {resalePrice} TK</button>
            </div>
        </form>
    );
}

export default PaymentModal;