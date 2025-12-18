import { Outlet } from "react-router-dom";
import TopNavBar from "../navigation/TopNavBar";

export default function MainLayout() {
  return(
    <>
        <TopNavBar/>
        <main>
            <Outlet/>
        </main>
    </>
  );
}