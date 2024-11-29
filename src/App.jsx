import { useState } from "react";
import { FaMoon, FaSun, FaTh, FaList, FaThLarge } from "react-icons/fa"; // Import icons for the view mode buttons
import GridFlightCard from "./components/GridFlightCard";
import ListFlightCard from "./components/ListFlightCard";
import SearchForm from "./components/SearchForm";
import useViewMode from "./hooks/useViewMode";
import useDarkMode from "./hooks/useDarkMode"; // Import the custom useDarkMode hook

const App = () => {
  const { viewMode, setGridMode, setListMode } = useViewMode(); // Destructure correctly
  const [searchParams, setSearchParams] = useState({
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabinClass: "economy",
  });

  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    airlines: [],
    stops: "all",
    duration: "all",
    departureTime: "all",
    sortBy: "price",
  });

  // Use the custom hook here
  const [darkMode, toggleDarkMode] = useDarkMode();

  // Mock flight data
  const mockFlights = [
    {
      id: 1,
      airline: "Delta Airlines",
      departureTime: "08:00 AM",
      arrivalTime: "11:30 AM",
      duration: "3h 30m",
      price: 450,
      stops: 0,
      cabinClass: "economy",
      airlineLogo: "images.unsplash.com/photo-1436491865332-7a61a109cc05",
    },
    {
      id: 2,
      airline: "United Airlines",
      departureTime: "10:15 AM",
      arrivalTime: "02:45 PM",
      duration: "4h 30m",
      price: 380,
      stops: 1,
      cabinClass: "business",
      airlineLogo: "images.unsplash.com/photo-1556388158-158ea5ccacbd",
    },
  ];

  const locations = [
    "New York (JFK)",
    "Los Angeles (LAX)",
    "Chicago (ORD)",
    "San Francisco (SFO)",
    "Miami (MIA)",
    "London (LHR)",
    "Paris (CDG)",
    "Tokyo (HND)",
  ];

  const cabinClasses = [
    { value: "economy", label: "Economy" },
    { value: "premium", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const filteredFlights = mockFlights.filter((flight) => {
    if (flight.cabinClass !== searchParams.cabinClass) return false;
    if (
      flight.price < filters.priceRange[0] ||
      flight.price > filters.priceRange[1]
    )
      return false;
    if (filters.stops !== "all" && flight.stops !== parseInt(filters.stops))
      return false;
    return true;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-6`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Flight Search</h1>
          <div className="flex space-x-4">
            <button
              onClick={setGridMode}
              className={`p-2 ${
                viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <FaTh />
            </button>
            <button
              onClick={setListMode}
              className={`p-2 ${
                viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <FaList />
            </button>
            <button onClick={toggleDarkMode} className="p-2">
              {darkMode ? (
                <button className="sun-btn">
                  <FaSun />
                </button>
              ) : (
                <button className="moon-btn">
                  <FaMoon />
                </button>
              )}
            </button>
          </div>
        </div>
        <SearchForm
          searchParams={searchParams}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          locations={locations}
          cabinClasses={cabinClasses}
        />
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setGridMode()}
              className={`p-3 rounded-lg flex items-center space-x-2 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200"
              }`}
            >
              <FaThLarge />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setListMode()}
              className={`p-3 rounded-lg flex items-center space-x-2 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-200"
              }`}
            >
              <FaList />
              <span>List</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className={`p-2 border rounded-md ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
              value={filters.stops}
              onChange={(e) => handleFilterChange("stops", e.target.value)}
            >
              <option value="all">All Stops</option>
              <option value="0">Non-stop</option>
              <option value="1">1 Stop</option>
              <option value="2">2+ Stops</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredFlights.map((flight) =>
              viewMode === "grid" ? (
                <GridFlightCard
                  key={flight.id}
                  flight={flight}
                  searchParams={searchParams}
                />
              ) : (
                <ListFlightCard key={flight.id} flight={flight} />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
