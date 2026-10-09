import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <>
      <header><h1>Header general</h1></header>
      <main><Outlet /></main>
      <footer><h1>Footer general</h1></footer>
    </>
  );
}