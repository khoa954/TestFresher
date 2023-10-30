import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../Common/Modal";
// import ErrorBoundary from "./ErrorBoundary";
import { UserListApiResponse } from "../../Common/ApiResponseType";
const GenerateUserList = ({
  data,
}: {
  data: UserListApiResponse | undefined | never[];
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  function isNeverArray(
    data: UserListApiResponse | undefined | never[]
  ): data is never[] {
    return data instanceof Array && data.length === 0;
  }
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
                    })
                      .then((response) => {
                        if (response.ok) {
                          setDeleteId(0);
                          setShowModal(false);
                          alert("Delete success");
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setDeleteId(0);
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
      {typeof data === "undefined" || isNeverArray(data) ? (
        <h1>No user found</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Link 
                  type="button"
                  to={`/edit/${user.id}`}>Edit</Link>
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
export default GenerateUserList;
// function GenerateUserListErrorBoundary(props:UserListApiResponse) {
//   return (
//     <ErrorBoundary>
//       <GenerateUserList data={props} />
//     </ErrorBoundary>
//   );
// }
// export default GenerateUserListErrorBoundary;
