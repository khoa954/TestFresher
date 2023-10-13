import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FetchSingleUser from "./fetchSingleUser";
import { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
const Edit = () => {
  const { id } = useParams();
  let [data, setData] = useState({
    id: id,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const result = useQuery(["singleUser", id], FetchSingleUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (result.isSuccess) {
      const obj = {
        email: result.data.data.email,
        first_name: result.data.data.first_name,
        last_name: result.data.data.last_name,
        avatar: result.data.data.avatar,
      };
      setData(obj);
    } else if (result.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [result.isSuccess, result.data, result.status, navigate]);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      id: id,
      email: formData.get("email") ?? data.email,
      first_name: formData.get("first_name") ?? data.data.first_name,
      last_name: formData.get("last_name") ?? data.last_name,
      avatar: formData.get("avatar") ?? data.avatar,
    };
    FetchUpdateUser(obj)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async function FetchUpdateUser(body) {
    try {
      const response = await fetch(`https://reqres.in/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  return (
    <div className="details">
      <form onSubmit={HandleSubmit}>
        <label htmlFor="email">
          <input defaultValue={data.email} name="email" id="email" />
        </label>
        <label htmlFor="first_name">
          <input
            defaultValue={data.first_name}
            name="first_name"
            id="first_name"
          />
        </label>
        <label htmlFor="last_name">
          <input
            defaultValue={data.last_name}
            name="last_name"
            id="last_name"
          />
        </label>
        <label htmlFor="avatar">
          <img
            src={data.avatar ?? `http://pets-images.dev-apis.com/pets/none.jpg`}
            alt="avatar"
          />
          <input type="file" name="avatar" id="avatar" />
        </label>
        <button>Update</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
function EditErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Edit {...props} />
    </ErrorBoundary>
  );
}
export default EditErrorBoundary;
