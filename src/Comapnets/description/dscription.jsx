import "../description/dscription.css";
import startIcon from "../../assets/icons8-star-48.png";

export const Description = ({ item }) => {
  const genresList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    14: "Fantasy",
    27: "Horror",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
  };
  return (
    <>
      <div className="background">
        <div className="cointerde">
         
          <h1>
            <span className="rate">
              Rate: <span>{item.vote_average}</span>
              {Array(Math.round(item.vote_average))
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={startIcon} id="iconStart" />
                ))}
            </span>
          </h1>
          <h1 />
          <h1 className="numbercount">
            Number vote: <b>{item.vote_count}</b>
          </h1>
          <h1 className="release">Release date: {item.release_date}</h1>
          <div className="genres">
            {item.genre_ids.map((id) => (
              <span key={id} className="genre-tag ">
                {genresList[id]}
              </span>
            ))}
          </div>
          <p>{item.overview}</p>
        </div>
      </div>
    </>
  );
};
