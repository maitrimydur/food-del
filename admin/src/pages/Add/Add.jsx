import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [_image,_setImage] = useState(false);
    const [_data,_setData] = useState({
        name:"",
        description:"",
        price:"",
        category: "Salad"
    })

    const _onChangeHandler = (event) => {
        const _name = event.target.name;
        const _value = event.target.value;
        _setData(data=>({...data,[_name]:_value}))
    }

    const _onSubmitHandler = async (event) => {
      event.preventDefault();
      const _formData = new FormData();
      _formData.append("name", _data.name)
      _formData.append("description", _data.description)
      _formData.append("price", Number(_data.price))
      _formData.append("category", _data.category)
      _formData.append("image", _image)
      const _response = await axios.post(`${url}/api/food/add`, _formData)
      if (_response.data.success) {
          _setData({
            name:"",
            description:"",
            price:"",
            category: "Salad"
          }) 
          _setImage(false)
          toast.success(_response.data.message)
      }
      else {
        toast.error(_response.data.message)
      }
    }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={_onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={_image?URL.createObjectURL(_image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>_setImage(e.target.files[0])}type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={_onChangeHandler} _value={_data.name}  type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={_onChangeHandler} value={_data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={_onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={_onChangeHandler} value={_data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add