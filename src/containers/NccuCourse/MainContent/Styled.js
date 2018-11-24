import styled from 'styled-components';
import {
    NAVIGATION_BAR_HEIGHT,
} from 'containers/NccuCourse/constants';
import { mixinWidthStyle } from 'containers/NccuCourse/NavigationBar/Styled'

export const StyledMainContent = styled.div`
    display: flex;
    justify-content: center;
    height: calc(100vh - ${NAVIGATION_BAR_HEIGHT}px);
    overflow-y: auto;
    .main-content__main-content {
        ${mixinWidthStyle()}
    }
`;
