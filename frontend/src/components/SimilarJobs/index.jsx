import { FaMapMarkerAlt, FaBriefcase, FaStar } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const SimilarJobs = (props) => {
  const [showMore, setShowMore] = useState(false);
  const { similarDetails } = props;

  const {
    _id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    rating,
  } = similarDetails;
  const toggleView = () => setShowMore((prev) => !prev);
  return (
    <li className="similar-job-container">
      <Link to={`/jobs/${_id}`}>
        <div className="role-con">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div>
            <h1 className="role">{title}</h1>
            <p className="vaccancies">
              <FaStar style={{ marginRight: "8px" }} />
              {rating}
            </p>
          </div>
        </div>
        <div className="location-salary-con">
          <div className="location-employmentType">
            <p className="location-salary-details">
              <FaMapMarkerAlt style={{ marginRight: "8px" }} />
              {location}
            </p>
            <p className="location-salary-details">
              <FaBriefcase style={{ marginRight: "8px" }} />
              {employmentType}
            </p>
          </div>
          <p className="location-salary-details">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="desc">Description</h1>
        <p className={showMore ? "similar-job-desc" : "view-less-job-desc"}>
          {jobDescription}
        </p>
        <button
          className="view-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleView();
          }}
        >
          {showMore ? "View Less" : "View More"}
        </button>
      </Link>
    </li>
  );
};

export default SimilarJobs;
