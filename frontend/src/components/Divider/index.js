import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import './DotDivider.scss';
const DotDivider = ({ sx, ...props }) => {
    return (
        <FiberManualRecordIcon
            className="dot-divider"
            sx={{ ...sx }}
            {...props}
        />
    );
};

export default DotDivider;
