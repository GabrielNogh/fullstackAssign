import React, { useEffect, useState } from "react";
import axios from "axios";

const Landing = () => {
  const [usersArray, setusersArray] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [presentArray, setPresentArray] = useState([]);

  const [userCreator, setUserCreator] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    ip: "",
    identificationNumber: "",
  });

  const filter = (e) => {
    if (query === "") {
      setPresentArray(usersArray);
    } else {
      const filterArray = presentArray.filter((element) => {
        return (
          element.firstname.includes(query) ||
          element.lastname.includes(query) ||
          element.phone.includes(query) ||
          element.ip.includes(query)
        );
      });
      setPresentArray(filterArray);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserCreator({
      ...userCreator,
      [name]: value,
    });
    console.log(userCreator);
  };
  const gimmeData = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setusersArray(res.data);
    setPresentArray(res.data);
  };
  const deleteUser = async (id) => {
    const himOut = await axios.delete(`http://localhost:5000/api/users/${id}`);
    console.log(himOut);
  };

  const createUser = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/users/`,
      userCreator
    );
    console.log(response.data);
  };
  useEffect(() => {
    console.log(presentArray);
    console.log(usersArray);
    filter();
  }, [query]);
  useEffect(() => {
    // use when needed for a lifecycle to take place

    gimmeData();
  }, []);
  return (
    // html
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          {isOpen ? (
            <>
              <div>
                <input
                  name='firstname'
                  placeholder='user firstname'
                  value={userCreator.firstname}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <input
                  name='lastname'
                  placeholder='user lastname'
                  value={userCreator.lastname}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <input
                  name='phone'
                  placeholder='user phone'
                  value={userCreator.phone}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <input
                  name='ip'
                  placeholder='user ip'
                  value={userCreator.ip}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <input
                  name='identificationNumber'
                  placeholder='user ID(israel)'
                  value={userCreator.identificationNumber}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  createUser();
                }}
              >
                Submit new User
              </button>
            </>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Create user
          </button>
          <p className='lead'>
            <input
              type='text'
              placeholder='search'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />

            {presentArray.length > 0 ? (
              <>
                {presentArray.map((element, index) => {
                  return (
                    <>
                      <br />
                      <div key={index}>
                        {element.firstname},{element.lastname},{element.ip},
                        {element.phone},{element.identificationNumber}
                        <button
                          className='buttons'
                          onClick={() => {
                            deleteUser(element.identificationNumber);
                          }}
                        >
                          delete
                        </button>
                        <br />
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </p>
        </div>
        <h1 className='x-large'>May the search be with you...</h1>
      </div>
    </section>
  );
};

export default Landing;
