import { useSelector, useDispatch } from "react-redux";

export default function Favorites() {
  const favs = useSelector((store) => store.getFavorites);
  console.log("this is favs", favs);

  return (
    <>
      <h1>Favorites</h1>
      {favs.map((gif, index) => (
        <div>
          <img src={gif.images.original.url} />
          <button>Add Category</button>
        </div>
      ))}
    </>
  );
}
