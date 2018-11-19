import React from 'react';
import NccuBrand from './NccuBrand';
import { StyledNavigationBar } from './Styled';

const NavigationBar = () => (
    <StyledNavigationBar>
        <div className="navigation-bar__main-content">
            <NccuBrand />
        </div>
    </StyledNavigationBar>
);

export default NavigationBar;
