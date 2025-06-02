import React from "react";

const TabNavigator = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "calendar", label: "Calendar View" },
    { id: "prediction", label: "Ovulation Prediction" },
    { id: "history", label: "Cycle History" },
    { id: "symptoms", label: "Symptoms Tracker" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="bg-indigo-50 px-4">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-5 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigator;
