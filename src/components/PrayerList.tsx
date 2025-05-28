import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrayerItem from "./PrayerItem";
import { fetchPrayers, Prayer } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PrayerListProps {
  onPrayerSelect?: (id: number) => void;
}

const PrayerList: React.FC<PrayerListProps> = ({
  onPrayerSelect = () => {},
}) => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const prayersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const loadPrayers = async () => {
      try {
        setLoading(true);
        const data = await fetchPrayers();
        setPrayers(data);
        setFilteredPrayers(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat daftar doa");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPrayers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPrayers(prayers);
    } else {
      const filtered = prayers.filter((prayer) =>
        prayer["Nama Doa"].toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredPrayers(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, prayers]);

  const handlePrayerClick = (id: number) => {
    navigate(`/prayer/${id}`);
  };

  // Get current prayers for pagination
  const indexOfLastPrayer = currentPage * prayersPerPage;
  const indexOfFirstPrayer = indexOfLastPrayer - prayersPerPage;
  const currentPrayers = filteredPrayers.slice(
    indexOfFirstPrayer,
    indexOfLastPrayer,
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPrayers.length / prayersPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4 text-center">
        <p>Memuat daftar doa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-4"
      style={{ backgroundColor: "#A8F1FF" }}
    >
      {/* Search bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Cari doa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-[#6FE6FC] focus:border-[#4ED7F1] focus:ring-[#4ED7F1]"
          />
        </div>
      </div>

      {/* Prayer list */}
      <div className="space-y-2 mb-4">
        {currentPrayers.length > 0 ? (
          currentPrayers.map((prayer) => (
            <PrayerItem
              key={prayer.id}
              id={prayer.id}
              name={prayer["Nama Doa"]}
              onClick={() => handlePrayerClick(prayer.id)}
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Tidak ada doa yang ditemukan
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === number ? "bg-[#4ED7F1] text-white" : "bg-[#A8F1FF] text-gray-700 border border-[#6FE6FC]"}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerList;
