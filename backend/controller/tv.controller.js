import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomTv });
    } catch (error) {
        console.error("Error fetching trending TV shows:", error);
        res.status(500).json({ success: false, error: "Failed to fetch trending TV shows" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, content: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, error: "Failed to fetch TV trailers" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, error: "Failed to fetch TV details" });
    }
}

export async function getSimilarTv(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, error: "Failed to fetch similar TV shows" });
    }
}

export async function getTvByCategory(req, res) {
    const { Category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${Category}?language=en-US`);
        res.json({ success: true, content: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, error: "Failed to fetch TV shows by category" });
    }
}