import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchApiListUser from "./fetchApiListUser";
import GenerateUserList from "./GenerateUserList";
import ErrorBoundary from "../Error/ErrorBoundary";
import { IUser, UserListApiResponse } from "../../Common/ApiResponseType";
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const response = useQuery(["listUser", token ? token : ""], fetchApiListUser);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<
    UserListApiResponse | never[]
  >();
  useEffect(() => {
    const data = response?.data ?? [];
    if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      filter.length !== 0
    ) {
      const filtered = data.data.filter((item: IUser) => {
        if (
          item.email.toLowerCase().includes(filter) ||
          item.first_name.toLowerCase().includes(filter) ||
          item.last_name.toLowerCase().includes(filter) ||
          item.id.toString().includes(filter)
        ) {
          return item;
        }
      });
      const wrappedData = {
        data: filtered,
      } as UserListApiResponse;
      setFilteredData(wrappedData);
    } else if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      filter.length === 0
    ) {
      setFilteredData(data);
    } else {
      setFilteredData([]);
    }
  }, [response?.data, filter]);
  useEffect(() => {
    if (!token || response.status === "error") {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token, response.status, navigate]);
  return (
    <div>
      <div className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link type="button" to={"/create"} >Create</Link>
          </li>
          <li className="nav-item">
            <button
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="container">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          name="filter"
          id="filter"
          placeholder="Filter"
        />
        <GenerateUserList data={filteredData} />
      </div>
    </div>
  );
};

function HomeErrorBoundary() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}
export default HomeErrorBoundary;
