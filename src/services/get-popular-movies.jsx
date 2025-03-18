import axios from "axios";
const apiKey = "886b037c9beb593d291fef5167498e1f"







async function getPopularMovies() {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
    return response.data.results
}


export {getPopularMovies}