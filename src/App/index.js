import React from 'react';
import './App.css';
import Header from './Header';

import deviceJsonData from './ducks/device.json';
import faultJsonData from './ducks/fault.json';
import { secondsToHoursConversion } from './utils';
import Charts from "./Charts";

function App() {

  const [deviceData, setDeviceData] = React.useState([]);
  const [faultDeviceData, setFaultDeviceData] = React.useState([]);

  const [dashboardData, setDashboardData] = React.useState({totalAlarmDuration: "", totalCountOfAlarms: 0, deviceWithMaxAlarms: "", maxDurationAlarm: ""});

  const [deviceAssetLocation, setAssetLocation] = React.useState("");
  const [totalDevicesInAsset, setTotalDevicesInAsset] = React.useState([])

  React.useEffect(() => {
    setDeviceData(deviceJsonData);
    setFaultDeviceData(faultJsonData);
    setAssetLocation("Minneapolis")
  }, []);

  React.useEffect(() => {
    const totalDevices = deviceData
          .filter(item => item.asset === deviceAssetLocation)
          .map(item => item.asset_id);
    setTotalDevicesInAsset(totalDevices)
  }, [deviceAssetLocation])

  React.useEffect(() => {
    if(deviceData.length > 0 && faultDeviceData.length > 0 && totalDevicesInAsset.length > 0) {
      

      const totalCountOfAlarms = faultDeviceData.filter((val) => totalDevicesInAsset.includes(val.asset_id))
      const totalAlarmDuration = secondsToHoursConversion(totalCountOfAlarms.reduce((sum, item) => sum + item.duration_seconds,0))
      
      const deviceWithMaxAlarmDuration = totalCountOfAlarms.reduce((max, item) => {
        return item.duration_seconds > max.duration_seconds ? item : max;
      }, totalCountOfAlarms[0]); // start with the first item

      const maxDurationAlarm = secondsToHoursConversion(deviceWithMaxAlarmDuration.duration_seconds)

      const alarmsCount = {};

      faultDeviceData.forEach(item => {
        if(totalDevicesInAsset.includes(item.asset_id)) {
          const id = item.device_id;
          alarmsCount[id] = (alarmsCount[id] || 0) + 1;
        }
      });

      // Step 2: Find the device_id with the max count
      let maxDeviceId = null;
      let maxCount = 0;
      
      for (const [deviceId, count] of Object.entries(alarmsCount)) {
        if (count > maxCount) {
          maxDeviceId = deviceId;
          maxCount = count;
        }
      }
      const deviceWithMaxAlarms = deviceData.filter((val) => val.id === +maxDeviceId)[0]?.device_name

      setDashboardData({ totalAlarmDuration: totalAlarmDuration, totalCountOfAlarms: totalCountOfAlarms.length, deviceWithMaxAlarms: deviceWithMaxAlarms, maxDurationAlarm:maxDurationAlarm})

    }
  }, [totalDevicesInAsset]);

  return (
    <div className="App">
      <Header 
        deviceAssetLocation={deviceAssetLocation}
        setAssetLocation={setAssetLocation}
        dashboardData={dashboardData}
      />
      <Charts
        deviceAssetLocation={deviceAssetLocation}
        faultDeviceData={faultDeviceData}
        deviceData={deviceData}
        totalDevicesInAsset={totalDevicesInAsset}
      />
    </div>
  );
}

export default App;
