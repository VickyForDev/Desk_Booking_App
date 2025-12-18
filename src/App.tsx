import { Routes, Route } from "react-router"
import MainLayout from "./components/shared/MainLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import { PATHS } from "./pages/routes/paths"

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path={PATHS.HOME} element={<HomePage/>}/>
        <Route path={PATHS.PROFILE} element={<ProfilePage/>}/>
      </Route>
    </Routes>
  )
}