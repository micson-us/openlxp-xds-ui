import React from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import FilterGroup from './FilterGroup/FilterGroup';
import ExpPreviewPanel from './ExpPreviewPanel/ExpPreviewPanel';
import dummyJSON from '../../resources/dummy.json';

const SearchResultPage = (props) => {
    const jsonObj = dummyJSON;
    const numOfResults = 100;
    let location = useLocation();
    const parsedQuery = queryString.parse(location.search);
    const filterGroups = [
        {
            title: "Personnel Type",
            values: ["Officer", "Enlisted", "Contractor", "Civilian"]
        },
        {
            title: "Pay Grade",
            values: ["0-1", "0-2", "0-3", "0-4"]
        },
        {
            title: "Component",
            values: ["Army", "Navy", "Air Force", "Marine Corps"]
        },
    ]

    return (
        <div className="content-section">
            <div className="row">
                <h2>{numOfResults + ' results for "' + parsedQuery.q + '"'}</h2>
            </div>
            <div className="row">
                <div className="col span-1-of-5 filter-panel">
                    {filterGroups.map((group, idx) => {
                        return (
                            <FilterGroup groupObj={group} key={idx} />
                        )
                    })}
                </div>
                <div className="col span-4-of-5 results-panel">
                    {jsonObj.map((exp, idx) => {
                        return (
                            <ExpPreviewPanel expObj={exp} key={idx} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage;
