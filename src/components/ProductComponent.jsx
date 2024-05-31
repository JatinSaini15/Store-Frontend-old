import React, { useEffect, useState } from 'react'
import { createProduct, getProduct, updateProduct } from '../services/ProductService'
import { useNavigate, useParams } from 'react-router-dom'

const ProductComponent = () => {
  
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState('')
  const [supplier, setSupplier] = useState('')
  const [category, setCategory] = useState('')

  const {id} = useParams();

  const [errors, setErrors] = useState({

    productName:'',
    quantity:'',
    unit:'',
    price:'',
    supplier:'',
    category:''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if(id){
      getProduct(id).then((response) => {


        setProductName(response.data.productName);
        setQuantity(response.data.quantity);
        setUnit(response.data.unit);
        setPrice(response.data.price);
        setSupplier(response.data.supplier);
        setCategory(response.data.category);



      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateProduct(e){
    e.preventDefault();

    if(validateForm()){

      const product = {productName, quantity, unit, price, supplier, category}
      console.log(product)

      if(id){
        updateProduct(id, product).then((response) => {
          console.log(response.data);
          navigator('/products');
        }).catch(error => {
          console.error(error);
        })
      }
      else{
        createProduct(product).then((response) => {
          console.log(response.data);
          navigator('/products')
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function validateForm(){
    let valid = true;
    const errorsCopy = {... errors}


    if(productName.trim()){
      errorsCopy.productName = '';
    }
    else{
      errorsCopy.productName = 'Product Name is required...';
      valid = false;
    }

    if(unit.trim()){
      errorsCopy.unit = '';
    }
    else{
      errorsCopy.unit = 'Unit is required...';
      valid = false;
    }

    if(supplier.trim()){
      errorsCopy.supplier = '';
    }
    else{
      errorsCopy.supplier = 'Supplier is required...';
      valid = false;
    }

    if(category.trim()){
      errorsCopy.category = '';
    }
    else{
      errorsCopy.category = 'Category is required...';
      valid = false;
    }


    setErrors(errorsCopy);
    return valid;

  }

  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Update Product</h2>
    }
    else{
      return <h2 className='text-center'>Add Product</h2>
    }
  }

  return (
    <div className='container '>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Product Name</label>
                <input
                  type='text'
                  placeholder='Enter product name'
                  name='productName'
                  value={productName}
                  className={`form-control ${errors.productName ? 'is-invalid': ' '}`}
                  onChange={(e) => setProductName(e.target.value)}
                >
                </input>
                {errors.productName && <div className='invalid-feedback'>{errors.productName}</div>}
              </div>


              <div className='form-group mb-2'>
                <label className='form-label'>Product Quantity</label>
                <input
                  type='number'
                  placeholder='Enter quantity'
                  name='quantity'
                  value={quantity}
                  className={`form-control ${errors.quantity ? 'is-invalid': ' '}`}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                </input>
                {errors.quantity && <div className='invalid-feedback'>{errors.quantity}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Product Unit</label>
                <input
                  type='text'
                  placeholder='Enter Unit'
                  name='unit'
                  value={unit}
                  className={`form-control ${errors.unit ? 'is-invalid': ' '}`}
                  onChange={(e) => setUnit(e.target.value)}
                >
                </input>
                {errors.unit && <div className='invalid-feedback'>{errors.unit}</div>}
              </div>


              <div className='form-group mb-2'>
                <label className='form-label'>Price</label>
                <input
                  type='number'
                  placeholder='Enter product price'
                  name='price'
                  value={price}
                  className={`form-control ${errors.price ? 'is-invalid': ' '}`}
                  onChange={(e) => setPrice(e.target.value)}
                >
                </input>
                {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
              </div> 
              
              <div className='form-group mb-2'>
                <label className='form-label'>Product Supplier</label>
                <input
                  type='text'
                  placeholder='Enter Supplier name'
                  name='supplier'
                  value={supplier}
                  className={`form-control ${errors.supplier ? 'is-invalid': ' '}`}
                  onChange={(e) => setSupplier(e.target.value)}
                >
                </input>
                {errors.supplier && <div className='invalid-feedback'>{errors.supplier}</div>}
              </div>
              
              <div className='form-group mb-2'>
                <label className='form-label'>Product Category</label>
                <input
                  type='text'
                  placeholder='Enter Category'
                  name='category'
                  value={category}
                  className={`form-control ${errors.category ? 'is-invalid': ' '}`}
                  onChange={(e) => setCategory(e.target.value)}
                >
                </input>
                {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
              </div>
            

              <button className='btn btn-success' onClick={saveOrUpdateProduct}>Submit</button>

            </form>

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default ProductComponent