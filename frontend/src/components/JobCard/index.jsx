import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaStar } from "react-icons/fa";

import "./index.css";

const JobCard = (props) => {
  const { jobData } = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    _id,
  } = jobData;
  return (
    <li className="job-con">
      <Link to={`/jobs/${_id}`}>
        <div className="role-con">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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
        <p className="job-desc">{jobDescription}</p>
      </Link>
    </li>
  );
};
export default JobCard;
