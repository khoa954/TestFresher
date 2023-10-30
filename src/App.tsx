import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Edit from "./Components/Edit/Edit";
import Create from "./Components/Create/Create";
import Login from "./Components/Login/Login";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/"></Link>
        </header>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("there are no container");
}
const root = createRoot(container);
root.render(<App />);
