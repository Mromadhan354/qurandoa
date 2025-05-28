import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { fetchPrayers, fetchPrayerById, Prayer } from "@/lib/api";

export default function PrayerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [prayer, setPrayer] = useState<Prayer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPrayers, setAllPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    const loadPrayers = async () => {
      try {
        setLoading(true);
        const prayers = await fetchPrayers();
        setAllPrayers(prayers);

        if (id && !isNaN(parseInt(id))) {
          const prayerId = parseInt(id);
          const foundPrayer = await fetchPrayerById(prayerId);
          setPrayer(foundPrayer);
          if (!foundPrayer) {
            setError("Doa tidak ditemukan");
          }
        } else {
          setError("ID doa tidak valid");
        }
      } catch (err) {
        setError("Gagal memuat doa");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPrayers();
  }, [id]);

  const handleNextPrayer = () => {
    if (!prayer || allPrayers.length === 0) return;

    const currentIndex = allPrayers.findIndex((p) => p.id === prayer.id);
    const nextIndex = (currentIndex + 1) % allPrayers.length;
    navigate(`/prayer/${allPrayers[nextIndex].id}`);
  };

  const handlePrevPrayer = () => {
    if (!prayer || allPrayers.length === 0) return;

    const currentIndex = allPrayers.findIndex((p) => p.id === prayer.id);
    const prevIndex =
      (currentIndex - 1 + allPrayers.length) % allPrayers.length;
    navigate(`/prayer/${allPrayers[prevIndex].id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#A8F1FF]">
        <p className="text-lg">Memuat doa...</p>
      </div>
    );
  }

  if (error || !prayer) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#A8F1FF]">
        <p className="text-lg">{error || "Doa tidak ditemukan"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#A8F1FF] to-[#4ED7F1]">
      <Card className="w-full max-w-md bg-white/90 shadow-lg">
        <CardHeader className="bg-[#6FE6FC] text-center rounded-t-xl">
          <CardTitle className="text-xl font-bold text-gray-800">
            {prayer["Nama Doa"]}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="text-right">
            <p className="text-2xl leading-relaxed font-arabic" dir="rtl">
              {prayer["Lafadz Doa"]}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Arti:</h3>
            <p className="text-gray-700">{prayer["Arti Doa"]}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pb-6">
          <Button
            onClick={handlePrevPrayer}
            className="bg-[#4ED7F1] hover:bg-[#6FE6FC] text-white flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Sebelumnya
          </Button>
          <Button
            onClick={handleNextPrayer}
            className="bg-[#4ED7F1] hover:bg-[#6FE6FC] text-white flex items-center gap-2"
          >
            Selanjutnya
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
