import React from 'react';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSemesterList } from 'containers/NccuCourse/selectors';

const StyledSemesterSelectPage = styled.div`
    display: grid;
`;

class SemesterSelectPage extends React.Component {
    render() {
        const {
            semesterList,
        } = this.props;

        return (
            <StyledSemesterSelectPage>
                {
                    semesterList.map((item) => (
                        <div key={item}>
                            {item.get('semester')}
                        </div>
                    ))
                }
            </StyledSemesterSelectPage>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SemesterSelectPage);
