import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { getMoviesByGenre } from "../../services/get-movie-genre"
import { Cards } from "../cards/cards"
import { getPopularMovies } from "../../services/get-popular-movies"
import { Link } from "react-router-dom"



export const Home = () => {
    const [selectedMood, setSelectedMood] = useState('')
    const [movieList, setMovieList] = useState([])
    const [movieCarousel, setMovieCarousel] = useState([])

    const handleSelect = (e) => {
        setSelectedMood(e.target.value)
    }

    useEffect(() => {
        fetchList()
    }, [selectedMood])

    async function fetchList() {
        const list = await getMoviesByGenre(selectedMood)
        console.log(list)
        setMovieList(list)
        const popularMoviesList = await getPopularMovies()
        const carouselList = popularMoviesList.filter(({ genre_ids }) => { return genre_ids.length > 0 })
        setMovieCarousel(carouselList)

    }






    return (
        <Main>

            <Nav>

                <Link to={'/'}><Logo>MoodyMovie</Logo></Link>
                <Div>
                    <Question>How you're feeling today?</Question>

                    <Select
                        onChange={handleSelect}>
                        <option value="">Select a mood</option>
                        <option value="35">Happy 😁</option>
                        <option value="18">Sad 😔</option>
                        <option value="10749">In Love 😍</option>
                        <option value="27">Scared 😨</option>
                        <option value="12">Excited 🤩</option>
                        <option value="99">thoughtful 🤔</option>
                    </Select>
                </Div>

            </Nav>

            {selectedMood === "" &&
                <CarouselContainer>
                    <CarouselTrack>
                        {movieCarousel.map((movie, index) => {
                            return (
                                <Carousel key={index}>
                                    <Link to={`/movie/${movie.id}`}>
                                        {movie.poster_path != null &&
                                            <CarouselImg src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="movie-poster" />
                                        }
                                        {movie.poster_path === null &&
                                            <CarouselImg src="../src/images/no-poster.png" alt="no-movie-poster" />
                                        }
                                        <div>{movie.genre_ids[0] === 16 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 35 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10751 && <Emoji>😁</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 18 && <Emoji>😔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10752 && <Emoji>😔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10749 && <Emoji>😍</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 27 && <Emoji>😨</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 53 && <Emoji>😨</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 12 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 28 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 14 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 10402 && <Emoji>🤩</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 99 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 9648 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 36 && <Emoji>🤔</Emoji>}</div>
                                        <div>{movie.genre_ids[0] === 878 && <Emoji>🤔</Emoji>}</div>
                                    </Link>
                                </Carousel>

                            )
                        })}
                    </CarouselTrack>
                </CarouselContainer>
            }

            {selectedMood != "" &&
                <>
                    { }
                    <Section>

                        {movieList.map((movie, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <Cards>
                                            {movie.poster_path != null &&
                                                <Img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} alt="movie-poster"></Img>
                                            }
                                            {movie.poster_path === null &&
                                                <Img src="../src/images/no-poster.png" alt="no-movie-poster"></Img>
                                            }
                                            <HiddenSection>
                                                <Title>{movie.title}</Title>
                                                <Description>{movie.overview}</Description>
                                            </HiddenSection>
                                        </Cards>
                                    </Link>
                                </div>
                            )
                        })}

                    </Section>

                </>
            }

        </Main>

    )
}



const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
`

const Logo = styled.h1`
    font-family: 'Raleway', sans-serif;
`

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3%; 
`

const Div = styled.div`

    display: flex;
    align-items: center;
    gap: 15px;
`

const Question = styled.h3`
    font-family: 'Raleway', sans-serif;
`

const Select = styled.select`
    font-family: 'Raleway', sans-serif;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    border-none;
    color: #fff;
`

const CarouselContainer = styled.div`
    overflow: hidden;   
`

const sliderAnimation = keyframes`
    from{
        transform: translateX(0%);
    }
    to{
        transform: translateX(-200%);
    }    
`

const CarouselTrack = styled.section`
    display: flex;
    overflow: hidden;
    overflow-x: auto; 
    position absolute;
    padding: 3%;
    width: 100vw;
    gap: 50px;
    margin-bottom: 50px;
    
`

const Carousel = styled.div`
    position: relative;
    animation: 10s ${sliderAnimation} linear infinite;
`

const CarouselImg = styled.img`
    width: 350px;
    heigth: 450px;
    border-radius: 10px;
`

const Emoji = styled.p`
    position: absolute;
    bottom: -30px;
    transform: rotate(20deg);
    right: -20px;
    font-size: 80px;
`

const Section = styled.section`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 50px;    
    margin: 40px 0px 40px 0px;
    @media (max-width: 762px){
        grid-template-columns: 1fr ;
    }
`
const Img = styled.img`
    width: 300px;
    height: 400px;
    border-radius: 10px;
`

const HiddenSection = styled.div`
    position: absolute;
    bottom: -100px;
    background: linear-gradient( #00000000, #000000 90%);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    &:hover{
        opacity: 1;
        bottom: 0px;        
    }
`

const Title = styled.p`
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    color: #fff;
    margin-bottom: 5px;
`

const Description = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 13px;
    color: #fff;   
`