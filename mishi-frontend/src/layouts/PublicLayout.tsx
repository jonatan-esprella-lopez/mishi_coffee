import { Outlet } from "react-router";
import Header from "../components/layout/Header";

export default function PublicLayout() {
  return (
    <>
      <Header/>
      <main><Outlet /></main>
      <footer><h1>Footer general</h1></footer>
    </>
  );
}