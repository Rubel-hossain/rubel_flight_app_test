import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Attempt to get saved dark mode from localStorage, default to false
  const savedDarkMode = localStorage.getItem('darkMode') === 'true'; // Ensure it's a boolean

  const [darkMode, setDarkMode] = useState(savedDarkMode);

  // Use useEffect to apply dark mode changes to the document body
  useEffect(() => {
    // Check for valid darkMode state
    if (darkMode) {
      document.body.classList.add('dark');  // Add dark class if true
    } else {
      document.body.classList.remove('dark');  // Remove dark class if false
    }

    // Persist the dark mode state to localStorage on change
    localStorage.setItem('darkMode', darkMode);

    // Cleanup effect if component unmounts
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]); // This effect will run every time darkMode changes

  // Toggle function to switch between light/dark modes
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle darkMode
  };

  return [darkMode, toggleDarkMode];  // Return both darkMode and the toggle function
};

export default useDarkMode;
