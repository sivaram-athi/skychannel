import React from "react"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
// import Dashboard from "./pages/dashboard/Dashboard.js"
import Dashboard1 from "./pages/dashboard/Dashboard1.js"
import PropertyManagement from "./pages/property/Property.js"
// import Rate_manage from "./pages/RateManagement/Rate_manage.js"
import Smart_view from "./pages/RateManagement/Smart_view.js"
import Invenetory_manage from "./pages/inventory/Invenetory_manage.js"
import HotelRateManager from "./pages/Bulk_update/HotelRateManager.js"
import CalenderView from "./pages/Bulk_update/CalenderView.js"
import Bookings from "./pages/Reports/Bookings/Bookings.js"
import Activity_Report from "./pages/Reports/Activity_Report/Activity_Report.js";
import InventoryCalendar from "./pages/inventory/inventory-calendar.js";
import Smart_grid from "./pages/inventory/Smart_grid.js";
import MultiMonthCalendar from './pages/RateManagement/MultiMonthCalendar.js'
import Logout from './pages/Logout/Logout.js'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Dashboard1 />} />
          <Route path="dashboard" element={<Dashboard1 />} />
          {/* <Route path="/Dashboard1.js" element={<Dashboard1 />} /> */}
          <Route path="Propertymanagement" element={<PropertyManagement />} />
          {/* <Route path="/ratemanagement/Calenderview" element={<Rate_manage />} /> */}
          <Route path="ratemanagement/Calenderview" element={<MultiMonthCalendar />} />
          <Route path="ratemanagement/smartview" element={<Smart_view />} />
          <Route path="Inventorymanagement/inv-Calenderview" element={<Invenetory_manage />} />
          <Route path="Inventorymanagement/stopsellchannel" element={<InventoryCalendar />} />
          <Route path="Inventorymanagement/smartview" element={<Smart_grid />} />
          <Route path="Bulk_update/MultipleRate" element={<HotelRateManager />} />
          <Route path="Bulk_update/Inventory" element={<CalenderView />} />
          <Route path="reports/Bookings" element={<Bookings />} />
          <Route path="reports/ActivityReport" element={<Activity_Report />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="*" element={<Dashboard1 />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App

