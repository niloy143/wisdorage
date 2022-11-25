import React from 'react';

const BookCategories = () => {
    const categories = [
        {
            _id: 1,
            name: 'Bengali Books',
            des: 'Books those are written by bengali writers are listed in this category.',
            bgImg: 'https://i.ibb.co/swKL93S/bangla.jpg'
        },
        {
            _id: 2,
            name: 'Translated Books',
            des: 'Books those are translated to bengali are listed in this category.',
            bgImg: 'https://i.ibb.co/9Z9GbmV/untitled-14-192579.jpg'
        },
        {
            _id: 3,
            name: 'Stories and Novels',
            des: 'Story and Novel books are listed in this category.',
            bgImg: 'https://i.ibb.co/yqbxnmY/10639587-10152664668000982-2086647037098685860-n.jpg'
        },
        {
            _id: 4,
            name: 'Historical Books',
            des: 'Books those are written about history and truth are listed in this category.',
            bgImg: 'https://i.ibb.co/wL1d8nF/inner2-20210323134503.jpg'
        },
    ]
    return (
        <div className='my-24'>
            <h2 className='text-3xl sm:text-4xl my-12 text-center font-bold'>Select Category</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3 my-12`}>
                {
                    categories.map(({ _id, name, des, bgImg }) => <div className="card max-w-xs mx-auto bg-base-100 shadow-xl image-full" key={_id}>
                        <figure><img src={bgImg} alt={name} /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-white text-2xl">{name}</h2>
                            <p className='text-white/90'>{des}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default BookCategories;