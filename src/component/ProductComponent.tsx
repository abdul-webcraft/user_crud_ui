import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProductService from "../services/ProductService";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

const ProductComponent: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setLoading(true);
    fetch("http://localhost:8085/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMsg("Failed to load products.");
        setLoading(false);
      });
  };

  const deleteProduct = (id: number) => {
    ProductService.deleteProduct(id)
      .then(() => {
        setMsg("Product deleted successfully");
        init();
      })
      .catch((error) => {
        console.error(error);
        setMsg("Failed to delete product.");
      });
  };

  return (
    <div className="container mb-3">
      <div className="card">
        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
        <div className="card-header fs-3 text-center">Product List</div>
        <div className="card-body">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr.No.</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(({ id, name, brand, price, quantity }, index) => (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{brand}</td>
                      <td>{price}</td>
                      <td>{quantity}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/updateProduct/${id}`)}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(id)}
                          className="btn btn-sm btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
