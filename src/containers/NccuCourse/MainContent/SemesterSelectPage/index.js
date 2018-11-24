import React from 'react';
import styled from 'styled-components';
import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSemesterList } from 'containers/NccuCourse/selectors';

const StyledSemesterSelectPage = styled.div`
    display: grid;
    .semester-select__option {
        grid-template-columns: repeat(3, 1fr);
        font-size: 2em;
        padding: 5px 20px;
        margin: 20px 0px;
        text-align: center;
        background: #ffffff45;
        cursor: pointer;
    }
`;

class SemesterSelectPage extends React.Component {
    handleOnSemesterSelect = (event) => {
        const semester = event.target.getAttribute('data-semester');
        console.log(semester);
        history.push(semester);
    }
    render() {
        const {
            semesterList,
        } = this.props;
        return (
            <StyledSemesterSelectPage>
                {
                    semesterList.map((item) => (
                        <div
                            key={item}
                            data-semester={item.get('semester')}
                            className="semester-select__option"
                            onClick={this.handleOnSemesterSelect}
                        >
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
