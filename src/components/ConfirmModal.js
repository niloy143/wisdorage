import React from 'react';

const ConfirmModal = ({ data }) => {
    return (
        <>
            < input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="confirm-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Your Confirmation</h3>
                    <p className="py-4">{data.message || 'Make sure you are aware of what you are doing.'}</p>
                    <div className='flex justify-end'>
                        <button className={`btn ${data.button?.bg || 'btn-primary'}`} onClick={() => {
                            data.action(data);
                            data.setData(null);
                        }}>{data.button?.text || 'Confirm'}</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ConfirmModal;