'use client';
import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-12-02T00:00:00'); // target date
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdownBox text-white text-center rounded-4">
      {Object.entries(timeLeft).map(([label, value], index) => (
        <div key={label} className="countdown-item mb-3">
          <h2 className="fw-bold m-0">{value}</h2>
          <div>{label.charAt(0).toUpperCase() + label.slice(1)}</div>
          {index !== 3 && <hr className="dotSeparator" />}
        </div>
      ))}
    </div>
  );
}
