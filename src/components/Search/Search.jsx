import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Search() {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState("");

  const favorites = useSelector((store) => store.getFavorites);
  const gifs = useSelector((store) => store.displaySearch);

  useEffect(() => {
    getSearch();
  }, []);

  const getSearch = () => {
    //console.log("in getSearch this is searchWord", searchWord);
    axios
      .post(`/api/favorite/test`, { searchWord: searchWord })
      .then((response) => {
        //let gifs = response.data;
        //console.log("this is response.data.data", response.data.data);
        dispatch({ type: "SHOW_GIFS", payload: response.data.data });
        //console.log("this is gifs", gifs);
      });
  };

  const handleClick = () => {
    setSearchWord("");
    getSearch();
  };

  const addFav = (url) => {
    axios
      .post("/api/favorite/", { url })
      .then((response) => {
        console.log("posting url");
      })
      .catch((err) => {
        console.log("error in adding url", err);
      });
  };

  return (
    <>
      <div>
        <h1>Giphy Search!</h1>
        <input
          type="text"
          value={searchWord}
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <button onClick={handleClick}>find</button>
        <h2>Gifs:</h2>
        {gifs.map((gif, index) => (
          <div className="gif-item" key={index}>
            <p>{gif.title}</p>
            <img src={gif.images.original.url} />
            <button onClick={() => addFav(gif.images.original.url)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
