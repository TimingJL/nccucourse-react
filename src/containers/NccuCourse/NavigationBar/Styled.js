import styled from 'styled-components';
import {
    APP_WIDTH,
    APP_PADDING,
    NAVIGATION_BAR_HEIGHT,
} from 'containers/NccuCourse/constants';

export const mixinWidthStyle = () => `
    width: ${APP_WIDTH}px;
    min-width: 200px;
    @media only screen and (max-width: ${APP_WIDTH}px) {
        width: 100%;
        padding: 0px ${APP_PADDING}px;
    }
`;

export const StyledNavigationBar = styled.div`
    display: flex;
    justify-content: center;
    background: #ffffff0a; /* navigation bar background color */
    .navigation-bar__main-content {
        ${mixinWidthStyle()}
        height: ${NAVIGATION_BAR_HEIGHT}px;
        line-height: ${NAVIGATION_BAR_HEIGHT}px;
    }
`;

export const StyledNccuBrand = styled.div`
    cursor: pointer;
    .nccu-brand__nccu {
        color: white;
        font-size: 32px;
        font-weight: 900;
        font-family: 'Archivo Black', sans-serif;
    }
    .nccu-brand__course {
        font-family: 'Francois One', sans-serif;
        color: #5383d3;
        font-size: 25px;
    }
`;
