export const baseURL = "http://localhost:3006"; // your backend URL

export const endPoints = {
  user: {
    signup: "/create-user",
    login: "/login-user",
    verifyOTP: "/verify-otp",
    sendResetLink: "/reset-password-link",
    resetPassword: (id, token) => `/reset-password/${id}/${token}`,
    dashboard: "/user-dashboard",
    updatePassword: "/update-password",
    editUser: (id) => `/edit-user/${id}`,
    updateUser: (id) => `/update-user/${id}`,
  },
};
