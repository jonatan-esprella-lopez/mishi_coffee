import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import HomePage from "./pages/public/HomePage";
import UiPage from "./pages/dev/UiPage";
import MichisPage from "./pages/public/MichisPage";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="michis" element={<MichisPage/>} />
        <Route path="michis/:id" element={<PlaceholderPage title="Detalle del michi" />} />
        <Route path="michis/:id/adoptar" element={<PlaceholderPage title="Solicitud de adopción" />} />
        <Route path="solicitud/confirmacion" element={<PlaceholderPage title="Solicitud recibida" />} />
        <Route path="reservas" element={<PlaceholderPage title="Reservas" />} />
        <Route path="menu" element={<PlaceholderPage title="Menú" />} />
        {import.meta.env.DEV && <Route path="ui" element={<UiPage />} />}
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="adopcion" replace />} />
        <Route path="adopcion" element={<PlaceholderPage title="Solicitudes de adopción" />} />
        <Route path="michis" element={<PlaceholderPage title="Michis (admin)" />} />
        <Route path="michis/:id" element={<PlaceholderPage title="Expediente del michi" />} />
        <Route path="panel" element={<DashboardPage />} />
        <Route path="panel/finanzas" element={<PlaceholderPage title="Finanzas y caja" />} />
        <Route path="seguimiento" element={<PlaceholderPage title="Seguimiento post-adopción" />} />
      </Route>

      <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
    </Routes>
  );
}

export default App;