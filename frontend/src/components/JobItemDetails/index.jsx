import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import { FaMapMarkerAlt, FaBriefcase, FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import Header from "../Header";
import SkillsCard from "../SkillsCard";
import SimilarJobs from "../SimilarJobs";

import "./index.css";

const apiStatusConstants = {
  intial: "INTIAL",
  apiSuccessView: "SUCCESS",
  apiFaliureView: "FAILURE",
  apiLoadingView: "IN_PROGRESS",
};

const JobItemDetails = () => {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [similarJobData, setSimilarJobData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.intial);

  const getJobData = async () => {
    setApiStatus(apiStatusConstants.apiLoadingView);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${import.meta.env.VITE_API_URL}/jobs/${jobId}`;

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (res.ok) {
        const data = await res.json();

        setJobData(data.jobData);
        setSimilarJobData(data.jobData.similarJobs);
        setApiStatus(apiStatusConstants.apiSuccessView);
      } else {
        setApiStatus(apiStatusConstants.apiFaliureView);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.apiFaliureView);
    }
  };

  useEffect(() => {
    getJobData();
  }, [jobId]);

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots height={50} width={50} radius={5} color="#ffffff" visible />
    </div>
  );

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={getJobData}>
        Retry
      </button>
    </div>
  );

  const renderJobsSuccessView = () => {
    if (!jobData) return null;

    const {
      companyLogoUrl,
      company,
      skills,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData;

    return (
      <>
        <div className="job-con">
          <div className="role-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-and-visit-btn-con">
            <h1 className="desc">Description</h1>
            <a href={company.companyWebsiteUrl}>
              <button type="button" className="visit-btn">
                Visit <FiExternalLink />
              </button>
            </a>
          </div>
          <p className="job-desc">{jobDescription}</p>
          <h1 className="skills-header">Skills</h1>
          <ul className="skills-con">
            {skills.map((skill) => (
              <SkillsCard skillDetails={skill} key={skill.name} />
            ))}
          </ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="lifeAtCompany-con">
            <p className="life-at-company-desc">{company.description}</p>
            <img
              src={company.imageUrl}
              className="about-company-img"
              alt="life at company"
            />
          </div>
        </div>

        <div className="app-similar-job-con">
          <h1 className="similar-jobs">Similar Jobs</h1>
          <ul className="similar-job-list-con">
            {similarJobData &&
              similarJobData.map((job) => (
                <SimilarJobs key={job._id} similarDetails={job} />
              ))}
          </ul>
        </div>
      </>
    );
  };

  const renderAllJobsView = () => {
    switch (apiStatus) {
      case apiStatusConstants.apiSuccessView:
        return renderJobsSuccessView();
      case apiStatusConstants.apiFaliureView:
        return renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="job-item-container">{renderAllJobsView()}</div>
    </>
  );
};

export default JobItemDetails;
