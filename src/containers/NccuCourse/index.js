import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import NavigationBar from 'containers/NccuCourse/NavigationBar';
import MainContent from 'containers/NccuCourse/MainContent';
import {
    fetchSemesterList,
    setSemesterListLoading,
} from './actions';
import { StyledNccuCourse } from './Styled';

class NccuCourse extends React.Component {
    componentDidMount() {
        const {
            handlefetchSemesterList,
            setSemesterListLoading,
        } = this.props;
        setSemesterListLoading(true);
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
    setSemesterListLoading: (isLoading) => dispatch(setSemesterListLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NccuCourse);
