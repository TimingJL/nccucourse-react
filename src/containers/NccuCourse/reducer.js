import { fromJS } from 'immutable';

const initialState = fromJS({

});

function nccuCourseReducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default nccuCourseReducer;
