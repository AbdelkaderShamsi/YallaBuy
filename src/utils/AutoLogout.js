let logoutTimer = null;

export const startAutoLogout = (dispatch, navigate) => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }

  logoutTimer = setTimeout(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo && userInfo.token) {
      console.log("Auto logout due to inactivity");

      dispatch({ type: "USER_LOGOUT" });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");

      if (navigate && typeof navigate === "function") {
        navigate("/login");
      } else {
        window.location.href = "/login";
      }
    }
  }, 5 * 60 * 1000);
};

export const resetAutoLogout = (dispatch, navigate) => {
  startAutoLogout(dispatch, navigate);
};

export const clearAutoLogout = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
    console.log('Auto logout timer cleared');
  }
};
