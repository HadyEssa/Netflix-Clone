import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrandingContent from "../../hooks/useGetTrandingContent";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

const HomeScreen = () => {
  const trendingContent = useGetTrandingContent();
  console.log("trendingContent", trendingContent);
  if(!trendingContent) return(
    <div className="h-screen relative text-white">
      <Navbar/>
      {/* shimmer - placeholder effect while loading trending content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
    </div>
  )
  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar />
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt=""
          className="absolute top-0 left-0 -z-50 w-full h-full object-cover"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="flex flex-col justify-center h-full top-0 left-0 w-full px-8 md:px-16 lg:px-32">
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent 
        absolute w-full h-full top-0 left-0 -z-50"
          />
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance ">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split?.("-")[0] ||
                trendingContent?.first_air_date?.split?.("-")[0]}
              | {trendingContent?.adult ? "+18" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview
                ? trendingContent.overview.length > 200
                  ? trendingContent.overview.slice(0, 200) + "..."
                  : trendingContent.overview
                : ""}
            </p>
          </div>
          <div className="mt-8 flex">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 inline-block mr-2 fill-black" />
              play
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded  flex items-center"
            >
              <Info className="size-6  mr-2" />
              more info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
