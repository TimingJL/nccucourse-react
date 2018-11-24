import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSemesterList } from 'containers/NccuCourse/selectors';
import { StyledMainContent } from './Styled';
import Routes from './Routes';

class MainContent extends React.Component {
    render() {
        const {
            location,
        } = this.props;

        return (
            <StyledMainContent>
                <div className="main-content__main-content">
                    <Routes
                        location={location}
                    />
                </div>
            </StyledMainContent>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
