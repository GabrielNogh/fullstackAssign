import React from "react";
import MaterialTable from "material-table";

const UsersTable = ({ usersData, deleteUser }) => {
  return (
    <MaterialTable
      title='Client'
      columns={[
        { title: "First Name", field: "firstname" },
        { title: "Last Name", field: "lastname" },
        { title: "Identification Number", field: "identificationNumber" },
        { title: "IP", field: "ip" },
        { title: "Phone", field: "phone" },
        { title: "Country", field: "country" },
        { title: "City", field: "city" },
      ]}
      data={usersData}
      actions={[
        {
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) => {
            deleteUser(rowData.identificationNumber);
          },
        },
      ]}
    />
  );
};

export default UsersTable;
