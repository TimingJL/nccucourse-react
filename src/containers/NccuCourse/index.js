import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import NavigationBar from 'containers/NccuCourse/NavigationBar';
import MainContent from 'containers/NccuCourse/MainContent';
import {
    fetchSemesterList,
} from './actions';
import { StyledNccuCourse } from './Styled';

class NccuCourse extends React.Component {
    componentDidMount() {
        const {
            handlefetchSemesterList,
        } = this.props;
        handlefetchSemesterList();
    }
    render() {
        return (
            <StyledNccuCourse>
                <NavigationBar />
                <MainContent />
            </StyledNccuCourse>
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
    handlefetchSemesterList: () => dispatch(fetchSemesterList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NccuCourse);
