import React from 'react';

import DataTable from 'react-data-table-component';

function TableGrid(props) {

    const {totalDevicesWithSelectedAsset, deviceData} = props
    const [tableColumns, setTableColumns] = React.useState([])

    React.useEffect(() => {
        if(totalDevicesWithSelectedAsset.length > 0 && deviceData.length > 0) {
            setTableColumns([{
                name: 'Device',
                selector: row => deviceData?.find(val => val.id === row.device_id)?.device_name || 'Unknown',
                sortable: false,
              },
              {
                name: 'Category',
                selector: row => row.category,
                sortable: true,
              },
              {
                name: 'Alarm Code',
                selector: row => row.code,
                sortable: true,
              },
              {
                name: 'Description',
                selector: row => row.description,
                sortable: true,
              },
              {
                name: 'Duration',
                selector: row => row.duration_seconds,
                sortable: true,
              },
              {
                name: 'Fault Type',
                selector: row => row.fault_type,
                sortable: true,
              },
              {
                name: 'Resolution Time',
                selector: row => row.resolution_time_stamp,
                sortable: true,
              },
              {
                name: 'Start Time',
                selector: row => row.time_stamp,
                sortable: true,
              }])
        }
    }, [totalDevicesWithSelectedAsset, deviceData])

    return (
        <div style={{ padding: '20px' }}>
            <DataTable
                columns={tableColumns}
                data={totalDevicesWithSelectedAsset}
                pagination
                highlightOnHover
                striped
                responsive
            />
        </div>
    )
}

export default TableGrid;