import React, {useEffect, useState} from 'react'
import { deleteProduct, listProducts } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'

const ListProductComponent = () => {

    const [product, setProducts] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();

    }, [])

    function getAllProducts(){
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewproduct(){
        navigator('/add-product')
    }

    function updateProduct(id){
        navigator(`/edit-product/${id}`)
    }

    function removeProduct(id){
        console.log(id);
        deleteProduct(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        })
    }
    
  return (
    <div className='container mt-4'>
        <h2 className='text-center'><u>List of Products</u></h2>
        <button className='btn btn-primary mb-2' onClick = {addNewproduct}>Add Product</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>

                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Unit</th>
                    <th>Product Price</th>
                    <th>Product Supplier</th>
                    <th>Product Category</th> 
                    <th>Actions</th>
                
                </tr>
            </thead>
            <tbody>


                {
                    product.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.price}</td>
                            <td>{product.supplier}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateProduct(product.id)}>Edit Item</button><br></br>
                                <button className='btn btn-danger' onClick={() => removeProduct(product.id)}
                                    style={{marginTop: '4px'}}
                                >Remove</button>
                                
                            </td>

                        </tr>)
                }


                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListProductComponent