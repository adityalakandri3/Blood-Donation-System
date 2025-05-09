export const baseURL = "http://localhost:3006"; 

export const endPoints = {
  user: {
    signup: "/create-user",
    login: "/login-user",
    verifyOTP: "/verify-otp",
    sendResetLink: "/reset-password-link",
    resetpass: (id, token) => `/reset-password/${id}/${token}`,
    dashboard: "/user-dashboard",
    updatePassword: "/update-password",
    editUser: (id) => `/edit-user/${id}`,
    updateUser: (id) => `/update-user/${id}`,
  },

  blood_requests: {
    create: "/create-blood-request",
    getAll: "/get-blood-request",
    getById: (id) => `/get-blood-request/${id}`,
    updateBlood: (id) => `/update-blood-request/${id}`,
    delete: (id) => `/delete-blood-request/${id}`,
  },
  camps: {
    create: "/admin/create-camp", 
    getAll: "/get-camp", 
    userRegistration:(id)=>`/camp-register/${id}`,
    myRegistrations:'/my-registrations',
    cancelRegistration:(id)=>`/my-registrations/cancel-registration/${id}`,
    getById: (id) => `/get-camp/${id}`, 
    update: (id) => `/admin/update-camp/${id}`, 
    delete: (id) => `/admin/delete-camp/${id}`, 
    getRegistrations: (id) => `/admin/get-registrations/${id}`, 
    getRegistrationsByUserAndCamp: (userId, campId) => `/admin/user-registration/${userId}/${campId}`,
    updateRegistrationStatus: (userId, campId) => `/admin/update-registration/${userId}/${campId}`,
  },
  donor:{
    getAllrequest :'/get-blood-request-donor',
    getAllRequestByID:(id)=>`/get-blood-request-donor/${id}`,
    acceptRequest:(id)=>`/accept-blood-request/${id}`
  }
};
