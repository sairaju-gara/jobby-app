import { Link } from "react-router-dom";

import Header from "../Header";
import "./index.css";

const Home = () => (
  <>
    <Header />
    <div className="home-con">
      <h1 className="home-header">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-desc">
        Millions of people are searching for jobs, salary <br />
        information, company reviews. Find the job that fits your <br />
        abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="find-jobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
);

export default Home;
