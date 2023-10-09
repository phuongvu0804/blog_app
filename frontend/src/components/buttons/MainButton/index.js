import React from 'react';
import PropTypes from 'prop-types';

import './MainButton.scss';
import { Link } from 'react-router-dom';

const MainButton = ({ className, children, ...props }) => {
    let Button = 'button';
    if (props.to || props.href) {
        Button = Link;
    }

    return (
        <Button className={`main-button ${className}`} {...props}>
            {children}
        </Button>
    );
};

MainButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default MainButton;
