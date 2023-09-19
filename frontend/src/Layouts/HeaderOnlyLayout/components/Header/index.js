import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

const Header = ({ className }) => {
    return <div className={`header ${className}`}></div>;
};

Header.propTypes = {
    className: PropTypes.string,
};
export default Header;
