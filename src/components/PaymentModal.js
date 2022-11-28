import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import Loader from './Loader';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.REACT_APP_stripePK);

const PaymentModal = ({ data: { _id, setPaymentData, title, resalePrice, email, refetch } }) => {

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
                                <CheckOutForm setPaymentData={setPaymentData} resalePrice={resalePrice} email={email} refetch={refetch} _id={_id} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CheckOutForm = ({ _id, setPaymentData, resalePrice, email, refetch }) => {
    const estimatedPrice = resalePrice < 60 ? 60 : resalePrice;

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState(null);
    const [secretLoading, setSecretLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch(`http://localhost:1234/create-payment-intent?email=${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            },
            body: JSON.stringify({ price: estimatedPrice }),
        })
            .then((res) => res.json())
            .then(({ clientSecret, error }) => {
                setSecretLoading(false);
                setClientSecret(clientSecret);
                error && console.error(error);
            });
    }, [estimatedPrice, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPaying(true);

        if (!stripe || !elements) {
            setPaying(false);
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setPaying(false);
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setPaying(false);
            return;
        }
        else {
            setError('');
        }

        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: { email },
            },
        }).then(({ paymentIntent, error: confirmError }) => {
            if (confirmError) {
                setError(confirmError.message);
                setPaying(false);
            }
            else {
                setError('');
                if (paymentIntent.status === "succeeded") {
                    fetch(`http://localhost:1234/order/${_id}?email=${email}`, {
                        method: "PUT",
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email, amount: paymentIntent.amount / 100, transactionId: paymentIntent.id })
                    })
                        .then(res => res.json())
                        .then(({ acknowledged }) => {
                            if (acknowledged) {
                                toast.success('Payment Successful');
                                refetch();
                                setPaymentData(null);
                            }
                            else {
                                toast.error('Something went wrong!')
                            }
                        })
                        .catch(() => toast.error('Something went wrong!'))
                        .finally(() => setPaying(false))
                }
                else {
                    setPaying(false);
                }
            }
        });
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
                <button className='btn btn-neutral mt-5' type="submit" disabled={!stripe || !clientSecret || secretLoading || paying}>{secretLoading || paying ? <Loader /> : `Pay ${estimatedPrice} TK`}</button>
            </div>
            {
                resalePrice < 60 &&
                <p className='text-sm mt-1'><i><b>Note:</b> Minimum payment amount is <b>60 TK</b>. If your ordered book's price is less than 60 TK, then you can pay cash when you get the book or <span className='text-blue-500 cursor-pointer'>Contact us</span>.</i></p>
            }
        </form>
    );
}

export default PaymentModal;