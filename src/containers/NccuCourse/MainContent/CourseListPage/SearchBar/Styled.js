import styled from 'styled-components';

export const StyledSearchBar = styled.div`
    margin: 10px 0px;
    .search-bar__group {
        display: flex;
        margin: 5px 0px;
    }
    .search-bar__wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        background: white;
        padding: 10px 5px;
        color: black;
        font-size: 1.2em;
        @media only screen and (max-width: 600px) {
            font-size: 1em;
        }
    }
    .search-bar__bar-icon {
        margin-right: 5px;
        color: #e0e0e0;
    }
    .fa-times-circle {
        cursor: pointer;
        &:hover {
            color: #7d7d7d;
        }
    }
    .search-bar__button {
        background: #7edcd9;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        width: 50px;
        font-size: 1.2em;
        border-left: 1px solid white;
        &:hover {
            background: #b9fffd;
        }
    }
    .button-state {
        ${(props) => {
        return !props.hasValue
            ? `
                        background: #eee;
                        cursor: not-allowed;
                        &:hover {
                            background: #eee;
                        }
                    `
            : null;
    }}
    }
    input {
        width: 100%;
        background: none;
        border: none;
        outline: none;
        padding: 0px 10px;
        font-size: 1.3em;
    }

    .search-bar__balloon-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap
    }
    .search-bar__balloon-tag {
        background: #ffa300;
        border-radius: 50px;
        padding: 0px 15px;
        padding-right: 10px;
        height: 28px;
        margin-right: 5px;
        margin-top: 5px;
        display: flex;
        align-items: center;
    }
    .search-bar__close {
        margin-left: 5px;
        &:hover {
            color: black;
        }
    }
`;
