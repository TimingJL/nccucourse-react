import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import {
    SESSION_WEEKDAYS,
    SESSION_CLASS,
    ALL,
} from 'containers/NccuCourse/constants';

const mixinTimeTableItem = () => `
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
        background: #7edcd8;
        color: initial;
        &:hover {
            background: #8ef1ec;
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
    .time-table__item-select {
        ${mixinTimeTableItem()}
        background: #89e0dd59;
        &:hover {
            background: #56c5b5;
        }
    }
`;

const styleTableItem = (selectedSession, weekday, sessionClass) => {
    if (!selectedSession.size) {
        return 'time-table__item';
    }
    const foundClass = selectedSession
        .find((session) => session.get('weekday') === weekday)
        .get('sessionClass').includes(sessionClass);
    return foundClass
        ? 'time-table__item-select'
        : 'time-table__item';
};

const Content = ({ selectedSession, handleOnSelect }) => (
    <StyledContent>
        {
            SESSION_WEEKDAYS.map((weekday) => (
                <div
                    key={weekday}
                    data-weekday={weekday}
                    data-sessionclass={ALL}
                    className="time-table__header-item"
                    onClick={handleOnSelect}
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
                                className={styleTableItem(selectedSession, weekday, sessionClass)}
                                onClick={handleOnSelect}
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
    selectedSession: PropTypes.instanceOf(List),
    handleOnSelect: PropTypes.func,
}
Content.defaultProps = {
    selectedSession: List(),
    handleOnSelect: () => { },
}

export default Content;
