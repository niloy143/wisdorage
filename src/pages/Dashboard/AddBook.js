import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { WisdorageContext } from '../../ContextProvider/ContextProvider';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [adding, setAdding] = useState(false);
    const { user } = useContext(WisdorageContext);
    const navigate = useNavigate();

    const handleAddBook = ({ title, writer, cover, categoryId, location, price, originalPrice, yearOfPurchase, description, sellersPhone, condition }) => {
        setAdding(true);

        const formData = new FormData();
        formData.append('image', cover[0]);

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbApiKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(({ data: { url } }) => {
                const bookInformation = {
                    categoryId,
                    picture: url,
                    title,
                    writer,
                    location,
                    resalePrice: parseInt(price),
                    originalPrice: parseInt(originalPrice),
                    yearsOfUse: new Date().getFullYear() - parseInt(yearOfPurchase),
                    postedIn: Date.now(),
                    seller: user.displayName,
                    sellerEmail: user.email,
                    verifiedSeller: !!user.verified,
                    available: true,

                    description,
                    sellersPhone,
                    condition,
                }
                
                fetch(`https://wisdorage-server.vercel.app/book?email=${user.email}`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
                    },
                    body: JSON.stringify(bookInformation)
                })
                    .then(res => res.json())
                    .then(({ acknowledged }) => {
                        if (acknowledged) {
                            toast.success('Book added successfully');
                            navigate('/dashboard/my-books')
                        }
                        else {
                            toast.error('Something went wrong!')
                        }
                    })
                    .catch(() => toast.error('Something went wrong!'))
                    .finally(() => setAdding(false))
            })
            .catch(err => {
                setAdding(false);
                console.error(err);
                toast.error('Something Went Wrong!')
            })
    }

    return (
        <>
            <div>
                <h2 className='text-2xl sm:text-4xl text-center my-8 font-semibold'>Add a Book</h2>
                <form onSubmit={handleSubmit(handleAddBook)} className="max-w-xl px-3 mx-auto flex flex-col gap-3 my-12">
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Book Title</label>
                        <input type="text" placeholder="Enter title" className={`input input-bordered ${errors.title && 'input-error'}`} {
                            ...register('title', {
                                required: 'Please enter book title.'
                            })
                        } />
                        {
                            errors.title && <label className='label-text-alt text-error mt-1'>{errors.title.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Written By</label>
                        <input type="text" placeholder="authors name" className={`input input-bordered ${errors.writer && 'input-error'}`} {
                            ...register('writer', {
                                required: 'Please enter authors name.'
                            })
                        } />
                        {
                            errors.writer && <label className='label-text-alt text-error mt-1'>{errors.writer.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Book Cover (Portrait 3:2)</label>
                        <input type="file" accept='.jpg, .png, .jpeg, .webp' className={`file-input file-input-bordered ${errors.cover && 'file-input-error'}`} {
                            ...register('cover', {
                                required: 'Please add a book cover.'
                            })
                        } />
                        {
                            errors.cover && <label className='label-text-alt text-error mt-1'>{errors.cover.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Description</label>
                        <textarea rows={5} placeholder="Add description" className={`textarea textarea-bordered ${errors.description && 'textarea-error'}`} {
                            ...register('description', {
                                required: 'Please add description.',
                                minLength: { value: 50, message: 'At least 50 characters' }
                            })
                        } />
                        {
                            errors.description && <label className='label-text-alt text-error mt-1'>{errors.description.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Handover Location</label>
                        <input type="text" placeholder="Where to handover" className={`input input-bordered ${errors.location && 'input-error'}`} {
                            ...register('location', {
                                required: 'Where to handover?'
                            })
                        } />
                        {
                            errors.location && <label className='label-text-alt text-error mt-1'>{errors.location.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Phone Number</label>
                        <input type="number" placeholder="Enter your phone number" className={`input input-bordered ${errors.sellersPhone && 'input-error'}`} {
                            ...register('sellersPhone', {
                                required: 'Please enter your phone number.'
                            })
                        } />
                        {
                            errors.sellersPhone && <label className='label-text-alt text-error mt-1'>{errors.sellersPhone.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Year of Your Purchase</label>
                        <input type="number" placeholder="Enter year" className={`input input-bordered ${errors.yearOfPurchase && 'input-error'}`} {
                            ...register('yearOfPurchase', {
                                required: 'Please enter when did you purchase it.',
                                validate: year => parseInt(year) <= new Date().getFullYear() || "You can't purchase from the future."
                            })
                        } />
                        {
                            errors.yearOfPurchase && <label className='label-text-alt text-error mt-1'>{errors.yearOfPurchase.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Resale Price (BDT)</label>
                        <input type="number" placeholder="Enter price" className={`input input-bordered ${errors.price && 'input-error'}`} {
                            ...register('price', {
                                required: 'Add a price.'
                            })
                        } />
                        {
                            errors.price && <label className='label-text-alt text-error mt-1'>{errors.price.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Original Price (BDT)</label>
                        <input type="number" placeholder="Enter original price" className={`input input-bordered ${errors.originalPrice && 'input-error'}`} {
                            ...register('originalPrice', {
                                required: 'Please enter original price.'
                            })
                        } />
                        {
                            errors.originalPrice && <label className='label-text-alt text-error mt-1'>{errors.originalPrice.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Condition</label>
                        <select className={`select select-bordered ${errors.condition && 'select-error'}`} defaultValue={'good'} {...register('condition')}>
                            <option value="fair">Fair</option>
                            <option value="good">Good</option>
                            <option value="excellent">Excellent</option>
                        </select>
                        {
                            errors.condition && <label className='label-text-alt text-error mt-1'>{errors.condition.message}</label>
                        }
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-semibold text-lg">Book Category</label>
                        <select className={`select select-bordered ${errors.categoryId && 'select-error'}`} defaultValue={""} {...register('categoryId', {
                            required: 'Please select category'
                        })}>
                            <option value="" disabled>Select a Category</option>
                            <option value="historical-books">Historical Books</option>
                            <option value="bengali-books">Bengali Books</option>
                            <option value="translated-books">Translated Books</option>
                            <option value="stories-and-novels">Stories and Novels</option>
                        </select>
                        {
                            errors.categoryId && <label className='label-text-alt text-error mt-1'>{errors.categoryId.message}</label>
                        }
                    </div>
                    <button className='btn btn-primary mt-5' type="submit" disabled={adding}>{adding ? <Loader /> : 'Add Book'}</button>
                </form>
            </div>
            <Toaster position='bottom-left' />
        </>
    );
};

export default AddBook;