import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,_setSearchParams] = useSearchParams();
    const _success = searchParams.get("success")
    const _orderId = searchParams.get("success")
    const {_url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(_url+"/api/order/verify",{_success,_orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
    <div className="spinner"></div>
    </div>
  )
}

export default Verify