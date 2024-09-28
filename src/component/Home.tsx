import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

interface User {
  id: number;
  name: string;
  email: string;
  addresses?: Address[];
}

interface Address {
  city: string;
  state: string;
  country: string;
}

const Home: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/users");
      const data = await response.json();
      setUserList(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await UserService.deleteUser(id);
      setMsg("User deleted successfully");
      init();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
            <div className="card-header fs-3 text-center">User List</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.addresses && user.addresses.length > 0
                            ? user.addresses.map((address, idx) => (
                                <div key={idx}>
                                  {address.city}, {address.state}, {address.country}
                                </div>
                              ))
                            : "No addresses"}
                        </td>
                        <td>
                          <button
                            onClick={() => navigate("/addAddress/" + user.id)}
                            className="btn btn-sm btn-primary"
                          >
                            Add Address
                          </button>
                          <button
                            onClick={() => navigate("/updateUser/" + user.id)}
                            className="btn btn-sm btn-primary ms-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
