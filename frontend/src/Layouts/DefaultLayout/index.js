import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';

import './DefaultLayout.scss';
const DefaultLayout = ({ children }) => {
    return (
        <div className="default-layout__wrapper">
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
