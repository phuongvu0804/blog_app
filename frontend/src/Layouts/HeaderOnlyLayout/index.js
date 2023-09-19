import React from 'react';
import PropTypes from 'prop-types';

import './HeaderOnlyLayout.scss';
import Header from './components/Header';

const HeaderOnlyLayout = ({ children }) => {
    return (
        <div className="header-only-layout__wrapper">
            <Header className="header-only-layout__header" />
            <div className="header-only-layout__container">
                <div className="header-only-layout__content">{children}</div>
            </div>
        </div>
    );
};

HeaderOnlyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnlyLayout;
