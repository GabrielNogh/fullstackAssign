import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import CreateUserContainer from "./CreateUserContainer";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [refresh, setRefresh] = useState("");

  const [userCreator, setUserCreator] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    ip: "",
    identificationNumber: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserCreator({
      ...userCreator,
      [name]: value,
    });
  };

  const loadUsersData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsersData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      axios.delete(`http://localhost:5000/api/users/${id}`);
      setRefresh("deletedUser");
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async () => {
    try {
      axios.post(`http://localhost:5000/api/users/`, userCreator).then(() => {
        setRefresh("createdUser");
      });
      setIsOpen(!isOpen);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // use when needed for a lifecycle to take place
    loadUsersData();
  }, [refresh]);
  return (
    // html
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <CreateUserContainer
            createUser={createUser}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            userCreator={userCreator}
            handleChange={handleChange}
          />

          <UsersTable usersData={usersData} deleteUser={deleteUser} />
        </div>
      </div>
    </section>
  );
};

export default Landing;
