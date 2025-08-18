import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

    const {getTotalCartAmount,_token,_food_list,_cartItems,_url} = useContext(StoreContext)

    const [_data,_setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    
    const _onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        _setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        _food_list.map((item)=>{
            if (_cartItems[item._id]>0) {
                let itemInfo = item;
                itemInfo["quantity"] = _cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address:_data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        let response = await axios.post(_url+"/api/order/place",orderData,{headers:{_token}});
        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error");
        }
    }

  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-field">
                <input required name='firstName' onChange={_onChangeHandler} value={_data.firstName} type="text" placeholder='First name' />
                <input required name='lastName' onChange={_onChangeHandler} value={_data.lastName} type="text" placeholder='Last name' />
            </div>
            <input required name='email' onChange={_onChangeHandler} value ={_data.email} type="email" placeholder='Email address' />
            <input required name='street' onChange={_onChangeHandler} value ={_data.street} type="text" placeholder='Street' />
            <div className="multi-field">
                <input required name='city' onChange={_onChangeHandler} value ={_data.city} type="text" placeholder='City' />
                <input required name='state' onChange={_onChangeHandler} value ={_data.state} type="text" placeholder='State' />
            </div>
            <div className="multi-field">
                <input required name='zipcode' onChange={_onChangeHandler} value ={_data.zipcode} type="text" placeholder='Zip code' />
                <input required name='country' onChange={_onChangeHandler} value ={_data.country} type="text" placeholder='Country' />
            </div>
            <input required name='phone' onChange={_onChangeHandler} value ={_data.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                    <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
        </div>
    </form>
  )
}

export default PlaceOrder