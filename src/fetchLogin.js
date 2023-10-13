const fetchLogin = async ({ queryKey }) => {
  const user = { email: queryKey[1].email, password: queryKey[1].password };
  console.log(user)
  if (user.email == "" || user.password == "") {
    return [];
  } else {
    const resApi =await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (resApi.ok) {
        const jsonData=await resApi.json();
      localStorage.setItem("token",JSON.stringify(jsonData) );
      return jsonData;
    } else if (resApi.status === 401) {
      // Xử lý phản hồi không hợp lệ
      throw new Error("Unauthorized");
    } else {
      // Xử lý các phản hồi lỗi khác
      throw new Error("Request failed with status: " + resApi.status);
    }
  }
};
export default fetchLogin;
