import React from 'react';

const ConfirmModal = ({ modalData, closeModal, passData, message, button }) => {
    return (
        <>
            < input type="checkbox" id="confirmation" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="confirmation" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Your Confirmation</h3>
                    <p className="py-4">{message || 'Make sure you are aware of what you are doing.'}</p>
                    <div className='flex justify-end'>
                        <button className={`btn ${button?.bg || 'btn-primary'}`} onClick={() => {
                            passData(modalData);
                            closeModal(null);
                        }}>{button?.text || 'Confirm'}</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ConfirmModal;