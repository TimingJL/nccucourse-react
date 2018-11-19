import styled from 'styled-components';
import {
    APP_WIDTH,
    APP_PADDING,
} from 'containers/NccuCourse/constants';

export const StyledMainContent = styled.div`
    display: flex;
    justify-content: center;
    .main-content__main-content {
        width: ${APP_WIDTH}px;
        @media only screen and (max-width: ${APP_WIDTH}px) {
            width: 100%;
            padding: 0px ${APP_PADDING}px;
        }
    }
`;
