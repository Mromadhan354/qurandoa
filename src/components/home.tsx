import React from "react";
import PrayerList from "./PrayerList";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#A8F1FF] flex flex-col items-center p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center my-6 text-[#0A6E83]">
          Kumpulan Doa dari Al-Quran
        </h1>

        {/* Prayer list */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <PrayerList />
        </div>
      </div>
    </div>
  );
};

export default Home;
