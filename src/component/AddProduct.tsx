import React, { useState } from 'react';
import ProductService from '../services/ProductService';

interface Product {
  name: string;
  brand: string;
  price: string;
  quantity: string;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    price: "",
    quantity: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [msg, setMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const keyUpValidation = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!product.name) newErrors.name = 'Product Name is required';
    else if (product.name.length < 3 || product.name.length > 50) {
      newErrors.name = 'Product Name must be between 3 to 50 characters';
    }

    if (!product.brand) newErrors.brand = 'Brand is required';
    else if (product.brand.length < 3 || product.brand.length > 50) {
      newErrors.brand = 'Brand must be between 3 to 50 characters';
    } else if (RegExp(/[^a-zA-Z\s]/).test(product.brand)) {
      newErrors.brand = 'Brand must contain only letters';
    }

    if (!product.price) newErrors.price = 'Price is required';
    else if (parseInt(product.price, 10) < 1000 || parseInt(product.price, 10) > 100000) {
      newErrors.price = 'Price must be between 1000 to 100000';
    } else if (!RegExp(/^[0-9]+$/).test(product.price)) {
      newErrors.price = 'Price must contain only digits';
    }

    if (!product.quantity) newErrors.quantity = 'Quantity is required';
    else if (parseInt(product.quantity, 10) > 100) {
      newErrors.quantity = 'Quantity must be below 100';
    } else if (!RegExp(/^[0-9]+$/).test(product.quantity)) {
      newErrors.quantity = 'Quantity must contain only numbers';
    }

    return newErrors;
  };

  const ProductSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await ProductService.createProduct(product);
        console.log("Product Added Successfully", res);
        setMsg("Product Added Successfully");
        setProduct({ name: "", brand: "", price: "", quantity: "" });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='container mb-3'>
      <div className="card">
        <div className="card-header fs-3 text-center">
          Add Product
        </div>
        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
        <div className="card-body">
          <form onSubmit={ProductSave} onKeyUp={keyUpValidation}>
            <div className="mb-3">
              <label htmlFor="nameField" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="nameField"
                value={product.name}
                onChange={handleChange}
              />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="brandField" className="form-label">Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                id="brandField"
                value={product.brand}
                onChange={handleChange}
              />
              {errors.brand && <span style={{ color: 'red' }}>{errors.brand}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="priceField" className="form-label">Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                id="priceField"
                value={product.price}
                onChange={handleChange}
              />
              {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="quantityField" className="form-label">Quantity</label>
              <input
                type="text"
                name="quantity"
                className="form-control"
                id="quantityField"
                value={product.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity}</span>}
            </div>
            <button type="submit" className="btn btn-primary col-md-12">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
