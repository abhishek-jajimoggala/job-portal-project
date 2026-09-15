import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const searchKeyword = keyword.trim();
    const searchLocation = location.trim();

    navigate(
      `/jobs?keyword=${encodeURIComponent(
        searchKeyword
      )}&location=${encodeURIComponent(
        searchLocation
      )}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-3 rounded-4 shadow-lg"
    >
      <div className="row g-2 align-items-center">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Skills, Designations, Companies"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
          >
            Search
          </button>
        </div>

      </div>
    </form>
  );
}

export default SearchBar;