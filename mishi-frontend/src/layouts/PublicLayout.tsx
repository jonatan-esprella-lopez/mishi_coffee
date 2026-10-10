import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { publicNav } from "../config/navigation";

export default function PublicLayout() {
  return (
    <>
      <Header nav={publicNav} />
      <main className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8 md:pb-0">
        <Outlet />
      </main>
      <footer className="hidden md:block"><h1>Footer general</h1></footer>
      <BottomNav items={publicNav} />
    </>
  );
}