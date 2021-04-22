import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import no_img from "../../resources/vendors/img/no-image2.png";

const ExperienceCard = (props) => {
  // Random number gen for styling cards
  const generateRandomNumber = (max) => {
    return Math.round(Math.random() * max);
  };

  let result = (
    <div className="col span-1-of-4 box">Error Loading Course Card.</div>
  );

  let courseThumbnail
  // courseThumbnail = no_img;
  const { configuration } = useSelector((state) => state.configuration);
  const backendHost = process.env.REACT_APP_BACKEND_HOST;
  // default style if no image is provided
  let style = {
    backgroundColor: "rgb(243 243 243)",
  };

  // if configuration is loaded and there is an image fallback, use that
  if (configuration && configuration.course_img_fallback) {
    courseThumbnail = backendHost + configuration.course_img_fallback;
    style = null;
  }

  // override the default img if one is passed in
  if (
    props.courseObj &&
    props.courseObj.Technical_Information &&
    props.courseObj.Technical_Information.Thumbnail
  ) {
    courseThumbnail = props.courseObj.Technical_Information.Thumbnail;
    style = null;
  }

  // Only display a card if the course object is not null
  if (props.courseObj && props.courseObj.Course) {
    let defaultImg = (
      <img src={courseThumbnail} alt="Course thumbnail" style={style} />
    );

    let altImg = (
      <div
        style={{
          // Generating a unique linear gradient
          backgroundImage: `linear-gradient(${generateRandomNumber(
            270
          )}deg, #2f6194 ${generateRandomNumber(50)}%, #0b3d70)
      `,
          height: "175px",
          width: "100%",
          color: "#fff",
          textAlign: "center",
          paddingTop: "30%",
          fontSize: "1rem",
        }}
      >
        No Image Available
      </div>
    );

    result = (
      <div className="col span-1-of-4 box">
        {courseThumbnail ? defaultImg : altImg}
        <div className="card-detail">
          <div className="row card-title">
            <b>
              <Link
                to={{
                  pathname: "/course/" /*+ props.courseObj.meta.id*/,
                  state: {
                    expObj: props.courseObj,
                    imgLink: courseThumbnail,
                  },
                }}
              >
                {props.courseObj.Course.CourseTitle
                  ? props.courseObj.Course.CourseTitle
                  : "Missing Course Title"}
              </Link>
            </b>
          </div>

          <div className="icon-section">
            <div className="icon-block">
              <ion-icon name="business-outline"></ion-icon>
            </div>
            <div className="course-highlights">
              {props.courseObj.Course.CourseProviderName
                ? props.courseObj.Course.CourseProviderName
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="icon-block">
              <ion-icon name="archive-outline"></ion-icon>
            </div>
            <div className="course-highlights">
              {props.courseObj.Course.DepartmentName
                ? props.courseObj.Course.DepartmentName
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return result;
};

export default ExperienceCard;
