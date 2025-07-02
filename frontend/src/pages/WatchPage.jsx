import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import Navbar from "../components/Navbar";
import ReactPlayer from "react-player/youtube";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const [showMovie, setShowMovie] = useState(false); // New state to toggle between trailers and movie
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        console.log("Fetching trailers for:", { contentType, id });
        const endpoints = [
          `/api/v1/movie/${id}/trailers`,
          `/api/v1/tv/${id}/trailers`,
        ];

        let response;
        for (const endpoint of endpoints) {
          try {
            response = await axios.get(endpoint);
            if (response.data) break;
          } catch (e) {
            console.log(`Tried ${endpoint}, got ${e.response?.status}`);
          }
        }

        if (!response) throw new Error("No valid response from any endpoint");
        const res = response;
        console.log("Trailers response:", res.data);
        const trailersData = Array.isArray(res.data.content)
          ? res.data.content
          : [];
        console.log("Setting trailers:", trailersData);
        setTrailers(trailersData);
      } catch (error) {
        console.error("Error fetching trailers:", error);
        if (error.message.includes("404")) {
          console.log("No trailers found (404)");
          setTrailers([]);
        } else {
          console.error("Other error:", error);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const endpoints = [
          `/api/v1/movie/${id}/similar`,
          `/api/v1/tv/${id}/similar`,
        ];

        let response;
        for (const endpoint of endpoints) {
          try {
            response = await axios.get(endpoint);
            if (response.data) break;
          } catch (e) {
            console.log(`Tried ${endpoint}, got ${e.response?.status}`);
          }
        }

        if (!response) throw new Error("No valid response from any endpoint");
        const res = response;
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const endpoints = [
          `/api/v1/movie/${id}/details`,
          `/api/v1/tv/${id}/details`,
        ];

        let response;
        for (const endpoint of endpoints) {
          try {
            response = await axios.get(endpoint);
            if (response.data) break;
          } catch (e) {
            console.log(`Tried ${endpoint}, got ${e.response?.status}`);
          }
        }

        if (!response) throw new Error("No valid response from any endpoint");
        const res = response;
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        <div className="mb-4">
          <button
            onClick={() => setShowMovie(!showMovie)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all"
          >
            {showMovie ? "Show Trailers" : "Show Movie"}
          </button>
        </div>

        {showMovie ? (
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            {/* Placeholder for movie content */}
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Movie Playback</h3>
              <p className="text-gray-300 mb-4">
                Full movie content would be displayed here. (Movie streaming
                implementation required)
              </p>
            </div>
          </div>
        ) : (
          <>
            {trailers?.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <button
                  className={`
            bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
              currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
                  disabled={currentTrailerIdx === 0}
                  onClick={handlePrev}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className={`
            bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
              currentTrailerIdx === trailers.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
                  disabled={currentTrailerIdx === trailers.length - 1}
                  onClick={handleNext}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            <div className="relative w-full mb-8">
              {trailers?.length > 0 ? (
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  {trailers[currentTrailerIdx]?.key ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailers[currentTrailerIdx].key}?autoplay=1&mute=1`}
                        className="w-full h-full"
                        title={`${
                          content?.title || content?.name || "Movie"
                        } Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onError={(e) => {
                          console.error("Error loading video:", e);
                        }}
                      />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <button
                          onClick={handlePrev}
                          disabled={currentTrailerIdx === 0}
                          className={`px-4 py-2 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full transition-all ${
                            currentTrailerIdx === 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label="Previous trailer"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <span className="px-4 py-2 bg-black/70 text-white rounded-full text-sm flex items-center">
                          {currentTrailerIdx + 1} / {trailers.length}
                        </span>
                        <button
                          onClick={handleNext}
                          disabled={currentTrailerIdx === trailers.length - 1}
                          className={`px-4 py-2 bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full transition-all ${
                            currentTrailerIdx === trailers.length - 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label="Next trailer"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-red-400 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Video Not Available
                      </h3>
                      <p className="text-gray-300 mb-4">
                        We couldn't load the trailer for this content.
                      </p>
                      <div className="text-sm text-gray-400 p-4 bg-gray-900/50 rounded-lg max-w-md text-left">
                        <p className="font-mono">Content ID: {id}</p>
                        <p className="font-mono">
                          Trailer Index: {currentTrailerIdx}
                        </p>
                        {trailers.length > 0 && (
                          <details className="mt-2">
                            <summary className="text-blue-400 cursor-pointer">
                              Show debug info
                            </summary>
                            <pre className="text-xs mt-2 overflow-auto max-h-40 p-2 bg-black/50 rounded">
                              {JSON.stringify(
                                trailers[currentTrailerIdx],
                                null,
                                2
                              )}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-900/50 rounded-lg flex flex-col items-center justify-center p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-gray-600 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-300 mb-2">
                    No Trailers Available
                  </h2>
                  <p className="text-gray-400 max-w-md">
                    We couldn't find any trailers for "
                    {content?.title || content?.name || "this content"}".
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
