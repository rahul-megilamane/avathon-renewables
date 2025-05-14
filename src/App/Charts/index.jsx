import React, { useState } from 'react';
import './charts.css'
import { convertSecondsToHours } from '../utils';
import ChartDisplay from './chartDisplay';
import { MdArrowDropDown } from "react-icons/md";
import TableGrid from './TableGrid';

function Charts(props) {

    const { faultDeviceData, totalDevicesInAsset, deviceData } = props;
    const [chartData, setChartData] = React.useState([])
    const [chartDisplayType, setChartDisplayType] = useState("duration")
    const [selectedChartCategory, setSelectedChartCategory] = useState("Alarm Code");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [totalDevicesWithSelectedAsset, setTotalDevicesWithSelectedAsset] = useState([])

    React.useEffect(() => {
        setTotalDevicesWithSelectedAsset(faultDeviceData.filter((val) => totalDevicesInAsset.includes(val.asset_id)))
    }, [faultDeviceData, totalDevicesInAsset])
    
    
    function getBarChartDataForAlarmDurationByCodes(filterValue){
        if(totalDevicesInAsset.length === 0 || totalDevicesWithSelectedAsset.length === 0) return
        const alarmsCount = {};
        totalDevicesWithSelectedAsset.forEach(item => {
              let code = item[filterValue];
              if(code === ""){
                 code = 'Default'
              }
              alarmsCount[code] = (alarmsCount[code] || 0) + item.duration_seconds;
          });
    
        const sortedEntries = Object.entries(alarmsCount).sort((a, b) => b[1] - a[1]);

        const chartDataTemp = [];

        sortedEntries.forEach((val) => {
            if(chartDataTemp.length > 10) return;
            if(filterValue === "code") {
                chartDataTemp.push({name:faultDeviceData.filter((item) => item.code === +val[0])[0].description, value: convertSecondsToHours(val[1])})
            } else {
                chartDataTemp.push({name:val[0], value: convertSecondsToHours(val[1])})
            }
        })
        setChartData(chartDataTemp)
    }

    function getBarChartDataForAlarmFrequencyByCodes(filterValue){
        if(totalDevicesWithSelectedAsset.length === 0 || totalDevicesInAsset.length === 0) return
        const alarmsCount = {};
        totalDevicesWithSelectedAsset.forEach(item => {
              const id = item[filterValue];
              alarmsCount[id] = (alarmsCount[id] || 0) + 1;
          });
          const chartDataTemp = [];
          const sortedEntries = Object.entries(alarmsCount).sort((a, b) => b[1] - a[1]);
          sortedEntries.forEach((val) => {
            if(chartDataTemp.length > 10) return;
            if(filterValue === "code") {
                chartDataTemp.push({name:faultDeviceData.filter((item) => item.code === +val[0])[0].description, value: val[1]})
            } else {
                chartDataTemp.push({name:val[0], value: convertSecondsToHours(val[1])})
            }
        })
        setChartData(chartDataTemp)
    }

    React.useEffect(()=> {
        if(chartDisplayType === 'duration') {
            getBarChartDataForAlarmDurationByCodes("code")
         } else {
            getBarChartDataForAlarmFrequencyByCodes("code")
         }
    }, [totalDevicesWithSelectedAsset])

    function handleHeaderRadioButtons (value) {
         setChartDisplayType(value)

         if(selectedChartCategory === "Alarm Code") {
            if(value === 'duration') {
                getBarChartDataForAlarmDurationByCodes("code")
            } else {
                getBarChartDataForAlarmFrequencyByCodes("code")
            }
        } else {
            if(value === 'duration') {
                getBarChartDataForAlarmDurationByCodes("category")
            } else {
                getBarChartDataForAlarmFrequencyByCodes("category")
            }
        }
    }

    function handleCategoryTypeDropDown(value) {
        setDropdownOpen(false)
        if(value === selectedChartCategory) {
            return
        }
        setSelectedChartCategory(value);
        handleChartDataSelectionChange(value)
    }

    function handleChartDataSelectionChange(value) {
        if(value === "Alarm Code") {
            if(chartDisplayType === 'duration') {
                getBarChartDataForAlarmDurationByCodes("code")
            } else {
                getBarChartDataForAlarmFrequencyByCodes("code")
            }
        } else {
            if(chartDisplayType === 'duration') {
                getBarChartDataForAlarmDurationByCodes("category")
            } else {
                getBarChartDataForAlarmFrequencyByCodes("category")
            }
        }
    }

    return (
        <React.Fragment>
            <div className='charts'>
                <div className='charts-header'>
                <div className="chart-filter-bar">
                    <span className="chart-filter-devices" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <span>{"By " + selectedChartCategory}</span>
                        <MdArrowDropDown />
                        {dropdownOpen && (
                        <div className="chart-devices-dropdown">
                            {["Alarm Code", "Category"].map((d) => (
                            <div key={d} className="chart-dropdown-item" onClick={() => {
                                handleCategoryTypeDropDown(d)
                            }}>
                                {d}
                            </div>
                            ))}
                        </div>
                        )}
                    </span>
                    <div className="radio-group">
                        <div className="radio-option">
                            <input type="radio" id="duration" name="metric" checked={chartDisplayType === "duration"} value="duration"  onChange={(e) => handleHeaderRadioButtons(e.target.value)}/>
                            <label htmlFor="duration">Duration</label>
                        </div>
                        <div className="radio-option">
                            <input type="radio" id="frequency" name="metric" value="frequency" checked={chartDisplayType === "frequency"} onChange={(e) => handleHeaderRadioButtons(e.target.value)}/>
                            <label htmlFor="frequency">Frequency</label>
                        </div>
                    </div>

                    
                </div>
                </div>
            </div>
            <ChartDisplay 
                chartData={chartData} 
                chartDisplayType={chartDisplayType}
                selectedChartCategory={selectedChartCategory}
            />
            <TableGrid 
                totalDevicesWithSelectedAsset={totalDevicesWithSelectedAsset}
                deviceData={deviceData}
            />
        </React.Fragment>
    )

}

export default Charts;