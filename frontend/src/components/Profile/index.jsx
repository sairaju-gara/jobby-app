import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import "./index.css";

const apiStatusConstants = {
  intial: "INTIAL",
  apiSuccessView: "SUCCESS",
  apiFaliureView: "FAILURE",
  apiLoadingView: "IN PROGRESS",
};

const Profile = () => {
  const [profiledata, setProfiledata] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.intial);

  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    setApiStatus(apiStatusConstants.apiLoadingView);
    const jwtToken = Cookies.get("jwt_token");
    const apiurl = `${import.meta.env.VITE_API_URL}/jobbyapp/profile`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const res = await fetch(apiurl, options);
    if (res.ok === true) {
      const data = await res.json();
      setProfiledata({
        name: data.profileDetails.name,
        profileImageUrl: data.profileDetails.profileImageUrl,
        email: data.profileDetails.email,
      });
      setApiStatus(apiStatusConstants.apiSuccessView);
    } else {
      setApiStatus(apiStatusConstants.apiFaliureView);
    }
  };

  const renderLoadingView = () => (
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

  const renderFailureView = () => (
    <button type="button" className="retry-btn" onClick={getprofile}>
      Retry
    </button>
  );

  const renderSuccessProfileView = () => {
    const { name, profileImageUrl, email } = profiledata;

    return (
      <div className="profile-con">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-desc">{email}</p>
      </div>
    );
  };

  const renderProfileView = () => {
    switch (apiStatus) {
      case apiStatusConstants.apiSuccessView:
        return renderSuccessProfileView();
      case apiStatusConstants.apiFaliureView:
        return renderFailureView();
      case apiStatusConstants.apiLoadingView:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <>{renderProfileView()}</>;
};

export default Profile;
