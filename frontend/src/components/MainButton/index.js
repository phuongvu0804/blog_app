import React from 'react';
import PropTypes from 'prop-types';

import './MainButton.scss';

const MainButton = ({ className, children }) => {
    return <button className={`main-button ${className}`}>{children}</button>;
};

MainButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default MainButton;
