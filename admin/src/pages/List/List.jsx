import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

  const _url = "http://localhost:4000"
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const { data } = await axios.get('/api/food/list')
      if (data.success) {
        setList(data.data)
      } else {
        toast.error('Error fetching list')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error')
    }
  }

  const removeFood = async(foodId) => {
    const _response = await axios.post('/api/food/remove', { id: foodId })
    await fetchList();
    if (_response.data.success) {
      toast.success(_response.data.message)
    }
    else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, i) => (
          <div key={i} className='list-table-format'>
            <img src={`/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item.id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List