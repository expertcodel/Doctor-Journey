'use client';
import React from 'react';

type Props = {
  today: string;        // e.g., "5/19/2025"
  targetDate: string;   // e.g., "16/05/2025"
};

const DaysCalculator: React.FC<Props> = ({ today, targetDate }) => {
  const parseSmartDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('/').map(Number);
    if (parts.length !== 3) return null;

    const [a, b, year] = parts;

    let day: number, month: number;

    // Auto-detect format:
    if (a > 12 && b <= 12) {
      // a is day → DD/MM/YYYY
      day = a;
      month = b;
    } else if (b > 12 && a <= 12) {
      // b is day → MM/DD/YYYY
      day = b;
      month = a;
    } else {
      // Ambiguous: assume MM/DD/YYYY (common default)
      month = a;
      day = b;
    }

    return new Date(year, month - 1, day);
  };

  const getDaysDifference = (d1: Date, d2: Date): number => {
    const date1 = new Date(d1.setHours(0, 0, 0, 0));
    const date2 = new Date(d2.setHours(0, 0, 0, 0));
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const parsedToday = parseSmartDate(today);
  const parsedTarget = parseSmartDate(targetDate);

  if (!parsedToday || !parsedTarget) return <p>Invalid date format</p>;

  const days = getDaysDifference(parsedToday, parsedTarget);

  return (
   
 <small className="d-block text-muted">{days} days ago</small>
    
  );
};

export default DaysCalculator;
