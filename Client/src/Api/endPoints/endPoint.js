export const baseURL = "http://localhost:3006"; 

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

  blood_requests: {
    create: "/create-blood-request",
    getAll: "/get-blood-request",
    getById: (id) => `/get-blood-request/${id}`,
    update: (id) => `/update-blood-request/${id}`,
    delete: (id) => `/delete-blood-request/${id}`,
  },
  camps: {
    create: "/admin/create-camp", // for creating a camp
    getAll: "/get-camp", // for getting all camps
    getById: (id) => `/get-camp/${id}`, // for getting a specific camp by ID
    update: (id) => `/admin/update-camp/${id}`, // for updating a camp by ID
    delete: (id) => `/admin/delete-camp/${id}`, // for deleting a camp by ID
    getRegistrations: (id) => `/admin/get-registrations/${id}`, // for getting camp registrations by camp ID
    getRegistrationsByUserAndCamp: (userId, campId) => `/admin/user-registration/${userId}/${campId}`, // for getting registrations by user and camp IDs
    updateRegistrationStatus: (userId, campId) => `/admin/update-registration/${userId}/${campId}`, // for updating registration status
  },
};
