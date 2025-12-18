import { Box, Tabs, Tab, Typography } from '@mui/material';
import React from 'react';
import CustomTabPanel from './CustomTabPanel';
import { useState } from 'react';

function a11yProps(index: number) {
  return {
    id: `custom-tab-${index}`,
    'aria-controls': `custom-tabpanel-${index}`,
  };
}

export default function UserReservationsTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const customTabStyles = {
        '& .MuiTab-root': {
            textTransform: 'none',
            color: 'var(--main-purple)',      
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.03em',
        },
        '& .MuiTab-root.Mui-selected': {
            color: 'var(--main-orange)',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'var(--main-orange)',
        },
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="user reservations tabs"
                    sx={customTabStyles}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    <Tab label="Current desk reservations" {...a11yProps(0)} />
                    <Tab label="Previous reservations" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Typography>List of current (active/future) reservations</Typography>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Typography>List of past reservations</Typography>
            </CustomTabPanel>

        </Box>
    );
}