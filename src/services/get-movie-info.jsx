import axios from "axios";
const apiKey = "886b037c9beb593d291fef5167498e1f"







async function getMovieInfo(id){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`)
    return response.data
}

export{ getMovieInfo }