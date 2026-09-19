"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  saleEndDate: string;
}

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Countdown({ saleEndDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const endDate = new Date(saleEndDate).getTime();

    let intervalId: NodeJS.Timeout;

    const updateTimer = () => {
      // console.log("updateTimer", new Date().toLocaleTimeString());

      const diff = endDate - Date.now();

      if (diff <= 0) {
        clearInterval(intervalId);

        setTimeLeft((prev) => {
          if (
            prev.days === "00" &&
            prev.hours === "00" &&
            prev.minutes === "00" &&
            prev.seconds === "00"
          ) {
            return prev;
          }

          return {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
          };
        });

        return;
      }

      const next = {
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      };

      setTimeLeft((prev) => {
        if (
          prev.days === next.days &&
          prev.hours === next.hours &&
          prev.minutes === next.minutes &&
          prev.seconds === next.seconds
        ) {
          return prev;
        }

        return next;
      });
    };

    updateTimer();

    intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [saleEndDate]);

//   console.log("Render", new Date().toLocaleTimeString());

  return (
    <div className="flex items-center text-[#DB4444]">
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-black">Days</span>
        <span className="text-2xl font-bold text-black md:text-3xl">
          {timeLeft.days}
        </span>
      </div>

      <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-black">Hours</span>
        <span className="text-2xl font-bold text-black md:text-3xl">
          {timeLeft.hours}
        </span>
      </div>

      <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-black">Minutes</span>
        <span className="text-2xl font-bold text-black md:text-3xl">
          {timeLeft.minutes}
        </span>
      </div>

      <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-black">Seconds</span>
        <span className="text-2xl font-bold text-black md:text-3xl">
          {timeLeft.seconds}
        </span>
      </div>
    </div>
  );
}