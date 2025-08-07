import axios from "axios";
import { createContext, _useEffect, useState, useEffect } from "react";
 
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const _url = "http://localhost:4000"
    const [_token,_setToken] = useState("");
    const [food_list,_setFoodList] = useState([])

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const _fetchFoodList = async () => {
        const _response = await axios.get(_url+"/api/food/list");
        _setFoodList(_response.data.data)
    }

    useEffect(()=>{
        async function _loadData() {
            await _fetchFoodList();
            if (localStorage.getItem("token")) {
                _setToken(localStorage.getItem("token"));
            }
        }
        _loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        _url,
        _token,
        _setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;