import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Menus = () => {
  return (
    <ListGroup>
      <ListGroupItem disabled tag="a" className="text-center fw-bold text-bg-light">
        Product
      </ListGroupItem>
      
      <Link to="/" className="list-group-item list-group-item-action">
        Products
      </Link>
      <Link to="/addProduct" className="list-group-item list-group-item-action">
        Add Product
      </Link>
      
      <ListGroupItem disabled tag="a" className="text-center fw-bold text-bg-light">
        User
      </ListGroupItem>
      
      <Link to="/users" className="list-group-item list-group-item-action">
        Users
      </Link>
      <Link to="/addUser" className="list-group-item list-group-item-action">
        Add User
      </Link>
    </ListGroup>
  );
};

export default Menus;
