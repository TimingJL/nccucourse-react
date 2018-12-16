import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0px 20px;
    font-size: 1.2em;
    .header__close-btn {
        cursor: pointer;
        color: #e0e0e0;
        &:hover {
            color: initial;
        }
    }
`;

const Header = ({ handleOnHideModal }) => (
    <StyledHeader>
        <span><b>上課時間篩選</b></span>
        <i className="fas fa-times header__close-btn" onClick={handleOnHideModal} />
    </StyledHeader>
);

Header.propTypes = {
    handleOnHideModal: PropTypes.func,
}
Header.defaultProps = {
    handleOnHideModal: () => { },
}

export default Header;
