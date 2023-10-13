import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchApiListUser from "./fetchApiListUser";
import GenerateUserList from "./GenerateUserList";
import ErrorBoundary from "./ErrorBoundary";
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const response = useQuery(["listUser", token ? token : ""], fetchApiListUser);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState("");
  console.log(filter);
  useEffect(() => {
    const data = response?.data ?? [];
    if (data && filter) {
      const filtered = data.data.filter((item) => {
        if (
          item.email.toLowerCase().includes(filter) ||
          item.first_name.toLowerCase().includes(filter) ||
          item.last_name.toLowerCase().includes(filter) ||
          item.id.toString().includes(filter)
        ) {
          return item;
        }
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data.data);
    }
  }, [response?.data, filter]);

  useEffect(() => {
    if (!token || response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token, response.status, navigate]);
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <Link to={"/create"}>Create</Link>
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        type="text"
        name="filter"
        id="filter"
      />
      <div>
        <GenerateUserList data={filteredData} />
      </div>
    </div>
  );
};

function HomeErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Home {...props} />
    </ErrorBoundary>
  );
}
export default HomeErrorBoundary;
