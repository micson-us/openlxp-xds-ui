import React from 'react'
import ExperienceCard from '../ExperienceCard/ExperienceCard'

const landingPage = (props) => {

    const landingHeader = "Enterprise Course Catalog*"
    const landingSubHeader = "This catalog lets you search for all DoD \
        unclassified training and education courses, seminars, instructional \
        resources and more."
    const placeholderText = ''

    return (
        <div className="row landing-section">
            <h2>{landingHeader}</h2>
            <h5>{landingSubHeader}</h5>
            <div className="row">
                <input className="search" type="text" 
                    placeholder={placeholderText} />
                <button className="btn" type="button">Search</button>
            </div>
            <div className="row page-break">
            </div>
            <div className="row">
                <h4>Popular</h4>
                <ExperienceCard />
            </div>
        </div>
    )
}

export default landingPage;
