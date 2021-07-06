import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CourseImage from "./CourseImage/CourseImage";
import CourseButton from "./CourseButton/CourseButton";
import CourseDetails from "./CourseDetails/CourseDetails";
import CourseDescription from "./CourseDescription/CourseDescription";
import RelatedCourses from "./RelatedCourses/RelatedCourses";

const CourseInformation = (props) => {
  // Getting the current location and the data
  const location = useLocation();
  let imgLink;
  // gets the courseID path param from the URL
  let { courseID } = useParams();

  // The base url for the back end
  const api_url = process.env.REACT_APP_ES_MLT_API;
  const course_api_url = process.env.REACT_APP_COURSES_API;

  // Inits the related courses
  const [relatedCourses, setRelatedCourses] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  // Inits the fetched course
  const [courseObj, setCourseObj] = useState({
    data: null,
    isLoading: false,
    error: null,
  })

  //  Fetch single course from the backend
  useEffect(() => {
    setCourseObj({ data: null, isLoading: true, error: null });

    // Making call to back end for related courses
    axios
      .get(course_api_url + courseID)
      .then((resp) => {
        setCourseObj({
          data: resp.data,
          isLoading: false,
          error: null,
        });

        setRelatedCourses({ data: null, isLoading: true, error: null });

        // Making call to back end for related courses
        axios
          .get(api_url + resp.data.meta['metadata_key_hash'])
          .then((relatedResp) =>
            setRelatedCourses({
              data: relatedResp.data,
              isLoading: false,
              error: null,
            })
          )
          .catch((err) => {
            setRelatedCourses({
              data: null,
              isLoading: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        setCourseObj({
          data: null,
          isLoading: false,
          error: err,
        });
      });
  }, [courseID, course_api_url]);

// Get the global config
const { configuration } = useSelector((state) => state.configuration);

// List of icons that come from the backend
const icons = {
  user: "person-outline",
  clock: "time-outline",
  calendar: "calendar-outline",
  location: "location-outline",
  hourglass: "hourglass-outline",
  multi_users: "people-outline",
};

// Returns the icon name to use from backend config
const getIconNameToUse = (name) =>
  icons[name] ? icons[name] : icons["calendar"];

// Return the value of specific detail.

const getCourseDataMapping = (strKey, data) => {
  // gets the keys for the data mapping
  const objKeys = strKey.split(".");

  // inits with all the data
  let valueToReturn = data;

  // Reduces it down to the specific value
  objKeys.forEach((key) => {
    if (valueToReturn) {
      valueToReturn = valueToReturn[key];
    }
  });
  // Returning the desired value.
  return valueToReturn;
};

// Get the global config
// const { configuration } = useSelector((state) => state.configuration);

let courseInfo = {};
let courseDetails = undefined;
let courseDisplay;

// Wait for the configuration to be available.
if (configuration && courseObj.data) {
  // Get the icon to render
  courseDetails = configuration.course_highlights.map((item, index) => {
    return {
      icon: getIconNameToUse(item.highlight_icon),
      name: item.display_name,
      value: getCourseDataMapping(item.field_name, courseObj.data) || "",
    };
  });

  // gets the course information mappings
  const courseDataMappings = configuration.course_information;
  courseInfo = {
    title: getCourseDataMapping(courseDataMappings.course_title,
      courseObj.data),
    url: getCourseDataMapping(courseDataMappings.course_url, courseObj.data),
    desc: getCourseDataMapping(
      courseDataMappings.course_description,
      courseObj.data
    ),
  };

  imgLink = (courseObj.data.Technical_Information &&
    courseObj.data.Technical_Information.Thumbnail) ?
    courseObj.data.Technical_Information.Thumbnail :
    configuration.course_img_fallback
}

if (courseObj.isLoading) {
  courseDisplay = <div>Loading...</div>
} else if (courseObj.data && !courseObj.isLoading) {
  courseDisplay = (
    <div className="inner-content">
      <h2>{courseInfo.title}</h2>
      <div className="row">
        <div className="col span-2-of-5">
          <CourseImage img={imgLink} />
          <CourseButton url={courseInfo.url} />
        </div>
        <div className="col span-3-of-5">
          <CourseDetails details={courseDetails} />
        </div>
      </div>
      <CourseDescription desc={courseInfo.desc} />
    </div>
  )
} else {
  courseDisplay =
    <div>Error loading course. Please contact and administrator</div>
}

return (
  <div className="content-section">
    <div className="row content-panel course-detail">
      {courseDisplay}
      {relatedCourses.data ? (
        <RelatedCourses data={relatedCourses.data} /> // If the data is not there
      ) : (
        <div>Loading...</div>
      )}
    </div>
  </div>
);
};

export default CourseInformation;
