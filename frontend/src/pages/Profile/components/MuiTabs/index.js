import { useState } from 'react';
import PropTypes from 'prop-types';

import './MuiTabs.scss';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import BlogItem from '@/pages/DetailedUser/components/BlogItem';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MuiTabs = ({ data }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const renderBlogs = (blogs) => {
        return blogs.map((blog, index) => <BlogItem key={index} data={blog} />);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                className="profile__label-list"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Saved blogs" {...a11yProps(1)} />
                    <Tab label="Liked blogs" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel
                className="profile__panel-item"
                value={value}
                index={0}
            >
                {renderBlogs(data?.blogs)}
            </CustomTabPanel>
            <CustomTabPanel
                className="profile__panel-item"
                value={value}
                index={1}
            >
                {renderBlogs(data?.savedBlogs)}
            </CustomTabPanel>
            <CustomTabPanel
                className="profile__panel-item"
                value={value}
                index={2}
            >
                {/* Waiting for like function */}
            </CustomTabPanel>
        </Box>
    );
};

export default MuiTabs;
