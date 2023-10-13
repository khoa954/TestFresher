const FetchSingleUser = async ({ queryKey }) => {
  const user = queryKey[1];
  const header = new Headers();
  header.append("Authorized", `Bearer ${localStorage.getItem("token")}`);
  const resApi = await fetch(`https://reqres.in/api/users/${user}`, {
    headers: header,
  });
  if (!resApi.ok) {
    throw new Error("Update failed");
  }
  return await resApi.json();
};
export default FetchSingleUser;
