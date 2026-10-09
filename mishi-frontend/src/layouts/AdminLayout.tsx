import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <header><h1>Header admin</h1></header>
      <main><Outlet /></main>
      <footer><h1>Footer admin</h1></footer>
    </>
  );
}