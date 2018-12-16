import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    SESSION_WEEKDAYS,
    SESSION_CLASS,
} from 'containers/NccuCourse/constants';

const mixinTimeTableItem = () => `
    border: 1px solid #eee;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    @media only screen and (max-width: 600px) {
        line-height: 20px;
    }
`;

const StyledContent = styled.div`
    padding: 15px 20px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    .time-table__header-item {
        ${mixinTimeTableItem()}
        background: #7edcd845;
        color: initial;
        &:hover {
            background: #7edcd8;
            color: white;
            border: none;
        }
    }
    .time-table__column {
        display: grid;
        grid-template-rows: repeat(7, 1fr);
        align-items: center;
    }
    .time-table__item {
        ${mixinTimeTableItem()}
        &:hover {
            background: #eee;
        }
    }
`;

const Content = () => (
    <StyledContent>
        {
            SESSION_WEEKDAYS.map((weekday) => (
                <div
                    key={weekday}
                    data-weekday={weekday}
                    className="time-table__header-item"
                // onClick={this.handleOnSelectAllSession}
                >
                    {weekday}
                </div>
            ))
        }
        {
            SESSION_WEEKDAYS.map((weekday) => (
                <div key={weekday} className="time-table__column">
                    {
                        SESSION_CLASS.map((sessionClass) => (
                            <div
                                key={sessionClass}
                                data-weekday={weekday}
                                data-sessionclass={sessionClass}
                                // className={styleTableItem(selectedSession, weekday, session)}
                                className="time-table__item"
                                // onClick={this.handleOnSessionSelect}
                            >
                                <span>{sessionClass}</span>
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </StyledContent>
);

Content.propTypes = {
    handleOnHideModal: PropTypes.func,
}
Content.defaultProps = {
    handleOnHideModal: () => { },
}

export default Content;
