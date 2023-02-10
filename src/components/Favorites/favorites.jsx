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
    <>
      <h1>Favorites</h1>
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
      {favs.map((gif, index) => (
        <div key={index}>
          <ul>
            <li>
              <h3>{gif.title}</h3>
            </li>
            <li>
              <img src={gif.url} />
            </li>
            <li>
              <h3>Current category: {listCategory(gif.category_id)}</h3>
            </li>
            <li>
              <button onClick={() => setCategory(gif.id, categorySelection)}>
                Add category
              </button>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
