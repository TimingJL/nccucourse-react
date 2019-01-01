import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRippleButton = styled.button`
    /* Ripple effect */
    background-position: center;
    transition: background 0.8s;
    box-shadow: 0 0 0 white;
    animation: pulse 0.5s infinite;
    &:hover {
        background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
    }
    &:active {
        background-color: #6eb9f7;
        background-size: 100%;
        transition: background 0s;
    }

    /* Button style */
    border: none;
    width: 100%;
    padding: 12px 18px;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    background-color: #2196f3;
    outline: none;
`;

const RippleButton = ({ text, onClick }) => (
    <StyledRippleButton onClick={onClick}>{text}</StyledRippleButton>
);

RippleButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
};

RippleButton.defaultProps = {
    text: '',
    onClick: () => { },
};

export default RippleButton;
