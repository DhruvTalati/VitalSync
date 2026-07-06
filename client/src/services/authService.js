import api from "./api";

/**
 * Register User
 */
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return { data };
};

/**
 * Login User
 */
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return { data };
};

/**
 * Get Logged-in User Profile
 */
export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return { data };
};

/**
 * Update Profile
 */
export const updateProfile = async (profileData) => {
  const { data } = await api.put("/auth/profile", profileData);
  return { data };
};

/**
 * Change Password
 */
export const changePassword = async (passwordData) => {
  const { data } = await api.put("/auth/change-password", passwordData);
  return { data };
};

/**
 * Logout
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  delete api.defaults.headers.common["Authorization"];
};
