import { Route, Routes } from "react-router"
import PublicLayout from "./layouts/PublicLayout"
import HomePage from "./pages/admin/HomePage"
import AdminLayout from "./layouts/AdminLayout"
import DashboardPage from "./pages/public/DashboardPage"

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
      
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<DashboardPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
