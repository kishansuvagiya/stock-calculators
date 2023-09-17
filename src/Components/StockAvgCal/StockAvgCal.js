import React, { useState } from 'react'
import './StockAvg.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

function StockAvgCal() {
    const [data, setData] = useState({
        firstunit: "",
        firstprice: "",
        secondunit: "",
        secondprice: "",
    })

    const [error, setError] = useState(false)

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setData({
            ...data, [name]: value
        })

    }

    const [text, settext] = useState([])

    const [zero, setZero] = useState(true)

    const avgResult = () => {
        if (data.firstunit.length == 0 || data.firstprice.length == 0 || data.secondprice.length == 0 || data.secondunit.length == 0) {
            setError(true)
        }
        else {
            settext([...text, data])
            setZero(false)
            setError(false)
        }
    }
    const clearField = () => {
        setData({
            firstunit: "",
            firstprice: "",
            secondunit: "",
            secondprice: "",
        })
        settext([])
        setZero(true)
        setError(false)
    }

    let Amount1, Amount2, TotalUnit, TotalAmount, AvgPrice;

    text.map((text) => {
        Amount1 = Math.round(Number(text.firstprice) * Number(text.firstunit))
        Amount2 = Math.round(Number(text.secondprice) * Number(text.secondunit))
        TotalUnit = Number(text.firstunit) + Number(text.secondunit)
        TotalAmount = Amount1 + Amount2
        AvgPrice = (TotalAmount / TotalUnit).toFixed(2)

    })

    function comma(num) {
        let x = num.toString();
        let lastThree = x.substring(x.length - 3);
        let otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '') {
          lastThree = ',' + lastThree;
        }
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
      }

    return (
        <div>
            <div className="container">
                <h3>Stock market average calculator</h3>
                <hr />
                <div className='row'>
                    <div className='col-lg-3'>
                        <div>
                            <h5 >First Purchase</h5>
                            <hr />
                            <TextField required sx={{ marginTop: "20px" }} color='success' id="outlined-required" fullWidth label="Units" variant="outlined" type="number" name='firstunit' value={data.firstunit} onChange={inputHandler} />
                            {error && data.firstunit.length <= 0 ? <div style={{ color: "red" }}>Units can't be Empty.</div> : ""
                            }

                            <TextField required sx={{ marginTop: "40px" }} color='success' id="outlined-required" fullWidth label="Price Per Share" variant="outlined" type="number" name='firstprice' value={data.firstprice} onChange={inputHandler} />
                            {error && data.firstprice.length <= 0 ? <div style={{ color: "red" }}>Price can't be Empty.</div> : ""}
                        </div>
                    </div>

                    <div className='col-lg-3 mt-4 mt-lg-0'>
                        <div>
                            <h5>Second Purchase</h5>
                            <hr />
                            <TextField required sx={{ marginTop: "20px" }} color='success' id="outlined-required" fullWidth label="Units" variant="outlined" type="number" name='secondunit' value={data.secondunit} onChange={inputHandler} />
                            {error && data.secondunit.length <= 0 ? <div style={{ color: "red" }}>Units can't be Empty.</div> : ""}

                            <TextField required sx={{ marginTop: "40px" }} color='success' id="outlined-required" fullWidth label="Price Per Share" variant="outlined" type="number" name='secondprice' value={data.secondprice} onChange={inputHandler} />
                            {error && data.secondprice.length <= 0 ? <div style={{ color: "red" }}>Price can't be Empty.</div> : ""}
                        </div>
                    </div>

                    <div className='col-lg-6 mt-4 mt-lg-0'>
                        <div className='stockavg_result'>
                            <h6>
                                Amount invested on 1<sup>st</sup> Buy: {zero ? <span> 0 </span> : <span>₹ {comma(Amount1)}</span>}
                            </h6>
                            <hr />
                            <h6>
                                Amount invested on 2<sup>nd</sup> Buy: {zero ? <span> 0 </span> : <span>₹ {comma(Amount2)}</span>}
                            </h6>
                            <hr />
                            <h6>
                                Total Units: {zero ? <span> 0 </span> : <span> {TotalUnit}</span>}
                            </h6>
                            <hr />
                            <h6>
                                Average Price: {zero ? <span> 0 </span> : <span>{AvgPrice}</span>}
                            </h6>
                            <hr />
                            <h6>
                                Total Amount: {zero ? <span> 0 </span> : <span>₹ {comma(TotalAmount)}</span>}
                            </h6>
                        </div>
                    </div>
                </div>
                <div>
                    <Button sx={{ marginTop: "30px" }} color='success' variant="contained" onClick={avgResult}>Calculate Average</Button>
                    <Button sx={{ marginTop: "30px", marginLeft: "10px" }} color='warning' variant="contained" onClick={clearField}>Clear Fields</Button>
                </div>
            </div>
        </div>
    )
}

export default StockAvgCal