import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface PrayerItemProps {
  id: number;
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}

const PrayerItem = ({
  id = 1,
  name = "Doa Sebelum Tidur",
  onClick,
  isActive = false,
}: PrayerItemProps) => {
  return (
    <Card
      className={`w-full mb-2 cursor-pointer transition-all hover:shadow-md bg-white ${isActive ? "border-[#4ED7F1] border-2" : "border-[#A8F1FF]"}`}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${isActive ? "bg-[#4ED7F1]" : "bg-[#A8F1FF]"}`}
          >
            <span className="text-sm font-medium text-gray-700">{id}</span>
          </div>
          <h3 className="text-gray-800 font-medium">{name}</h3>
        </div>
        <ChevronRight className="h-5 w-5 text-[#6FE6FC]" />
      </CardContent>
    </Card>
  );
};

export default PrayerItem;
