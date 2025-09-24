import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="scroll-to-top"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#184F38",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#0F3B2A";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#184F38";
          e.target.style.transform = "scale(1)";
        }}
      >
        <FaArrowUp />
      </button>
    )
  );
}

export default ScrollToTopButton;