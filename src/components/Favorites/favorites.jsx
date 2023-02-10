import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./favorites.css";

// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Favorites() {
  const dispatch = useDispatch();
  const [favGifs, setFavGifs] = useState("");
  const [categorySelection, setCategorySelection] = useState("");

  useEffect(() => {
    getFavorites();
  }, []);

  //console.log(favGifs);

  const getFavorites = () => {
    axios
      .get("/api/favorite")
      .then((response) =>
        dispatch({ type: "GET_FAVORITES", payload: response.data })
      );
  };

  const setCategory = (id, cat_id) => {
    let catagory = Number(cat_id);
    //console.log(id, catagory);
    axios
      .put(`/api/favorite/${id}`, { catagory })
      .then((response) => getFavorites())
      .catch((err) => {
        console.log("error in updating fav", err);
      });
  };

  // const history = useHistory();
  const favs = useSelector((store) => store.getFavorites);
  //console.log("this is favs", favs);

  const listCategory = (category_id) => {
    switch (category_id) {
      case 1:
        return "Funny";
      case 2:
        return "Cohort";
      case 3:
        return "Cartoon";
      case 4:
        return "NSFW";
      case 5:
        return "Meme";
      default:
        "No category selected yet";
    }
  };

  return (
    <div className="body">
      <header>
        <h1>Favorites</h1>
      </header>
      <div className="drop-down">
        <label for="category">Add a category:</label>
        <select
          id="category"
          name="category"
          value={categorySelection}
          onChange={(e) => setCategorySelection(e.target.value)}
        >
          <option value="1">funny</option>
          <option value="2">cohort</option>
          <option value="3">cartoon</option>
          <option value="4">nsfw</option>
          <option value="5">meme</option>
        </select>
      </div>
      <div className="allFavorites">
        {favs.map((gif, index) => (
          <div className="gif-container" key={index}>
            <div className="img">
              <img src={gif.url} />
            </div>
            <div className="info">
              <h3 className="current-cat">
                Current Category:
                <span className="cat">{listCategory(gif.category_id)}</span>
              </h3>
              <button
                className="cat-btn"
                onClick={() => setCategory(gif.id, categorySelection)}
              >
                Add Category
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
