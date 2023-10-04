import React from 'react';

import SearchIcon from '@mui/icons-material/Search';

import './SearchField.scss';
import { Box } from '@mui/material';

const SearchField = ({ className }) => {
    return (
        <Box className={`header__search-field ${className}`}>
            <SearchIcon className="header__search-icon" />
            <input
                className="header__search-input"
                placeholder="Search Medium"
            />
        </Box>
    );
};

export default SearchField;
