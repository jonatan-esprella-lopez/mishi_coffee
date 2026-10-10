import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { adminNav } from "../config/navigation";

export default function AdminLayout() {
  return (
    <>
      <Header nav={adminNav} />
      <main className="pb-24 md:pb-0"><Outlet /></main>
      <footer className="hidden md:block"><h1>Footer general</h1></footer>
      <BottomNav items={adminNav} />
    </>
  );
}