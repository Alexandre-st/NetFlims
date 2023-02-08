import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Pin from "../components/Pin";
import useFetch from "../hooks/useFetch";

const Details = () => {
  const location = useLocation();
  const data = location.state.movie;
  console.log(data);

  return (
    <div className="detail_container ">
      <div className="detail-image">
        <Pin pageData={data} />
        <img
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          alt={data.name || data.original_title}
        />
      </div>

      <div className=" detail-card ">
        <h1>{data.name || data.original_title}</h1>
        <p className="overview">{data.overview}</p>
        <p>Vote: {data.vote_average}</p>
        <p className="revenue">Revenue : ${data.revenue}</p>
      </div>
    </div>
  );
};

export default Details;
