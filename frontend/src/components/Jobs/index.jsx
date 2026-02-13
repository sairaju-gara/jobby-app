import { Component } from "react";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import JobCard from "../JobCard";
import Header from "../Header";
import Profile from "../Profile";
import FilterGroup from "../FilterGroup";
import "./index.css";

const apiStatusConstants = {
  intial: "INTIAL",
  apiSuccessView: "SUCCESS",
  apiFaliureView: "FAILURE",
  apiLoadingView: "IN PROGRESS",
  apiNoJobsFoundView: "No Products",
};

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

class Jobs extends Component {
  state = {
    activeSalaryRangeId: "",
    activeEmploymentTypeId: [],
    jobData: [],
    searchInput: "",
    apiStatus: apiStatusConstants.intial,
  };

  componentDidMount = () => {
    this.getJobDetails();
  };

  changeSalaryRangeId = (newSalary, checked) => {
    if (checked) {
      this.setState(
        {
          activeSalaryRangeId: newSalary,
        },
        this.getJobDetails,
      );
    } else {
      this.setState(
        {
          activeSalaryRangeId: "",
        },
        this.getJobDetails,
      );
    }
  };

  noJobsFoundView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="nojobs-img"
        alt="no jobs"
      />
      <h1 className="nojobs-header">No Jobs Found</h1>
      <p className="nojobs-msg">
        We could not find any jobs. Try other filters
      </p>
    </div>
  );

  changeEmploymentTypeId = (newType, checked) => {
    if (checked) {
      this.setState(
        (prev) => ({
          activeEmploymentTypeId: [...prev.activeEmploymentTypeId, newType],
        }),
        this.getJobDetails,
      );
    } else {
      this.setState(
        (prev) => ({
          activeEmploymentTypeId: prev.activeEmploymentTypeId.filter(
            (each) => each !== newType,
          ),
        }),
        this.getJobDetails,
      );
    }
  };

  getJobDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.apiLoadingView });
    const { activeEmploymentTypeId, activeSalaryRangeId, searchInput } =
      this.state;
    const activeEmploymentTypeIdList = activeEmploymentTypeId.join(",");
    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = `${import.meta.env.VITE_API_URL}/jobs/getJobsdata?employment_type=${activeEmploymentTypeIdList}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const res = await fetch(apiUrl, options);
    if (res.ok === true) {
      const data = await res.json();

      if (data.jobsData.length === 0) {
        this.setState({ apiStatus: apiStatusConstants.apiNoJobsFoundView });
        return;
      }

      this.setState({
        jobData: data.jobsData,
        apiStatus: apiStatusConstants.apiSuccessView,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.apiFaliureView });
    }
  };

  changeSearchInput = (e) => this.setState({ searchInput: e.target.value });

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots
        height={50}
        width={50}
        radius={5}
        color="#ffffff"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );

  renderFailureView = () => (
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
      <button type="button" className="retry-btn" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  );

  renderAllJobsView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.apiSuccessView:
        return this.renderJobsSuccessView();
      case apiStatusConstants.apiFaliureView:
        return this.renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return this.renderLoadingView();
      case apiStatusConstants.apiNoJobsFoundView:
        return this.noJobsFoundView();
      default:
        return null;
    }
  };

  renderJobsSuccessView = () => {
    const { jobData } = this.state;
    return (
      <ul className="job-cards-con">
        {jobData.map((eachJob) => (
          <JobCard key={eachJob._id} jobData={eachJob} />
        ))}
      </ul>
    );
  };

  render() {
    const { activeEmploymentTypeId, activeSalaryRangeId } = this.state;
    return (
      <div className="jobs-con">
        <Header />
        <div className="job-section-con">
          <div className="profile-and-filters-container">
            <div className="profile-wrapper-container">
              <Profile />
            </div>
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              activeEmploymentTypeId={activeEmploymentTypeId}
              changeEmploymentTypeId={this.changeEmploymentTypeId}
              changeSalaryRangeId={this.changeSalaryRangeId}
              activeSalaryRangeId={activeSalaryRangeId}
            />
          </div>
          <div className="jobs-content-container">
            <div className="search-bar-wrapper">
              <div className="search-con">
                <input
                  type="search"
                  className="search-ele"
                  onChange={this.changeSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon"
                  onClick={this.getJobDetails}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="render-all-jobs-container">
              {this.renderAllJobsView()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
