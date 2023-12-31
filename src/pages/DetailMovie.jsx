import React, { useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useMovieDataQueryDetail } from "../services/User/get-data-detail";
import YouTube from "react-youtube";

export const DetailMovie = () => {
  const data1 = useLocation();
  const { id } = useParams();
  const videoRef = useRef(null);

  const { data: movieData, isLoading, isError } = useMovieDataQueryDetail(id);

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (isError) {
    return <p>Error loading movie data.</p>; 
  }

  const renderTrailer = () => {
    const datarender = movieData?.videos?.results.slice(0, 8);
    //cek daata vidio klaau ada / ga ada
    if (!datarender || datarender.length === 0) {
      return <p className="text-center font-bold text-[2rem] w-full">No trailer available.</p>;
    }

    return datarender?.map((value, index) => (
      <div key={index} className=" w-auto h-auto m-8 ">
        <YouTube
          videoId={value.key} 
          opts={{ width: "490px", height: "640px" }}
        />
      </div>
    ));
  };
  console.log(movieData, "teeess");
  return (
    <div className="h-screen relative bg-black overflow-y-auto ">
      
      <div
        className=" bg-center bg-cover bg-no-repeat bg-opacity w-full h-full flex items-center justify-center bg-blend-soft-light bg-gray-700"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieData?.backdrop_path}')`,
        }}
      >
      <a href='/' className='text-white absolute top-2 right-2 bg-red-500 p-2 rounded-full'>Back to Home</a>
        <div className=" w-[50%] h-[50%] flex ">
          <div className=" h-[100%] w-[30%] text-white">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
              className="w-full h-full"
            />
            
          </div>
          <div className="  h-[100%] w-[70%] text-white flex flex-col space-y-2 pl-4">
            <h1 className="text-[3.5rem] font-bold">{movieData?.title}</h1>
            <div className="flex">
              {movieData?.genres?.map((value) => (
                <button
                  key={value.id}
                  className="bg-transparent  border-solid border-[3px] border-white text-white w-auto h-auto p-2 rounded-full m-1"
                >
                  {value.name}
                </button>
              ))}
            </div>
            <h1>Release Date: {movieData?.release_date}</h1>

            <p>{movieData?.overview}</p>
            <p>Rating: {movieData?.vote_average.toFixed(2)} / 10</p>
            <button
              className="bg-red-500 text-white w-32 h-8 rounded-full"
              onClick={() => {
                videoRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <h1 className="text-[2rem] text-white font-bold">Trailer</h1>
      </div>
      <div   ref={videoRef} className="flex flex-wrap justify-center text-center text-white ">
        {renderTrailer()}
        <div className="h-[4rem] w-[40rem]  flex items-center space-x-2 justify-evenly"></div>
      </div>
    </div>
  );
};
