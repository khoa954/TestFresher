import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../Error/ErrorBoundary";
import { IUser } from "../../Common/ApiResponseType";
const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj: IUser = {
            email: formData.get("email")?.toString() ?? "",
            // password: formData.get("password")?.toString()??"",
            id: 0,
            last_name: formData.get("last_name")?.toString() ?? "",
            first_name: formData.get("first_name")?.toString() ?? "",
            avatar: formData.get("avatar")?.toString() ?? "",
          };
          fetch(`https://reqres.in/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          })
            .then((response) => {
              if (response.ok) {
                navigate("/");
              }
            })
            .catch((error) => {
              console.log(error);
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
          First_Name:
          <input name="first_name" type="text" id="first_name" />
        </label>
        <label htmlFor="last_name">
          Last_Name:
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
function CreateErrorBoundary() {
  return (
    <ErrorBoundary>
      <Create />
    </ErrorBoundary>
  );
}
export default CreateErrorBoundary;
