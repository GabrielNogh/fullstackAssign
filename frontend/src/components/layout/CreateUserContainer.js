import React from "react";
// TODO: Design component better
const CreateUserContainer = ({
  setIsOpen,
  isOpen,
  userCreator,
  handleChange,
  createUser,
}) => {
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Create user
      </button>
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
    </div>
  );
};

export default CreateUserContainer;
