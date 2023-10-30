import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FetchSingleUser from "../Delete/fetchSingleUser";
import { FormEvent, useEffect, useState } from "react";
import ErrorBoundary from "../Error/ErrorBoundary";
import { IUser } from "../../Common/ApiResponseType";
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IUser>({
    id: 0,
    email: "",
    last_name: "",
    first_name: "",
    avatar: "",
  });
  console.log(`data: `, data);
  if (!id) {
    throw new Error("your id is undefined");
  }
  // if (!data) {
  //   throw new Error("Cannot find user with id: " + id);
  // }
  const result = useQuery(["user", id], FetchSingleUser);
  console.log(`result:`, result);
  useEffect(() => {
    if (result.isSuccess) {
      const obj: IUser = {
        id: result.data.data.id,
        email: result.data.data.email,
        first_name: result.data.data.first_name,
        last_name: result.data.data.last_name,
        avatar: result.data.data.avatar,
      };
      setData(obj);
    } else if (Number.parseInt(result.status) === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [result.isSuccess, result.data, result.status, navigate]);

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const obj: IUser = {
      id: Number.parseInt(id),
      email: formData.get("email")?.toString() ?? "",
      first_name: formData.get("first_name")?.toString() ?? "",
      last_name: formData.get("last_name")?.toString() ?? "",
      avatar: formData.get("avatar")?.toString() ?? "",
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

  const FetchUpdateUser = async (body: IUser) => {
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
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  return typeof data === "undefined" ? (
    <h1>Not Found</h1>
  ) : (
    <div className="search-params">
      <form onSubmit={HandleSubmit}>
        <label htmlFor="email">
      Email
          <input defaultValue={data.email ?? ""} name="email" id="email" />
        </label>
        <label htmlFor="first_name">
          First_Name
          <input
            defaultValue={data.first_name ?? ""}
            name="first_name"
            id="first_name"
          />
        </label>
        <label htmlFor="last_name">
          Last_Name
          <input
            defaultValue={data.last_name ?? ""}
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
function EditErrorBoundary() {
  return (
    <ErrorBoundary>
      <Edit />
    </ErrorBoundary>
  );
}
export default EditErrorBoundary;
