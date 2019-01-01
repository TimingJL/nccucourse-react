import styled, { keyframes } from 'styled-components';

export const StyledCourseDetailPage = styled.div`
    .course-detail__content {
        margin: 10px 0px;
    }
    .course-detail__course-id {
        background: #00b0ba;
        font-size: 1.2em;
        padding: 5px 0px;
        text-align: center;
    }
    .course-detail__course-name-wrapper {
        font-size: 2em;
        background: #ffffff26;
        letter-spacing: 1px;
        transition: all 0.5s;
        &:hover {
            transition: all 0.5s;
            background: #ffffff45;
        }
        cursor: pointer;
        width: 100%;
        padding: 20px 10px;
        text-align: center;
        margin-bottom: 5px;
    }
    .course-detail__course-name-eng {
        font-size: 14px;
        letter-spacing: 1px;
    }
    .course-detail__block-wrapper {
        background: #ffffff26;
        margin: 3px 0px;
        padding: 20px 10px;
        text-align: center;
    }
    .course-detail__block-value {
        font-size: 2.5em;
        color: #36CBD4;
        font-weight: 900;
    }
    .course-detail__block-label {
        font-size: 1.3em;
        color: #ffffffa1;
    }
    .course-detail__block-row-wrapper {
        background: #ffffff26;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #ffffff4d;
    }
    .course-detail__block-row-label {
        color: #ffffffa1;
        font-size: 1.3em;
    }
    .course-detail__block-row-value {
        color: white;
        font-size: 1.3em;
        font-weight: 900;
    }
    .course-detail__info-wrapper {
        display: flex;
        background: #ffffff26;
        padding: 15px 20px;
        border-bottom: 2px solid #ffffff4d;
    }
    .course-detail__info-label {
        flex: 0 0 100px;
        color: #ffffffa1;
        font-size: 1.3em;
    }
    .course-detail__info-value {
        flex: 1 1 auto;
        font-size: 1.3em;
        color: white;
    }
    .course-detail__course-field-pair {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2px 5px;
    }
    .course-detail__button {
        width: 100%;
        height: 50px;
        margin: 20px 0px;
        background: #00b0ba;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.5em;
        transition: all 0.5s;
        &:hover {
            background: #01f1ff;
            transition: all 0.5s;
        }
    }
    .course-detail__instr-group {
        display: grid;
        grid-gap: 2px 5px;
        ${(props) => {
            const repeatNum = props.instrNum >= 3 ? 3 : props.instrNum;
            return `grid-template-columns: repeat(${repeatNum}, 1fr);`;
        }}
        @media only screen and (max-width: 600px) {
            ${(props) => {
                const repeatNum = props.instrNum >= 2 ? 2 : props.instrNum;
                return `grid-template-columns: repeat(${repeatNum}, 1fr);`;
            }}
        }
    }
    .course-detail__instr-btn {
        margin-top: 5px;
        padding: 20px 10px;
        border: none;
        outline: none;
        background: #ffa300;
        font-size: 1.5em;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
            background: #ffbf4e;
            transition: all 0.5s;
        }
    }

    .course-detail__no-data {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
    }
`;
