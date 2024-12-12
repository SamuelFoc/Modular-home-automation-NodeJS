"use client";
import { apiFetch } from "@/utils/fetchApi";
import { useEffect, useState } from "react";

export default function OnlineSensors({ title }) {
  const [oSensors, setOSensors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch("/online_sensors");
        setOSensors(res);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(oSensors);
  return (
    <div className="w-full flex flex-col py-6 px-4 border-gray-500 border-2 border-opacity-30 rounded relative">
      <h1 className="absolute -top-4 left-5 text-xl text-violet-400">
        {title}
      </h1>
      <div>Some random content</div>
    </div>
  );
}
