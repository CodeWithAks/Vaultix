export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken(); // Agar token hai to true return karega, nahi to false 

export const logout = () => {
  localStorage.removeItem("token"); 
  localStorage.removeItem("user"); 
}