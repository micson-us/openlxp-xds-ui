import React from 'react';

const ExpPreviewCard = (props) => {

    return (
        <div className="row exp-panel">
            <div className="col span-1-of-4">
                <img src={props.imgLink} alt="test" />
            </div>
            <div className="col span-3-of-4">
                <div className="row exp-title">
                    <b><a href="www.google.com">
                        {props.expObj.Course.CourseTitle}
                    </a></b>
                </div>
                <div className="row exp-desc">
                    {props.expObj.Course.CourseDescription}
                </div>
                <div className="row exp-provider">
                    {props.expObj.Course.CourseProviderName}
                </div>
            </div>

        </div>
    )
}

export default ExpPreviewCard;
