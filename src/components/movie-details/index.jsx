import { useState, useEffect } from "react";
import { getMovieInfo } from "../../services/get-movie-info";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";





const MovieDetails = () => {
    const [movieInfo, setMovieInfo] = useState({
        background: null,
        poster: null,
        title: '',
        overview: '',
        director: [],
        cast: [],
        genres: []
    })

    const params = useParams()
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const movieData = await getMovieInfo(params.id)
        const directorData = (movieData.credits.crew.filter((person) => { return person.job === "Director" }).map(({ name }) => { return name }))
        const castData = movieData.credits.cast.slice(0, 4)
        const genresData = movieData.genres

        setMovieInfo({
            background: `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`,
            poster: `https://image.tmdb.org/t/p/original${movieData?.poster_path}`,
            title: movieData.title,

            overview: movieData.overview,
            director: directorData,
            cast: castData,
            genres: genresData,
        })

    }

    return (
        <Main>
            <Overlay> <Background src={movieInfo.background} alt="background-image" /></Overlay>
            <Link to={'/'}><Logo>MoodyMovie</Logo></Link>
            <Data>
                <div>
                    {movieInfo.poster != null &&
                        <MoviePoster src={movieInfo.poster} alt="movie-poster" />
                    }
                    {movieInfo.poster = null &&
                        <MoviePoster src="../src/images/no-poster.png" alt="no-movie-poster" />
                    }
                </div>
                <InfoSection>
                    <h1>{movieInfo.title}</h1>
                    <GenresSection>
                        {movieInfo.genres.length === 0 && <Genre>No movie genre found</Genre>}
                        {movieInfo.genres.map((genre, index) => {
                            return (
                                <div key={index}>
                                    <Genre>{genre.name}</Genre>
                                </div>
                            )
                        })}
                    </GenresSection>
                    {movieInfo.overview === '' && <p>No overview found</p>}
                    <p>{movieInfo.overview}</p>

                    <Credits>
                        <div>
                            <p>Directed by:</p>
                            {movieInfo.director.length === 0 && <p>No director found</p>}
                            <div>{movieInfo.director.map((director, index) => {
                                return (
                                    <div key={index}>
                                        <p>{director}</p>
                                    </div>
                                )
                            })}</div>
                        </div>
                        <div>
                            <p>Cast:</p>
                            {movieInfo.cast.length === 0 && <p>No cast found</p>}
                            <div>{movieInfo.cast.map((actor, index) => {
                                return (
                                    <div key={index}>
                                        <p>{actor.name}</p>
                                    </div>
                                )
                            })}</div>
                        </div>

                    </Credits>
                </InfoSection>
            </Data>
        </Main >
    )
}

export { MovieDetails }

const Main = styled.main`
    display: flex;   
    justify-content: center;
    align-items: center;
    height: 100vh;
    `

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7)
`

const Background = styled.img`
    width: 100%;
    height: 100%;
    z-index: -1;
    position: relative;
`

const Logo = styled.h1`
    font-family: 'Raleway', sans-serif;
    position: absolute;
    color: #fff;
    top: 0;
    left :0;
    
    padding: 3%;
    `

const Data = styled.div`
    position: absolute;
    display: flex;
    color: #fff;
    text-shadow: 1px 1px 1px #000000;
    gap: 100px;
    align-items: center;
`

const MoviePoster = styled.img` 
    width: 400px;
    border-radius: 10px;   
`

const InfoSection = styled.section`
    width: 350px;
    gap: 30px;
    font-family: 'Raleway', sans-serif;
`

const GenresSection = styled.div`
    display: flex;
    gap: 20px;
    margin: 10px 0px 30px 0px;
`

const Genre = styled.p`
    font-size: 15px;
    padding: 10px;
    border-radius: 10px;
    background-color: #1F2122;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: none;
`

const Credits = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
`

