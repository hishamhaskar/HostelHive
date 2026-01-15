import { useState, useEffect } from 'react';

const ScrollingText = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scrolling-text ${isVisible ? 'visible' : 'hidden'}`}>
      <marquee>Accepted through pay.cusat.ac.in</marquee>
    </div>
  );
};

export default ScrollingText;
