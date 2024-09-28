import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

interface Product {
  name: string;
  brand: string;
  price: string;
  quantity: string;
}

interface Errors {
  name?: string;
  brand?: string;
  price?: string;
  quantity?: string;
}

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    name: "",
    brand: "",
    price: "",
    quantity: ""
  });

  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/product/${id}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    
    fetchProduct();
  }, [id]);

  const validate = (): Errors => {
    const newErrors: Errors = {};
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
    else if (Number(product.price) < 1000 || Number(product.price) > 100000) {
      newErrors.price = 'Price must be between 1000 to 100000';
    } else if (!RegExp(/^[0-9]+(\.[0-9]+)?$/).test(product.price)) {
      newErrors.price = 'Price must be a valid number';
    }

    if (!product.quantity) newErrors.quantity = 'Quantity is required';
    else if (Number(product.quantity) > 100) {
      newErrors.quantity = 'Quantity must be below 100';
    } else if (!RegExp(/^[0-9]+$/).test(product.quantity)) {
      newErrors.quantity = 'Quantity must contain only numbers';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res=await ProductService.updateProduct(product);
        setMsg("Product updated successfully");
        navigate("/");
      } catch (error) {
        console.error("Failed to update product:", error);
        setMsg("Failed to update product.");
      }
    }
  };

  return (
    <div className='container mb-3'>
      <div className="card">
        <div className="card-header fs-3 text-center">Update Product</div>
        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary col-md-12">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
