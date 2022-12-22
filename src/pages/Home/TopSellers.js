import React, { useEffect, useState } from 'react';
import useValidImg from '../../hooks/useValidImg';

const TopSellers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:1234/users?role=seller`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        !users.length ? <></> : <div>
            <h3 className='text-2xl sm:text-4xl font-semibold text-center my-12'> Top 10 Sellers </h3>
            <div className='flex items-center justify-center flex-wrap gap-5'>
                {
                    users.slice(0, 10).map((seller, i) => <Seller key={seller._id} seller={{ seller, i }} />)
                }
            </div>
        </div>
    );
};

const Seller = ({ seller: { seller: { displayName, email, photoURL }, i } }) => {
    const [img, setImg] = useState('');
    useValidImg(photoURL, setImg);

    return (
        <div className='w-72 h-72 relative rounded-lg overflow-hidden'>
            <h4 className='absolute bottom-0 left-0 right-0 text-center bg-slate-800/70 text-white py-3 px-5 text-lg font-semibold'>{i + 1}. {displayName}</h4>
            <img className='h-full w-full' src={img || "https://i.ibb.co/B4gCmt8/avatar-icon-free-26.jpg"} alt="" />
        </div>
    );
}

export default TopSellers;