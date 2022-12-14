import React from 'react';

const ConfirmModal = ({ data, modalId }) => {
    return (
        <>
            < input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => data.setData(null)}>✕</button>
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