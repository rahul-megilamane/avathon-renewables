import React from 'react';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { CustomizedAxisTick } from '../utils';

function ChartDisplay(props) {

    const {chartData, chartDisplayType, selectedChartCategory} = props
    const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    return (
        <ResponsiveContainer width="100%" height={400}>
                {selectedChartCategory === "Alarm Code" ? <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        interval={0}
                        height={100}
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis label={{ value: (chartDisplayType === 'duration' ? 'Hours' : 'Count'), angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
                :<PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>}
            </ResponsiveContainer>    
    )
}

export default ChartDisplay;