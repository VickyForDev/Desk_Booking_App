import { Outlet } from "react-router-dom";
import TopNavBar from "../navigation/TopNavBar";

export default function MainLayout() {
  return(
    <>
        <TopNavBar/>
        <main className="p-5 max-w-300 mx-auto">
            <Outlet/>
        </main>
    </>
  );
}