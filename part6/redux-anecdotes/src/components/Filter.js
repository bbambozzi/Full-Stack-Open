// filter
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleUserFilterChange = (event) => {
    const newValue = event.target.value;
    dispatch(setFilter(newValue));
  };

  const userFilterStyle = {
    marginBottom: "15px",
  };

  return (
    <>
      <input
        style={userFilterStyle}
        name="userFilter"
        onChange={handleUserFilterChange}
      ></input>
    </>
  );
};

export default Filter;
