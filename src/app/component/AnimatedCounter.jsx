'use client';
import { useEffect, useState } from 'react';

export default  function AnimatedCounter({ target, duration = 10000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(counter);
  }, [target, duration]);

  return <h2 className="counter mb-0">{count}</h2>;
};
