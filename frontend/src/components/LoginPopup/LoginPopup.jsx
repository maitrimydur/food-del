import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {_url, _setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")
    const [_data,_setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const _onChangeHandler = (event) => {
        const _name = event.target.name;
        const _value = event.target.value;
        _setData(data=>({...data,[_name]:_value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let _newUrl = _url;
        if (currState==="Login") {
            _newUrl += "/api/user/login"
        }
        else {
            _newUrl += "/api/user/register"
        }

        const _response = await axios.post(_newUrl,_data);

        if (_response.data.success) {
            _setToken(_response.data.token);
            localStorage.setItem("token",_response.data.token);
            setShowLogin(false)
        }
        else {
            alert(_response.data.message)
        }

    }



  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name ='name' onChange={_onChangeHandler} value={_data.name} type="text" placeholder='Your name' required />}
                <input name='email' onChange={_onChangeHandler} value={_data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={_onChangeHandler} value={_data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup