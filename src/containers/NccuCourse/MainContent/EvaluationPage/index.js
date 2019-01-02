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
            // match,
            // pathname,
            // evaluationList,
            isLoading,
        } = this.props;
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <div>evaluationPage</div>
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
