import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  startAutoLogout,
  resetAutoLogout,
  clearAutoLogout,
} from "../utils/AutoLogout";

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    startAutoLogout(dispatch, navigate);

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const resetTimer = () => {
      resetAutoLogout(dispatch, navigate);
    };

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      clearAutoLogout();
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [dispatch, navigate]);
};
