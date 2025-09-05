import {Route, Routes} from "react-router-dom"
import AppointmentsPage from "./pages/AppointmentsPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import AddPatientPage from "./pages/AddPatientPage"
import RolesAndAccessPage from "./pages/RolesAndAccessPage"
import PatientsPage from "./pages/PatientsPage"
import FormSettingsPage from "./pages/FormSettingsPage"
import MessagesPage from "./pages/MessagesPage"
import HomePage from "./components/HomePage"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/add-patient" element={<AddPatientPage />} />
        <Route path="/roles-and-access" element={<RolesAndAccessPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/form-settings" element={<FormSettingsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  )
}

export default AppRoutes