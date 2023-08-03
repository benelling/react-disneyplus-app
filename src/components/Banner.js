import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../api/axios'
import requests from '../api/request'
import './Banner.css'

const Banner = () => {
  
  const [movie, setMovie] = useState([]);
  const [isClicked, setisClicked] = useState(false);
  
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    // 현재 상영 중인 영화들의 정보 가져옴
    const response = await axiosInstance.get(requests.fetchNowPlaying)
    console.log(response)
    // 가져온 영화 중 한 영화의 ID값 가져옴
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    // movieId 값을 가진 영화의 더 상세한 정보 가져옴 (비디오 정보 포함)
    const { data: movieDetail } = await axiosInstance.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' }
    })

    setMovie(movieDetail)
  }

  const truncate = (text, length) => {
    return text?.length > length ? `${text.slice(0, length)}...` : text
  }

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width='640'
              height='360'
              // frameborder='0'
              allow='autoplay; fullscreen'
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setisClicked(false)}>X</button>
      </>
    )
  } else {
    return (
      <header className='banner' style={
        { backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}>
  
        <div className='banner__contents'>
          
          <h1 className='banner__title'>
            { movie.title || movie.name || movie.original_name }
          </h1>
          <div className='banner__buttons'>
            { movie?.videos?.results[0]?.key &&
              <button className='banner__button play' onClick={() => setisClicked(true)}>Play</button>
            }
          </div>
          {/* truncate은 자르다 라는 뜻, 아래 movie?.overview 가 text 인수, 100이 length
              강의와 조금 다르게 함수 지정했음 - 강의에서는 slice가 아닌 substring 메소드 사용 */}
          <p className='banner__description'>
            { truncate(movie?.overview, 100) }
          </p>
  
        </div>
  
        <div className='banner--fadeBottom' />
  
      </header>
    )
  }

}

export default Banner


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`