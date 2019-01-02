import React from 'react';
import styled from 'styled-components';
import history from 'utils/history';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectSemesterList,
    selectSemesterListIsLoading,
} from 'containers/NccuCourse/selectors';
import Spinner from 'components/Spinner';

const StyledSemesterSelectPage = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 20px;
    .semester-select__option {
        font-size: 2em;
        padding: 5px 20px;
        text-align: center;
        background: #ffffff45;
        height: 150px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

class SemesterSelectPage extends React.Component {
    componentDidUpdate() {
        const {
            semesterList,
        } = this.props;
        if (semesterList.size === 1) {
            const semester = semesterList.getIn([0, 'semester']);
            history.push(semester);
        }
    }
    handleOnSemesterSelect = (event) => {
        const semester = event.target.getAttribute('data-semester');
        history.push(semester);
    }
    render() {
        const {
            semesterList,
            isLoading,
        } = this.props;
        return (
            <React.Fragment>
                {
                    isLoading
                        ? <Spinner />
                        : <StyledSemesterSelectPage>
                            {
                                semesterList.map((item) => (
                                    <div
                                        key={item}
                                        data-semester={item.get('semester')}
                                        className="semester-select__option"
                                        onClick={this.handleOnSemesterSelect}
                                    >
                                        <span>{item.get('semester')}</span>
                                    </div>
                                ))
                            }
                        </StyledSemesterSelectPage>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
    isLoading: selectSemesterListIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SemesterSelectPage);
