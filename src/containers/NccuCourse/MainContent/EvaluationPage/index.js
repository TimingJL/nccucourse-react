import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
    selectEvaluationList,
    selectEvaluationListIsLoading,
} from 'containers/NccuCourse/selectors';
import {
    fetchEvaluationList,
} from 'containers/NccuCourse/actions';
import Spinner from 'components/Spinner';
import NoData from 'components/NoData';
import Course from './Course';
import {
    StyledEvaluationPage,
} from './Styled';

class EvaluationPage extends React.Component {
    static propTypes = {
        match: PropTypes.object,
        location: PropTypes.object,
        evaluationList: PropTypes.instanceOf(List),
        isLoading: PropTypes.bool,
        handleFetchEvaluationList: PropTypes.func,
    }
    static defaultProps = {
        match: {},
        location: {},
        evaluationList: List(),
        isLoading: false,
        handleFetchEvaluationList: () => { },
    }
    state = {};
    componentDidMount() {
        const {
            evaluationList,
            handleFetchEvaluationList,
        } = this.props;
        if (!evaluationList.size) {
            handleFetchEvaluationList();
        }
    }
    render() {
        const {
            match: {
                params: {
                    instructor,
                },
            },
            evaluationList,
            isLoading,
        } = this.props;
        if (!evaluationList.size || isLoading) {
            return <Spinner />;
        }
        const foundEvaluation = evaluationList.find((evaluation) => evaluation.get('instructor') === instructor);
        if (!foundEvaluation) {
            return <NoData />;
        }

        return (
            <StyledEvaluationPage>
                <div className="evaluation__department">{foundEvaluation.get('department')}</div>
                <div className="evaluation__instructor">{foundEvaluation.get('instructor')}</div>
                {
                    foundEvaluation.get('course').map((course) => (
                        <Course key={course} course={course} />
                    ))
                }
            </StyledEvaluationPage>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    evaluationList: selectEvaluationList(),
    isLoading: selectEvaluationListIsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
    handleFetchEvaluationList: () => dispatch(fetchEvaluationList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPage);
