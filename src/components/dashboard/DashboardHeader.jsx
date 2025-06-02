import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";

function DashboardHeader({
  title,
  activeTabLabel,
  searchQuery,
  setSearchQuery,
  currentUser,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Main Header with Logo */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <img
                  src={logo}
                  alt="Gender HealthCare Logo"
                  className="h-10 w-auto mr-3"
                />
              </Link>
              <h1 className="text-xl font-bold text-gray-900 ml-2 border-l-2 border-indigo-500 pl-4">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium text-gray-800 ml-4 lg:ml-0">
              {activeTabLabel || "Bảng điều khiển"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 px-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="relative">
              <button
                className="relative p-1 text-gray-500 hover:text-gray-600 focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>

            <div className="border-l h-6 mx-2 border-gray-200"></div>

            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                aria-label="User profile"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  {currentUser?.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-medium">
                      {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  activeTabLabel: PropTypes.string,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  currentUser: PropTypes.object,
  setSidebarOpen: PropTypes.func,
};

DashboardHeader.defaultProps = {
  activeTabLabel: "Bảng điều khiển",
  searchQuery: "",
};

export default DashboardHeader;
