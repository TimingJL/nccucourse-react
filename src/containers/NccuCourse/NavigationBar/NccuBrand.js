import React from 'react';
import { StyledNccuBrand } from './Styled';

const NccuBrand = () => {
    const handleOnClick = () => {
        window.location = '/';
    }
    return (
        <StyledNccuBrand onClick={handleOnClick}>
            <span className="nccu-brand__nccu">NCCU</span>
            <span className="nccu-brand__course">course</span>
        </StyledNccuBrand>
    );
};

export default NccuBrand;
