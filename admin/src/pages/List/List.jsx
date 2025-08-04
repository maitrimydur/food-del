import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"

const List = () => {

  const url = "http://localhost:4000"
  const [_list,_setList] = useState([]);

  const _fetchList = async () => {
    const _response = await axios.get(`${url}/api/food/list`)
    console.log(_response.data);
    
    if (_response.data.success) {
      _setList(_response.data.data)
    }
    else 
    {
      toast.error("Error")
    }
  }
  useEffect(()=>{
    _fetchList();
  }, [])

  return (
    <div className = 'list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title" >
            <b>Image</b>
            <b>Name</b>
            <b>Cateogry</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {_list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                  <img src={`${url}/images/` +item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p>X</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default List