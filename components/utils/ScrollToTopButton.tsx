"use client";
import { useState, useEffect } from "react";
import { ArrowUpFromLine } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200;

      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop(duration: number): void {
    const start = window.scrollY;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    function animateScroll() {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const elapsed = currentTime - startTime;
  
      window.scrollTo(0, easeInOutCubic(elapsed, start, -start, duration));
  
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    }
  
    function easeInOutCubic(t: number, b: number, c: number, d: number): number {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }
  
    requestAnimationFrame(animateScroll);
  }
  
  return (
    <button
      className={`scroll-to-top bg-main  rounded-lg bottom-5 right-5 ${
        isVisible ? "visible fixed" : ""
      }`}
      onClick={() => scrollToTop(1500)}
    >
      <ArrowUpFromLine className="text-white h-5 w-5 m-2" />
    </button>
  );
};

export default ScrollToTopButton;



