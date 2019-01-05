import React from 'react';
import gtag from 'utils/tracking';
import { StyledNccuBrand } from './Styled';

const NccuBrand = () => {
    const handleOnClick = () => {
        gtag('event', 'NccuBrand 回首頁');
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
