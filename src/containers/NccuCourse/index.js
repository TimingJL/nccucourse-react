import React from 'react';
import NavigationBar from 'containers/NccuCourse/NavigationBar';
import MainContent from 'containers/NccuCourse/MainContent';
import { StyledNccuCourse } from './Styled';

const NccuCourse = () => (
    <StyledNccuCourse>
        <NavigationBar />
        <MainContent />
    </StyledNccuCourse>
);

export default NccuCourse;
