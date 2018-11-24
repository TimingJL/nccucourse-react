import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    .fa-spinner {
        font-size: 3em;
    }
`;

const Spinner = () => (
    <StyledSpinner>
        <i className="fa fa-spinner fa-spin" />
    </StyledSpinner>
);

export default Spinner;
