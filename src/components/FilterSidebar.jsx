function FilterSidebar({
  location,
  setLocation,
  experience,
  setExperience
}) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-body">

        <h5 className="fw-bold mb-3">
          Filters
        </h5>

        <div className="mb-3">
          <label className="form-label">
            Location
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Experience
          </label>

          <select
            className="form-select"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
          >
            <option value="">
              All
            </option>

            <option value="1">
              1+ Years
            </option>

            <option value="2">
              2+ Years
            </option>

            <option value="3">
              3+ Years
            </option>

          </select>
        </div>

      </div>

    </div>
  );
}

export default FilterSidebar;