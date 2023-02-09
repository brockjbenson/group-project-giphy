import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";

// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Favorites() {
  const dispatch = useDispatch();
  const [favGifs, setFavGifs] = useState("");
  useEffect(() => {
    getFavorites();
  }, []);

  console.log(favGifs);

  const getFavorites = () => {
    axios
      .get("/api/favorite")
      .then((response) =>
        dispatch({ type: "GET_FAVORITES", payload: response.data })
      );
  };

  // const history = useHistory();
  const favs = useSelector((store) => store.getFavorites);
  console.log("this is favs", favs);

  return (
    <>
      <h1>Favorites</h1>
      {favs.map((gif, index) => (
        <div key={index}>
          <img src={gif.url} />
        </div>
      ))}
    </>
  );
}
