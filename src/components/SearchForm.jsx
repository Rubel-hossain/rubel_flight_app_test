/* eslint-disable react/prop-types */
import { FaSearch, FaFilter } from "react-icons/fa";
import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";

export default function SearchForm({
  handleSearch,
  searchParams,
  handleInputChange,
  loading,
  locations,
  cabinClasses,
  filters = {
    priceRange: [0, 2000], // Default price range
    departureTime: "all",
    sortBy: "price",
  },
  handleFilterChange,
}) {
  const [darkMode] = useDarkMode();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <form
      onSubmit={handleSearch}
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-8 mb-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Departure
          </label>
          <div className="relative">
            <input
              type="text"
              name="departure"
              value={searchParams.departure}
              onChange={handleInputChange}
              list="locations"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
            <datalist id="locations">
              {locations.map((location) => (
                <option key={location} value={location} />
              ))}
            </datalist>
          </div>
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              name="destination"
              value={searchParams.destination}
              onChange={handleInputChange}
              list="locations"
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
              required
            />
          </div>
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Date
          </label>
          <input
            type="date"
            name="departureDate"
            value={searchParams.departureDate}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              darkMode ? "bg-gray-700 text-white" : ""
            }`}
            required
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            } mb-2`}
          >
            Cabin Class
          </label>
          <select
            name="cabinClass"
            value={searchParams.cabinClass}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              darkMode ? "bg-gray-700 text-white" : ""
            }`}
          >
            {cabinClasses.map((cabin) => (
              <option key={cabin.value} value={cabin.value}>
                {cabin.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center space-x-2 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          } hover:text-blue-600`}
        >
          <FaFilter />
          <span>Advanced Filters</span>
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
          disabled={loading}
        >
          <FaSearch />
          <span>{loading ? "Searching..." : "Search Flights"}</span>
        </button>
      </div>

      {showAdvancedFilters && (
        <div
          className={`mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 ${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          } rounded-md`}
        >
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Price Range
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="2000"
                value={filters.priceRange ? filters.priceRange[1] : 2000} 
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    0,
                    parseInt(e.target.value),
                  ])
                }
                className="w-full"
              />
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ${filters.priceRange[1]}
              </span>
            </div>
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Departure Time
            </label>
            <select
              value={filters.departureTime}
              onChange={(e) =>
                handleFilterChange("departureTime", e.target.value)
              }
              className={`w-full p-2 border rounded-md ${
                darkMode ? "bg-gray-600 text-white" : ""
              }`}
            >
              <option value="all">All Times</option>
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 6PM)</option>
              <option value="evening">Evening (6PM - 12AM)</option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } mb-2`}
            >
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className={`w-full p-2 border rounded-md ${
                darkMode ? "bg-gray-600 text-white" : ""
              }`}
            >
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="departure">Departure Time</option>
              <option value="arrival">Arrival Time</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
}
