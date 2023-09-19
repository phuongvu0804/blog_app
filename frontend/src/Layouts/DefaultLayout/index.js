import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';

const DefaultLayout = ({ children }) => {
    return (
        //set default width to test headers
        <div className="default-layout__wrapper" style={{ height: '1000px' }}>
            <Header className="default-layout__header" />
            <div className="default-layout__container">
                <div className="default-layout__content">{children}</div>
            </div>
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
