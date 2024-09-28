import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';

interface User {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/user/${id}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    
    fetchUser();
  }, [id]);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!user.name) newErrors.name = 'User Name is required';
    else if (user.name.length < 3 || user.name.length > 50) {
      newErrors.name = 'User Name must be between 3 to 50 characters';
    } else if (RegExp(/[^a-zA-Z\s]/).test(user.name)) {
      newErrors.name = 'Name must contain only letters';
    }

    if (!user.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!user.password) {
      newErrors.password = 'Password is required';
    } else if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await UserService.updateUser(user);
        console.log("Product Added Successfully", res);
        setMsg("User updated successfully");
        navigate("/users");
      } catch (error) {
        console.error("Failed to update user:", error);
        setMsg("Failed to update user.");
      }
    }
  };

  return (
    <div className="container mb-3">
      <div className="card">
        <div className="card-header fs-3 text-center">Edit User</div>
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
                value={user.name}
                onChange={handleChange}
              />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="emailField" className="form-label">Email</label>
              <input
                disabled
                type="email"
                name="email"
                className="form-control"
                id="emailField"
                value={user.email}
                onChange={handleChange}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="passwordField" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="passwordField"
                value={user.password}
                onChange={handleChange}
              />
              {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-primary col-md-12">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;