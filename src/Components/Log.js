import React, { useState, useEffect } from 'react';
import './Style/Log.css'
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useMediaQuery, useTheme } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import logo from './images-iclaim/download (2).png';
import employee from './images-iclaim/employee.png'
import HomeIcon from './images-iclaim/home-regular-60.png';
import { useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import File_export from './images-iclaim/file-export24.png'

const Log = () => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [putdate, setPutDate] = useState(selectedDate.toISOString().slice(0, 10));
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [nameLog, setNameLog] = useState("Dashboard External");


    const usernameJson = JSON.parse(localStorage.getItem('username'));

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 10) {
            setNameLog("Dashboard External");
        } else if (selectedValue === 20) {
            setNameLog("Dashboard Internal");
        }
    };
    

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().slice(0, 10);
        setPutDate(formattedDate);
        fetchLogs();
    };

    const handleDashboardInternalClick = () => {
        navigate('/Dashboard/Internal')
    };

    const handleDashboardExternalClick = () => {
        navigate('/Dashboard/External')
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleEdithospitalClick = () => {
        navigate('/Edit/Hospital')
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    const handleReload = () => {
        navigate('/Dashboard/External')
    };

    const fetchLogs = async () => {
        try {
            const response = await axios.get(`http://rpa-apiprd.inet.co.th:443/iClaim/list/log?date=${putdate}`);
            setLogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching logs:", error);
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(log => log.Date_on.slice(0, 10) === putdate); // กรองข้อมูลเฉพาะที่มีวันที่ตรงกับวันที่ที่เลือกไว้

    return (
        <div className='containerStype'>
            <AppBar position="static" className='appBarStyle' style={{ backgroundColor: 'white', boxShadow: 'none', }}>
                <Toolbar>
                    <Box className='BoxStyle'>
                        <img src={logo} alt="Logo" className='logoStyle' />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box className='Box1'>
                        <Tooltip>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Box className='Box2'>
                                <Avatar
                                            alt="employee.png"
                                            src={employee}
                                            className='Avatar-img'
                                    />
                                    <Typography variant="body1" style={{ fontSize: isSmallScreen ? '8px' : '16px', fontWeight: 'bold', fontFamily: "'Kanit', sans-serif" }}>
                                        {usernameJson.username}
                                    </Typography>
                                    <KeyboardArrowDownIcon />
                                </Box>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            className='Menu-list'
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            PaperProps={{
                                style: {

                                    maxHeight: isSmallScreen ? '' : '200px',
                                    width: isSmallScreen ? '108px' : '150px',
                                },
                            }}
                        >
                            {['กำหนดสิทธิ์', 'แก้ไขโรงพยาบาล', 'Log', 'ออกจากระบบ'].map((setting) => (
                                <MenuItem key={setting} style={{ padding: isSmallScreen ? '0 5px' : '8px 12px' }} onClick={setting === 'ออกจากระบบ' ? handleLogout : setting === 'แก้ไขโรงพยาบาล' ? handleEdithospitalClick : null}>
                                    <Typography style={{ fontFamily: "'Kanit', sans-serif", padding: isSmallScreen ? '0 12px' : '0 10px', fontSize: isSmallScreen ? '12px' : '16px', margin: isSmallScreen ? '1px 0' : '0 0' }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className='container'>
                <div className='Fixlocation'>
                    <button onClick={handleReload}>
                        <img src={HomeIcon} alt="HomeIcon" className='homeicon' />
                    </button>
                </div>
                <div className='Fixlocation'>
                    <button className="Dashboard-Internal-button" onClick={handleDashboardInternalClick} >Dashboard Internal</button>
                </div>
                <div className='Fixlocation'>
                    <button className="Dashboard-Internal-button" onClick={handleDashboardExternalClick} >Dashboard External</button>
                </div>
                <div className='Fixlocation'>
                    <DatePicker className='Dashboard-Internal-button-date' selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" />
                </div>
                <div className='Fixlocation'>
                <FormControl sx={{ minWidth: 120}} size="small">
                <Select 
                    style={{
                        fontFamily:"'Kanit', sans-serif",
                        fontWeight:'700',
                        width: isSmallScreen ? '100px':'auto',
                        height:'34px',
                        fontSize: isSmallScreen ? '7px':'16px',
                        marginTop:'5px',
                        borderRadius:'10px',
                        background: '#c7c7c7',
                        border: 'none',
                    }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    onChange={handleChange}
                    defaultValue={10}
                >
                    <MenuItem value={10} className='DropDown_Log'>Dashboard External</MenuItem>
                    <MenuItem value={20} className='DropDown_Log'>Dashboard Internal</MenuItem>
                </Select>
                </FormControl>
                </div>
                </div>
            <Card className='cardStyle_Log' style={{ backgroundColor: '#D9D9D9', boxShadow: 'none', borderRadius: '15px' }}>
                    {loading ? (
                        <p style={{ textAlign: "center" }}>Loading...</p>
                    ) : filteredLogs && filteredLogs.length > 0 ? (
                        <CardContent>
                            <div>
                                <h1 className='Text_Log' style={{ fontFamily: "'Kanit', sans-serif" }}>Log {nameLog}</h1>
                                <div><img src={File_export} alt="HomeIcon" className='file_export'/></div>
                            </div>
                            <div className='background_log'>
                                <p className='insert_date1' style={{ borderRadius: isSmallScreen ? '4px 0 0 4px' : '8px 0 0 8px' }}>Date</p>
                                <p className='insert_date1'>Status</p>
                                <p className='insert_date1'>Action By</p>
                                <p className='insert_date1' style={{ borderRadius: isSmallScreen ? '0 4px 4px 0' : '0 8px 8px 0' }}>Comment</p>
                            </div>
                            {filteredLogs.map((log, index) => (
                                <div key={index} className='box_insert_data2'>
                                    <p className='insert_date2'>{log.Date_on}</p>
                                    <p className='insert_date2'>{log.Status}</p>
                                    <p className='insert_date2'>{log.User_name}</p>
                                    <p className='insert_date2'>{log.Remark}</p>
                                </div>
                            ))}
                        </CardContent>
                    ) : (
                        <p style={{ textAlign: "center", fontFamily: "'Kanit', sans-serif", fontSize: isSmallScreen ? '8px' : '20px' }}>ไม่มีข้อมูลสําหรับวันที่เลือก</p>
                    )}
            </Card>

        </div>
    );
};

export default Log;