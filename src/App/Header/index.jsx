import React from "react";
import './header.css';
import { MdArrowDropDown, MdAccessTime, MdAccessTimeFilled, MdNotificationsActive, MdOutlineCardTravel } from "react-icons/md";

function Header(props) {
    const { deviceAssetLocation, dashboardData } = props;
    const [dropdown, setDropdown] = React.useState({device: false, location: false});

    const handleLocationDropDown = (location) => {
        if(location !== deviceAssetLocation) {
            props.setAssetLocation(location);
        }
        setDropdown({device: false, location: false});
    }


    return (
        <div className="main-header">
            <div className="header-container">
                <div className="header-title">
                    <span className="title-content">Dashboard</span>
                </div>
                <div className="header-filters">
                    <div className="filters-container">
                        <div className="filter-place">
                            <span  onClick={() => setDropdown({device: false, location: !dropdown.location})}>{deviceAssetLocation}</span>
                            <MdArrowDropDown  onClick={() => setDropdown({device: false, location: !dropdown.location})}/>
                                {dropdown.location && <div className="place-dropdown">
                                    <div className={["dropdown-item", deviceAssetLocation === "Minneapolis"].join(" ,")} onClick={() => handleLocationDropDown("Minneapolis")}>Minneapolis</div>
                                    <div className={["dropdown-item", deviceAssetLocation === "Colorado"].join(" ,")} onClick={() => handleLocationDropDown("Colorado")}>Colorado</div>
                                </div>}
                        </div>
                        <span className="filter-devices">
                            <span>All devices</span>
                            <MdArrowDropDown />
                            {/* <div className="devices-dropdown">
                                <div className="dropdown-item">All devices</div>
                                <div className="dropdown-item">Device 1</div>
                                <div className="dropdown-item">Device 2</div>
                            </div> */}
                        </span>
                    </div>
                </div>
            </div>
            <div className="dashboard-summary">
                <div className="summary-container">
                    <div className="summary-box">
                        <span className="summary-icon warning"><MdAccessTime /></span>
                        <span className="summary-title warning">{dashboardData.totalAlarmDuration}</span>
                        <span className="summary-content">Total Alarm Duration</span>
                    </div>
                    <div className="summary-box">
                        <span className="summary-icon"><MdNotificationsActive /></span>
                        <span className="summary-title">{dashboardData.totalCountOfAlarms}</span>
                        <span className="summary-content">Total Count of Alarms</span>
                    </div>
                    <div className="summary-box">
                        <span className="summary-icon"><MdOutlineCardTravel /></span>
                        <span className="summary-title">{dashboardData.deviceWithMaxAlarms}</span>
                        <span className="summary-content">Device with Max Alarms</span>
                    </div>
                    <div className="summary-box">
                        <span className="summary-icon"><MdAccessTimeFilled /></span>
                        <span className="summary-title">{dashboardData.maxDurationAlarm}</span>
                        <span className="summary-content">Max Duration Alarm</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header