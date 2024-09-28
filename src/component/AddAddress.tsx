import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';

interface Address {
  city: string;
  state: string;
  country: string;
  user: {
    id: any;   // Ensure id is defined as string
  };
}

interface Errors {
  city?: string;
  state?: string;
  country?: string;
}

const AddAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [address, setAddress] = useState<Address>({
    city: '',
    state: '',
    country: '',
    user: { id: id}, // Ensure id is a string
  });
  const [msg, setMsg] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};

    if (!address.city) {
      newErrors.city = 'City is required';
    } else if (address.city.length < 3 || address.city.length > 50) {
      newErrors.city = 'City must be between 3 to 50 characters';
    } else if (/\d/.test(address.city)) {
      newErrors.city = 'City must contain only letters';
    }

    if (!address.state) {
      newErrors.state = 'State is required';
    } else if (address.state.length < 3 || address.state.length > 50) {
      newErrors.state = 'State must be between 3 to 50 characters';
    } else if (/\d/.test(address.state)) {
      newErrors.state = 'State must contain only letters';
    }

    if (!address.country) {
      newErrors.country = 'Country is required';
    } else if (address.country.length < 3 || address.country.length > 50) {
      newErrors.country = 'Country must be between 3 to 50 characters';
    } else if (/\d/.test(address.country)) {
      newErrors.country = 'Country must contain only letters';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      UserService.createAddress(address) // Ensure UserService expects Address type correctly
        .then(() => {
          setMsg('Address added successfully');
          navigate('/users');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container mb-3">
      <div className="card">
        <div className="card-header fs-3 text-center">Add Address</div>
        {msg && <p className="fs-4 text-center text-success">{msg}</p>}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cityField" className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                id="cityField"
                value={address.city}
                onChange={handleChange}
              />
              {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="stateField" className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                id="stateField"
                value={address.state}
                onChange={handleChange}
              />
              {errors.state && <span style={{ color: 'red' }}>{errors.state}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="countryField" className="form-label">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                id="countryField"
                value={address.country}
                onChange={handleChange}
              />
              {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
            </div>
            <button type="submit" className="btn btn-primary col-md-12">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
