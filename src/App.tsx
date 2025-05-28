import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import PrayerDetail from "./pages/prayer/[id]";

function AdBanner() {
  useEffect(() => {
    // Initialize AdMob
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdMob error:", e);
      }
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-50 shadow-lg">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "320px", height: "50px" }}
        data-ad-client="ca-pub-1451675881977871"
        data-ad-slot="1092566686"
      ></ins>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prayer/:id" element={<PrayerDetail />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <AdBanner />
      </>
    </Suspense>
  );
}

export default App;
