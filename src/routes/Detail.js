import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
    console.log(detail);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <img src={detail.large_cover_image} />
          <h1>{detail.title_long}</h1>
          <h3>rating : {detail.rating}</h3>
          <p>{detail.description_full}</p>
          <p>
            <a href={detail.url}>URL</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Detail;
