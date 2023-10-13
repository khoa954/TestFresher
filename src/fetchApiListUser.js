const fetchApiListUser = async ({ queryKey }) => {
  const token = queryKey[1];
  if (!token) {
    console.log("unauthorized");
    return [];
  } else {
    const apiRes = await fetch(`https://reqres.in/api/users?page=2`);
    const data = apiRes.json();
    return data;
  }
};
export default fetchApiListUser;
