import React, { useState, useCallback } from 'react'
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';

function CAGRcal() {
    const [data, setData] = useState({
        initialAmount: 100000,
        fianlAmount: 500000,
        duration: 10,
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value
        })
    }

    let CAGR = ((Math.pow((data.fianlAmount / data.initialAmount), (1 / data.duration)) - 1) * 100).toFixed(2)

    const data02 = [
        { name: "Initial Value", value: data.initialAmount },
        { name: "Final Value", value: data.fianlAmount }
    ];
    const COLORS = ["#0088FE", "#00C49F"];

    return (
        <div>
            <div className="container">
                <h3 >CAGR(Compounded Annual Growth Rate) calculator</h3>
                <hr />
                <div className='row'>
                    <div className='col-md-6'>
                        <div>
                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Initial Investment</label>
                                <FormControl sx={{ width: '120px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' step='1000' min={1000} max={1000000} name='initialAmount' value={data.initialAmount} onChange={inputHandler} color='success' />
                                </FormControl>
                            </div>
                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='initialAmount' value={data.initialAmount} onChange={inputHandler} step={1000} min={1000} max={1000000} />

                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Final Investment</label>
                                <FormControl sx={{ width: '125px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' step={1000} min={1000} max={1000000} value={data.fianlAmount} name='fianlAmount' onChange={inputHandler} />
                                </FormControl>
                            </div>
                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='fianlAmount' value={data.fianlAmount} onChange={inputHandler} step={1000} min={1000} max={1000000} />

                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Duration of investment</label>
                                <FormControl sx={{ width: '120px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        endAdornment={<InputAdornment position="end">Year</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' min={1} max={40} name='duration' value={data.duration} onChange={inputHandler} />
                                </FormControl>
                            </div>
                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='duration' value={data.duration} onChange={inputHandler} min={1} max={40} />
                        </div>

                        <div className="mt-4 CAGR">
                            <h5>
                                CAGR is <span>{CAGR} %</span>
                            </h5>
                        </div>
                    </div>


                    <div className='col-md-6 mt-md-0 mt-4'>
                        <div className='text-center mt-3'>
                            <span className='AI'>Initial Value</span>
                            <span className='TG ms-5'>Final Value</span>
                        </div>
                        <PieChart width={300} height={250} className='chart'>
                            <Pie
                                data={data02}
                                // cx={190}
                                // cy={180}
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value">
                                {data02.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CAGRcal