import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';

function SipCal() {
    const [data, setData] = useState({
        amount: "25000",
        period: "10",
        return: "12",
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value
        })

    }

    let ExpAmnt, AmntInv, TotalGain, monthlyperiod, monthlyreturn;

    monthlyperiod = Number(data.period) * 12
    monthlyreturn = (Number(data.return) / 12) / 100
    ExpAmnt = Math.round((data.amount) * ((Math.pow((1 + monthlyreturn), monthlyperiod) - 1) / monthlyreturn) * (1 + monthlyreturn))
    AmntInv = (Number(data.amount) * monthlyperiod)
    TotalGain = Math.round(ExpAmnt - AmntInv)

    function comma(num) {
        let x = num.toString();
        let lastThree = x.substring(x.length - 3);
        let otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != ''){
            lastThree = ',' + lastThree;}
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    const data02 = [
        { name: "Amount Invested", value: AmntInv },
        { name: "Total Gain", value: ExpAmnt - AmntInv }
    ];
    const COLORS = ["#0088FE", "#00C49F"];

    return (
        <div>
            <div className="container">
                <h3 >SIP(Systematic Investment Plan) calculator</h3>
                <hr />
                <div className='row'>
                    <div className='col-lg-4'>
                        <div>
                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Monthly Investment</label>
                                <FormControl sx={{ width: '120px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' name='amount' value={data.amount} onChange={inputHandler} color='success' />
                                </FormControl>
                            </div>
                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='amount' value={data.amount} onChange={inputHandler} step={500} min={500} max={100000} />

                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Investment Period</label>
                                <FormControl sx={{ width: '120px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        endAdornment={<InputAdornment position="end">Year</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' min={1} max={40} value={data.period} name='period' onChange={inputHandler} />
                                </FormControl>
                            </div>

                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='period' value={data.period} onChange={inputHandler} min={1} max={40} />

                            <div className="d-flex justify-content-between mt-4">
                                <label htmlFor="" className='mt-1'>Expected return rate (p.a)</label>
                                <FormControl sx={{ width: '120px' }} variant="outlined" color='success'>
                                    <OutlinedInput
                                        id="filled-adornment-weight"
                                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                        aria-describedby="filled-weight-helper-text" type='number' min={1} max={30} name='return' value={data.return} onChange={inputHandler} />
                                </FormControl>
                            </div>

                            <Slider className='mt-3' color='success' aria-label="Default" valueLabelDisplay="auto" name='return' value={data.return} onChange={inputHandler} min={1} max={30} />

                        </div>
                    </div>

                    <div className='col-lg-4'>
                        <div className='Sipcal'>
                            <h6>
                                Expected Amount : <span>₹ {comma(ExpAmnt)}</span>
                            </h6>
                            <hr />
                            <h6>
                                Amount invested :  <span>₹ {comma(AmntInv)}</span>
                            </h6>
                            <hr />
                            <h6>
                                Total Gain: <span>₹ {comma(TotalGain)}</span>
                            </h6>
                        </div>
                    </div>
                    <div className='col-lg-4 mt-lg-0 mt-4'>
                        <div className='text-center mt-3'>
                            <span className='AI'>Amount invested</span>
                            <span className='TG ms-5'>Total Gain</span>
                        </div>

                        <PieChart width={300} height={250} className='chart'>
                            <Pie
                                data={data02}
                                // cx={200}
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
        </div >
    )
}

export default SipCal