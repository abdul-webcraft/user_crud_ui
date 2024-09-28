import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import './App.css';
import Navbar from './component/Navbar';
import AddUser from './component/AddUser';
import AddProduct from './component/AddProduct';
import ProductComponent from './component/ProductComponent';
import Home from './component/Home';
import UpdateProduct from './component/UpdateProduct';
import Menus from './component/Menus';
import UpdateUser from './component/UpdateUser';
import AddAddress from './component/AddAddress';

const App: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Row>
        <Col md={3}>
          <Menus />
        </Col>
        <Col md={9}>
          <Routes>
            <Route path='/' element={<ProductComponent />} />
            <Route path='addProduct' element={<AddProduct />} />
            <Route path='updateProduct/:id' element={<UpdateProduct />} />
            <Route path='users' element={<Home />} />
            <Route path='addUser' element={<AddUser />} />
            <Route path='updateUser/:id' element={<UpdateUser />} />
            <Route path='addAddress/:id' element={<AddAddress />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

