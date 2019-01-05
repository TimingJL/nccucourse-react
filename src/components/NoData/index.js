import React from 'react';
import styled from 'styled-components';

const StyledNoData = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
`;

const NoData = () => <StyledNoData>No data</StyledNoData>;

export default NoData;
