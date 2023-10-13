import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
const GenerateUserList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  return (
    <div className="search">
      {showModal ? (
        <Modal>
          <div>
            <h1>Warning</h1>
            <div>
              <h1>Would you like to Delete ?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    fetch(`https://reqres.in/api/users/${deleteId}`, {
                      method: "DELETE",
                    }).then((response) => {
                      console.log(response.status);
                      setShowModal(false);
                    });
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setDeleteId("");
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {!data ? (
        <h1>No user found</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                      setDeleteId(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
function GenerateUserListErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <GenerateUserList {...props} />
    </ErrorBoundary>
  );
}
export default GenerateUserListErrorBoundary;
