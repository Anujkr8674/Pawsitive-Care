// API Configuration
// This file centralizes all API endpoints
// Production mein REACT_APP_API_URL environment variable se automatically set ho jayega

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  USER_LOGIN: `${API_BASE_URL}/api/user/login`,
  USER_REGISTER: `${API_BASE_URL}/api/user/register`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_REGISTER: `${API_BASE_URL}/api/admin/register-admin`,
  
  // User endpoints
  GET_USER: (userId) => `${API_BASE_URL}/api/users/${userId}`,
  GET_ADMIN: (adminId) => `${API_BASE_URL}/api/admin/${adminId}`,
  
  // Cart endpoints
  CART: (userId) => `${API_BASE_URL}/api/cart/${userId}`,
  UPDATE_CART_ITEM: (userId) => `${API_BASE_URL}/api/cart/${userId}/update-item`,
  REMOVE_CART_ITEM: (userId) => `${API_BASE_URL}/api/cart/${userId}/remove-item`,
  UPDATE_CART_ITEM_WITH_SUBTOTAL: (userId) => `${API_BASE_URL}/api/cart/${userId}/update-item-with-subtotal`,
  
  // Admin endpoints
  ADMIN_BASE: `${API_BASE_URL}/api/admin`,
  ADMIN_REGS: `${API_BASE_URL}/api/admin/adminregs`,
  ADMIN_APPOINTMENTS: `${API_BASE_URL}/api/admin/appointments/all`,
  ADMIN_CONTACTS: `${API_BASE_URL}/api/admin/contacts`,
  ADMIN_DONATIONS: `${API_BASE_URL}/api/admin/donations`,
  ADMIN_PET_ADOPTIONS: `${API_BASE_URL}/api/admin/petadoptions`,
  ADMIN_REGISTRATIONS: `${API_BASE_URL}/api/admin/registrations`,
  ADMIN_VOLUNTEERS: `${API_BASE_URL}/api/admin/volunteers`,
  ADMIN_USER_REGS: `${API_BASE_URL}/api/admin/userregs`,
  ADMIN_SUBSCRIPTIONS: `${API_BASE_URL}/api/admin/subscriptions`,
  ADMIN_REVIEWS: `${API_BASE_URL}/api/admin/reviews`,
  ADMIN_ORDERS: `${API_BASE_URL}/api/admin/orders`,
  ADMIN_STATUS_UPDATE: (type, id) => `${API_BASE_URL}/api/admin/${type}/${id}/status`,
  ADMIN_SECTION: (section) => `${API_BASE_URL}/api/admin/${section}`,
  
  // User endpoints
  USER_APPOINTMENTS: `${API_BASE_URL}/api/user/appointments`,
  USER_VOLUNTEERS: `${API_BASE_URL}/api/user/volunteers`,
  USER_CONTACTS: `${API_BASE_URL}/api/user/contacts`,
  USER_DONATIONS: `${API_BASE_URL}/api/user/donations`,
  USER_PET_ADOPTIONS: `${API_BASE_URL}/api/user/petadoptions`,
  USER_ORDERS: `${API_BASE_URL}/api/user/orders`,
  USER_REGISTRATIONS: `${API_BASE_URL}/api/user/userregs`,
  USER_REGISTRATION_SUBMIT: `${API_BASE_URL}/api/user/userregs`,
  USER_CANCEL_ORDER: (orderId, itemId) => `${API_BASE_URL}/api/user/cancel-order/${orderId}/${itemId}`,
  USER_REVIEWS: `${API_BASE_URL}/api/user/reviews`,
  
  // OTP endpoints
  OTP_SEND: `${API_BASE_URL}/api/otp/send-otp`,
  OTP_VERIFY: `${API_BASE_URL}/api/otp/verify-otp`,
  
  // Forgot Password endpoints
  FORGOT_SEND_OTP: `${API_BASE_URL}/api/forgot-send-otp`,
  FORGOT_VERIFY_OTP: `${API_BASE_URL}/api/forgot-verify-otp`,
  FORGOT_RESET_PASSWORD: `${API_BASE_URL}/api/forgot-reset-password`,
  ADMIN_FORGOT_SEND_OTP: `${API_BASE_URL}/api/admin-forgot-send-otp`,
  ADMIN_FORGOT_VERIFY_OTP: `${API_BASE_URL}/api/admin-verify-otp`,
  ADMIN_FORGOT_RESET_PASSWORD: `${API_BASE_URL}/api/admin-forgot-reset-password`,
  
  // Other endpoints
  SUBSCRIPTION: `${API_BASE_URL}/api/user/subscription`,
  CONTACT: `${API_BASE_URL}/api/user/contact`,
  APPOINTMENT_UPLOAD: `${API_BASE_URL}/api/appointments/user/upload`,
  
  // Static file URLs
  UPLOADS: (filename) => `${API_BASE_URL}/uploads/${filename}`,
  UPLOAD_APPOINTMENT: (filename) => `${API_BASE_URL}${filename}`,
  UPLOAD_ORDERS: (filename) => `${API_BASE_URL}${filename}`,
};

export default API_BASE_URL;

