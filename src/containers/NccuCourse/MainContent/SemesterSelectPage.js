import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSemesterList } from 'containers/NccuCourse/selectors';

class SemesterSelectPage extends React.Component {
    render() {
        const {
            // location,
            semesterList,
        } = this.props;

        return (
            <div>
                SemesterSelectPage
                {
                    semesterList.map((item) => (
                        <div key={item}>{item.get('semester')}</div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    semesterList: selectSemesterList(),
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SemesterSelectPage);
