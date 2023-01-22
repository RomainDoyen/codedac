import React, {useState, useEffect} from "react";

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={`back-to-top-button ${showButton ? "" : "hidden"}`} onClick={handleClick}>
      <span><i class="fa-solid fa-chevron-up"></i></span>
    </button>
  );
}

export default BackToTopButton