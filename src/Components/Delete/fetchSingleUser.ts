import { QueryFunction } from "@tanstack/react-query";
import { SingleUserResponse } from "../../Common/ApiResponseType";
const FetchSingleUser: QueryFunction<
  SingleUserResponse,
  ["user", string]
> = async ({ queryKey }) => {
  const user = +queryKey[1];
  const header = new Headers();
  header.append("Authorized", `Bearer ${localStorage.getItem("token") ?? ""}`);
  const resApi = await fetch(`https://reqres.in/api/users/${user}`, {
    headers: header,
  });
  if (!resApi.ok) {
    throw new Error("Update failed");
  }
  const result = resApi.json();
  return result;
};
export default FetchSingleUser;
