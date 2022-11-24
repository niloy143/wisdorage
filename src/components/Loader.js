import React from 'react';
import { SpinnerCircularFixed, SpinnerDotted } from 'spinners-react';

const Loader = ({ size, body, section }) => {
    return (
        <div className={`${body && 'h-[80vh]'} ${section && 'lg:py-24 py-12'} flex items-center justify-center`}>
            {
                body || section ? <SpinnerDotted size={50} thickness={100} speed={180} color="#8C0327" /> :
                    <SpinnerCircularFixed size={size || 28} thickness={120} speed={180} color="#8C0327" secondaryColor="rgba(0, 0, 0, 0.4)" />
            }
        </div>
    );
};

export default Loader;