import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

const BalloonTags = ({ filter, handleOnRemoveFilterKey }) => (
    <div className="search-bar__balloon-wrapper">
        {
            filter.get('filterKeys').map((filterKey, index) => (
                <div key={`${filterKey}-${index}`} className="search-bar__balloon-tag">
                    <span>{filterKey}</span>
                    <i data-filter-key={filterKey} data-filter-type="filterKey" className="fas fa-times-circle search-bar__close" onClick={handleOnRemoveFilterKey} />
                </div>
            ))
        }
        {
            filter.get('selectedSession').map((session) => {
                if (session.get('sessionClass').length) {
                    return (
                        <div key={session.get('weekday')} className="search-bar__balloon-tag">
                            <span>{session.get('weekday')}|{session.get('sessionClass')}</span>
                            <i data-filter-key={session.get('weekday')} data-filter-type="selectedSession" className="fas fa-times-circle search-bar__close" onClick={handleOnRemoveFilterKey} />
                        </div>
                    );
                }
                return null;
            })
        }
    </div>
);

BalloonTags.propTypes = {
    filter: PropTypes.instanceOf(Map),
    handleOnRemoveFilterKey: PropTypes.func,
};

BalloonTags.defaultProps = {
    filter: Map(),
    handleOnRemoveFilterKey: () => { },
};

export default BalloonTags;
