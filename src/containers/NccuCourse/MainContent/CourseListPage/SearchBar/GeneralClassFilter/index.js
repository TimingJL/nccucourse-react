import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    GENERAL_CLASS,
} from 'containers/NccuCourse/constants';

const StyledGeneralClassFilter = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    .general-class__item {
        background: #ffa300;
        padding: 10px 20px;
        font-size: 1.5em;
        text-align: center;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
            background: #ffbf4e;
            transition: all 0.5s;
        }
    }
`;

const GeneralClassFilter = ({ onClick }) => (
    <StyledGeneralClassFilter>
        {
            GENERAL_CLASS.map((generalClass) => (
                <div key={generalClass} data-filter-key={generalClass} className="general-class__item" onClick={onClick}>{generalClass}</div>
            ))
        }
    </StyledGeneralClassFilter>
);

GeneralClassFilter.propTypes = {
    onClick: PropTypes.func,
};

GeneralClassFilter.defaultProps = {
    onClick: () => { },
};

export default GeneralClassFilter;
