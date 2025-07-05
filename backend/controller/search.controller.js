import { User } from "../model/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results || response.results?.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }

    // Only save to history if user is authenticated
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      }).catch((err) => console.error("Error updating search history:", err));
    }

    return res.status(200).json({ success: true, results: response.results });
  } catch (error) {
    console.error("Error searching person:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results?.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }
    return res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error("Error searching movie:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results?.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No results found" });
    }
    if (req.user?._id) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }
    return res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error("Error searching TV:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(req.user._id).select("searchHistory");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("Search history:", user.searchHistory);
    res.status(200).json({ success: true, content: user.searchHistory });
  } catch (error) {
    console.error("Error fetching search history:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id); // TMDB IDs are numbers
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          searchHistory: { id },
        },
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Search history removed successfully" });
  } catch (error) {
    console.error("Error removing search history:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
