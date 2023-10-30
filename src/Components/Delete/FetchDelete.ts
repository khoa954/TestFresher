import { QueryFunction } from "@tanstack/react-query";
const FetchDelete: QueryFunction<string, ["delete", number]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];
  const resApi = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  });
  if (!resApi) {
    throw new Error("Fait to delete");
  } else {
    return resApi.json();
  }
};
export default FetchDelete;
