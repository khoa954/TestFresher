import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            email: formData.get("email"),
            password: formData.get("password"),
            last_name: formData.get("last_name"),
            first_name: formData.get("first_name"),
            avatar: formData.get("avatar"),
          };
          fetch(`https://reqres.in/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }).then((response) => {
            console.log(response);
            if (response.status === 201) {
              navigate("/");
            } else {
              alert("create fail");
            }
          });
        }}
      >
        <label htmlFor="email">
          Username:
          <input name="email" type="text" id="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input name="password" type="text" id="password" />
        </label>
        <label htmlFor="first_name">
          First Name:
          <input name="first_name" type="text" id="first_name" />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input name="last_name" type="text" id="last_name" />
        </label>
        <label htmlFor="avatar">
          Avatar:
          <input name="avatar" type="file" id="avatar" />
        </label>
        <button>Create</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
function CreateErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Create {...props} />
    </ErrorBoundary>
  );
}
export default CreateErrorBoundary;
