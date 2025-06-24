import {fetchFromTMDB} from "../services/tmdb.service.js"; 

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({succes:true,content:randomMovie});
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        res.status(500).json({succes:false, error: "Failed to fetch trending movies" });
    }
}



export async function getMovieTrailers(req, res) {
const { id } = req.params;
try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({succes:true, content:data.results});
} catch (error) {
    if(error.masseg.includes("404")){
        return res.status(404).send(null)
    }
    res.status(500).json({succes:false, error: "Failed to fetch movie trailers" });
}
}



export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({succes:true, content:data});
    } catch (error) {
        if(error.masseg.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({succes:false, error: "Failed to fetch movie details" });
    }

}


export async function getSimilarMovie(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.json({succes:true, content:data.results});
    } catch (error) {
        if(error.masseg.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({succes:false, error: "Failed to fetch similar movies" });
    }
}



export async function getMovieByCategory(req, res) {
    const { Category } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${Category}?language=en-US&page=1`);
        res.json({succes:true, content:data.results});
    } catch (error) {
        if(error.masseg.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({succes:false, error: "Failed to fetch movies by category" });
    }
}