import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StockAvgCal from './StockAvgCal';
import SipCal from './SipCal';
import Lumpsum from './Lumpsum';
import CAGRcal from './CAGRcal';
import ReverseCAGR from './ReverseCAGR';

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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
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

function StockAvg() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example">
                        <Tab label="Stock Average Calculator" {...a11yProps(0)} />
                        <Tab label="SIP Calculator" {...a11yProps(1)} />
                        <Tab label="Lumpsum Calculator" {...a11yProps(2)} />
                        <Tab label="CAGR Calculator" {...a11yProps(3)} />
                        <Tab label="Reverse CAGR Calculator" {...a11yProps(4)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <StockAvgCal></StockAvgCal>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <SipCal></SipCal>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <Lumpsum />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                    <CAGRcal />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={4}>
                    <ReverseCAGR />
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default StockAvg