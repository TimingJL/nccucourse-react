import React from 'react';
import styled from 'styled-components';
import gtag from 'utils/tracking';

const StyledPageSelector = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 0px;
    .page-selector__select {
        /* https://thejsguy.com/2016/04/07/styling-select-elements-with-css.html */
        height: 30px;
        width: 100px;
        border-radius: 0;
        padding-left: 43px;

        /* Removes the default <select> styling */
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        /* Positions background arrow image */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC');
        background-repeat: no-repeat;
        background-position: 75px center;
        color: black;
        outline: none;
        border: none;
        border-radius: 50px;
        cursor: pointer;
    }
    .fa-chevron {
        font-size: 1.2em;
        cursor: pointer;
    }
    .fa-chevron-left {
        margin-right: 10px;
    }
    .fa-chevron-right {
        margin-left: 10px;
    }
`;

const PageSelector = ({ pageRange, currentPage, handleOnPageChange }) => {
    const handleOnNextPage = () => {
        const updatedPage = (currentPage + 1) > pageRange ? 1 : (currentPage + 1);
        handleOnPageChange(updatedPage);
        gtag('event', 'page change', {
            'event_category': 'next page',
            'event_label': updatedPage,
        });
    }
    const handleOnPrevPage = () => {
        const updatedPage = (currentPage - 1) < 1 ? pageRange : (currentPage - 1);
        handleOnPageChange(updatedPage);
        gtag('event', 'page change', {
            'event_category': 'prev page',
            'event_label': updatedPage,
        });
    }
    const handleOnSelect = (event) => {
        const page = parseInt(event.target.value, 10);
        handleOnPageChange(page);
        gtag('event', 'page change', {
            'event_category': '選擇頁數',
            'event_label': page,
        });
    }
    const pages = Array.from([...Array(pageRange).keys()], item => item + 1);
    return (
        <StyledPageSelector>
            <i className="fa fa-chevron-left fa-chevron" onClick={handleOnPrevPage} />
            <select value={currentPage} className="page-selector__select" onChange={handleOnSelect}>
                {
                    pages.map((page) => (
                        <option key={page} value={page}>{page}</option>
                    ))
                }
            </select>
            <i className="fa fa-chevron-right fa-chevron" onClick={handleOnNextPage} />
        </StyledPageSelector>
    );
}

export default PageSelector;
