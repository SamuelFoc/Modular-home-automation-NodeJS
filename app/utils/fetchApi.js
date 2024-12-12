const BASE_URL = "http://localhost:5000/api/system";

export const apiFetch = async (endpoint, options = {}) => {
  //   const token = localStorage.getItem("token"); // Get token from localStorage

  // Merge Authorization header with existing headers
  const headers = {
    "Content-Type": "application/json", // Default Content-Type
    // ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization if token exists
    ...options.headers, // Merge with headers provided in options
  };

  // Make the API request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers, // Use the merged headers
  });

  if (!response.ok) {
    // Handle non-200 responses
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse JSON response
  return response.json();
};
