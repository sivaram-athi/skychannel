import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaChevronDown } from "react-icons/fa"
import { FaTh } from "react-icons/fa"
import ApartmentIcon from "@mui/icons-material/Apartment"
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import DescriptionIcon from "@mui/icons-material/Description"
// import LayersIcon from "@mui/icons-material/Layers"
import BarChartIcon from "@mui/icons-material/BarChart"
import Logo from "../images/icons/skyrooms-logo.png"
import LogoutIcon from '@mui/icons-material/Logout'
// import InventoryIcon from '@mui/icons-material/Inventory'
import WarehouseIcon from '@mui/icons-material/Warehouse'

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [setIsMobile] = useState(window.innerWidth <= 768)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  // const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setIsOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const menuItems = [
    // { path: "/", name: "Dashboard", icon: <FaTh /> },
    { path: "/", name: "Dashboard", icon: <FaTh /> },
    { path: "Propertymanagement", name: "Property Management", icon: <ApartmentIcon /> },
    {
      name: "Rate Management",
      icon: <CurrencyRupeeIcon />,
      children: [
        { path: "ratemanagement/smartview", name: "Grid view", icon: <DescriptionIcon /> },
        // { path: "/ratemanagement/channelwise-view", name: "Channel wise view", icon: <DescriptionIcon /> },
        { path: "Bulk_update/MultipleRate", name: "Multiple Rate", icon: <DescriptionIcon /> },
        { path: "ratemanagement/Calenderview", name: "Calender view", icon: <DescriptionIcon /> },
        
      ],
    },
    {
      name: "Inventory Management",
      icon: <WarehouseIcon />,
      children: [
        { path: "Inventorymanagement/smartview", name: "Grid view", icon: <DescriptionIcon /> },
        // { path: "/Inventorymanagement/channelwise-view", name: "Channel wise view", icon: <DescriptionIcon /> },
        // { path: "/Inventorymanagement/inv-Calenderview", name: "Calender view", icon: <DescriptionIcon /> },
        // { path: "/Inventorymanagement/stopsellchannel", name: "Stop Sell Channel view", icon: <DescriptionIcon /> },
        { path: "Bulk_update/Inventory", name: "Inventory", icon: <DescriptionIcon /> },
      ],
    },
    // {
    //   name: "Bulk Update",
    //   icon: <LayersIcon />,
    //   children: [
    //   ],
    // },
    {
      name: "Reports",
      icon: <BarChartIcon />,
      children: [
        { path: "reports/Bookings", name: "Bookings", icon: <DescriptionIcon /> },
        { path: "reports/ActivityReport", name: "Activity Report", icon: <DescriptionIcon /> },
      ],
    },
    { path: "/Logout", name: "Logout", icon: <LogoutIcon /> },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleSubmenuClick = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index)
  }

  return (
    <div className="layout">
      <div className="navbar">
        <div className="nav-left">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <a href="#"><img src={Logo || "/placeholder.svg"} alt="Logo" className="logo" /></a>
        </div>
      </div>

      <div className="container">
        <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
          <div className="menu-container">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item-container">
                {item.path ? (
                  <NavLink to={item.path} className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}>
                    <div className="icon">{item.icon}</div>
                    <span className="link-text">{item.name}</span>
                  </NavLink>
                ) : (
                  <div className="menu-item" onClick={() => handleSubmenuClick(index)}>
                    <div className="icon">{item.icon}</div>
                    <span className="link-text">{item.name}</span>
                    <FaChevronDown className={`submenu-arrow ${openSubmenu === index ? "rotate" : ""}`} />
                  </div>
                )}

                {item.children && openSubmenu === index && (
                  <div className="submenu">
                    {item.children.map((child, childIndex) => (
                      <NavLink
                        to={child.path}
                        key={childIndex}
                        className={({ isActive }) => (isActive ? "submenu-item active" : "submenu-item")}
                      >
                        <div className="icon">{child.icon}</div>
                        <span className="link-text">{child.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <main className={`main-content ${!isOpen ? "expanded" : ""}`}>{children}</main>
      </div>
    </div>
  )
}

export default Sidebar

