import React from 'react';

const experienceCard = (props) => {

    return (
        <div className="col span-1-of-4 box">
        <img src={props.courseObj.CourseThumbnail} alt="test" />
            <div className="card-detail">
                <b><a href="www.google.com">
                    {props.courseObj.Course.CourseTitle}
                </a></b>
                <div className="icon-section">
                    <div className="icon-block">
                        <ion-icon name="business-outline"></ion-icon>
                    </div>
                    <div className="course-highlights">
                        {props.courseObj.Course.CourseProviderName}
                    </div>
                </div>
                <div>
                    <div className="icon-block">
                        <ion-icon name="archive-outline"></ion-icon>
                    </div>
                    <div className="course-highlights">
                        {props.courseObj.Course.DepartmentName}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default experienceCard;
