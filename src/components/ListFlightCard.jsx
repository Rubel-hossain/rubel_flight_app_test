/* eslint-disable react/prop-types */
import { FaPlane } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";

export const ListFlightCard = ({ flight, searchParams={} }) => {
  const [darkMode] = useDarkMode();
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex justify-between items-center`}
    >
      <div className="flex items-center space-x-6">
        <img
          src={`https://${flight.airlineLogo}`}
          alt={flight.airline}
          className="w-16 h-16 object-contain rounded-full"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957";
          }}
        />
        <div>
          <h3 className="font-bold text-lg">{flight.airline}</h3>
          <span
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {flight.cabinClass}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-12">
        <div className="text-center">
          <p className="text-xl font-semibold">{flight.departureTime}</p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {searchParams.departure}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 border-t-2 border-gray-300 relative">
            <FaPlane
              className={`${
                darkMode ? "text-gray-300" : "text-gray-400"
              } absolute -top-3 left-1/2 transform -translate-x-1/2`}
            />
          </div>
          <p className="text-sm mt-2">{flight.duration}</p>
          <p className="text-sm text-gray-500">{flight.stops} stop(s)</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{flight.arrivalTime}</p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {searchParams.destination}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">
            ${flight.price}
          </span>
          <p className="text-sm text-gray-500">per person</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Select
        </button>
      </div>
    </div>
  );
};

export default ListFlightCard;
