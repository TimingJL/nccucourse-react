import styled from 'styled-components';
const ORANGE = '#ffa300';

export const StyledEvaluationPage = styled.div`
    .evaluation__instructor {
        text-align: center;
        padding: 15px 20px;
        background: #ffffff26;
        font-size: 2em;
        font-weight: 500;
        border-bottom: 2px solid ${ORANGE};
        letter-spacing: 1px;
    }
    .evaluation__department {
        text-align: center;
        background: ${ORANGE};
        color: white;
        letter-spacing: 3px;
    }
`;

export const StyledCourse = styled.div`
    margin: 40px 0px;
    letter-spacing: 1px;
    .course__title-wrapper {
        background: #ffffff26;
        text-align: center;
    }
    .course__course-id {
        background: ${ORANGE};
        font-size: 1.2em;
        padding: 5px 0px;
    }
    .course__course-name-wrapper {
        padding: 15px 10px;
    }
    .course__course-name {
        font-size: 2em;
    }
    .course__course-semester {
        color: #ffffffa1;
    }
    .course__block-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 5px;
        margin-top: 5px;
    }
    .course__block {
        background: #ffffff26;
        padding: 15px 10px;
        text-align: center;
    }
    .course__label {
        font-size: 1.3em;
        color: #ffffffa1;
    }
    .course__value {
        font-size: 2.5em;
        color: ${ORANGE};
        font-weight: 900;
    }
    .course__comments-wrapper {
        margin-top: 5px;
    }
    .course__comment {
        background: #ffffff26;
        border-bottom: 2px solid #ffffff4d;
        padding: 10px 20px;
        font-size: 1.3em;
    }
`;
