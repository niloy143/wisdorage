import React from 'react';
import { SpinnerCircularFixed, SpinnerDotted } from 'spinners-react';

const Loader = ({ size, body }) => {
    return (
        <div className={`${body && 'lg:py-48 py-24'} flex justify-center`}>
            {
                body ? <SpinnerDotted size={50} thickness={100} speed={180} color="#8C0327" /> :
                    <SpinnerCircularFixed size={size || 28} thickness={120} speed={180} color="#8C0327" secondaryColor="rgba(0, 0, 0, 0.4)" />
            }
        </div>
    );
};

export default Loader;