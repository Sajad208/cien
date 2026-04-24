import StartIcon from "../../assets/icons8-star-48.png";
export const Photo = ({ item }) => {
  return (
    <>
      <div className="couintenr">
        <div className="photo">
          <img
            id="backphoto"
            src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
          ></img>
        </div>
        <div className="binar"></div>
        <div className="item">
          <img
            id="elemnt"
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          ></img>
          <div className="titelp">
            <h1 id="tit">{item.title}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
