import React from 'react'
import ExperienceCard from '../ExperienceCard/ExperienceCard'

const landingPage = (props) => {

    const landingHeader = "Enterprise Course Catalog*"
    const landingSubHeader = "This catalog lets you search for all DoD "
        + "unclassified training and education courses, seminars, instructional"
        + " resources and more."
    const placeholderText = '';
    const max_cards = 4;
    const dummy_json = [
        {
            Course: {
                CourseCode: "OA-ao_ameu_a01_it_enus",
                CourseType: "Test",
                CourseTitle: "VCAT Southeast Asia 1.1 - (6 hrs)",
                CourseAudience: "WHS and OSD End-Users.",
                DepartmentName: "Marine Corps",
                CourseDescription: "Node.js is a server-side framework that uses an \
                event driven asynchronous model and is built on the Google \
                Chrome V8 JavaScript runtime engine. This course demonstrates \
                how to install Node.js, work with Node.js modules, build a \
                basic web server, and manage files and directories using \
                Node.js applications.",
                CourseProviderName: "DAU",
                EducationalContext: "Mandatory",
                CourseSectionDeliveryMode: "JKO"
            },
            CourseThumbnail:
                "https://www.abc.net.au/news/image/12739630-3x2-940x627.jpg"
        },
        {
            Course: {
                CourseCode: "LDR-pc_ch_lach005",
                CourseType: "WBT",
                CourseTitle: "Reactive Programming Methods",
                CourseAudience: "MIL/CIV/OTHER",
                DepartmentName: "AF",
                CourseDescription: "Share your notes with friends and colleagues \
                with Evernote's collaboration features. Discover how to email \
                a note, share notes via a link, share notes on social networks\
                , use the chat function, and present notes.",
                CourseProviderName: "DAU",
                EducationalContext: "",
                CourseSectionDeliveryMode: "CAI"
            },
            CourseThumbnail:
                "https://hub.packtpub.com/wp-content/uploads/2018/05/" +
                "programming.jpg"
        },
        {
            Course: {
                CourseCode: "OA-mo_bwrd_a06_dt_enus",
                CourseType: "REQ VIEWING",
                CourseTitle: "Choosing and Preparing Your Delegate",
                CourseAudience: "CIV/CONTR/OTHER",
                DepartmentName: "Marine Corps",
                CourseDescription: "Workplace violence is the threat of \
                    physical violence, harassment, intimidation, or other \
                    threatening behavior that may occur at the work location. \
                    It can affect and involve employees, clients, customers, \
                    and visitors. So it is essential to have a clearly",
                CourseProviderName: "DAU",
                EducationalContext: "",
                CourseSectionDeliveryMode: "CMS"
            },
            CourseThumbnail:
                "https://images.pexels.com/photos/256541/pexels-photo-256541"
                    + ".jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            Course:{
                CourseCode:"EPME6420AA",
                CourseType:"",
                CourseTitle:"Oracle GoldenGate 12c: Troubleshooting and Tuning",
                CourseAudience:"Mortuary Affairs Officers identified by the \
                    SCJ4 at each of the USSOUTHCOM AOR countries.",
                DepartmentName:"USSOUTHCOM",
                CourseDescription:"The purpose of this course is to provide an "
                    + "entry level (Level 1) hybrid course designed to better "
                    + "prepare responders for incidents involving weapons of mass "
                    + "destruction. CBRNE ALERT is an online course that " 
                    + "includes three introductory courses: Biology, Chemistry,"
                    + " and Radiology. The biology course describes the "
                    + "characteristics of living organisms and the different "
                    + "levels of biological safety as it applies to "
                    + "microbiology and recombinant DNA laboratories; "
                    + "differentiating between atoms, molecules, elements, and "
                    + "compounds and their importance in biologic systems. The "
                    + "chemistry course focuses on atomic structure; periodic "
                    + "properties, chemical bonding, chemical structure, "
                    + "molecular forces, types of chemical reactions, "
                    + "stoichiometry, chemical kinetics, chemical equilibria, "
                    + "and acids and bases in relation to CBRN identification "
                    + "and analysis. The radiology course focuses on defining "
                    + "basic radiation terms such as alpha, beta, and gamma "
                    + "rays; describing concepts that affect radiation dose "
                    + "such as radioactive activity, radiation exposure, dose "
                    + "equivalence and distinguishing the origin of various "
                    + "sources of radiation emitted from the ground, building "
                    + "materials, water and food, etc.",
                CourseProviderName:"DAU",
                EducationalContext:"Mandatory",
                CourseSectionDeliveryMode:"CMS"
            },
            CourseThumbnail:
                "https://images.pexels.com/photos/442150/pexels-photo-442150"
                    + ".jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            Course:{
                CourseCode:"BUS-pc_bi_spbi007",
                CourseType:"",
                CourseTitle:"Strengths, Weaknesses, Opportunities and Risks",
                CourseAudience:"OWS",
                DepartmentName:"DSS/CDSE",
                CourseDescription:"Explore how to set up policy-based NAT on a"
                    + "Cisco ASA, ASDM configuration details, and how to verify"
                    + "the configuration.",
                CourseProviderName:"DAU",
                EducationalContext:"Non - Mandatory ",
                CourseSectionDeliveryMode:"CMI"
            },
            CourseThumbnail: 
                "https://images.pexels.com/photos/2041629/pexels-photo-2041629"
                    + ".jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
    ]

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
                <div className='row card-section'>
                    {dummy_json.map((course, idx) => {
                        return (
                            <ExperienceCard courseObj={course} key={idx} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default landingPage;
