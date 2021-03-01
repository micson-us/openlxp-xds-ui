import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import Loader from "react-loader-spinner";
import FilterGroup from './FilterGroup/FilterGroup';
import ExpPreviewPanel from './ExpPreviewPanel/ExpPreviewPanel';
import dummyJSON from '../../resources/dummy.json';

const SearchResultPage = (props) => {
    const [coursesState, setCoursesState] = useState({
        coursesObj: null,
        isLoading: false,
        error: null
    });

    const jsonObj = dummyJSON;
    let location = useLocation();
    const parsedQuery = queryString.parse(location.search);
    console.log(parsedQuery)
    const api_url = 'http://localhost:8080/es_api/?keyword='
    const url = api_url + parsedQuery.kw
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
    const imgArr = [
        'https://www.abc.net.au/news/image/12739630-3x2-940x627.jpg',
        'https://hub.packtpub.com/wp-content/uploads/2018/05/programming.jpg',
        'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto'
        + '=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto'
        + '=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        'https://images.pexels.com/photos/2041629/pexels-photo-2041629.jpeg?'
        + 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ]
    let expPanelContent = null;
    let numResultsContent = (
        <div className="row">
            <h2>{0 + ' results for "' + parsedQuery.kw + '"'}</h2>
        </div>
    )

    useEffect(() => {
        setCoursesState(previousState => {
            const resultState = {
                coursesObj: null,
                isLoading: true,
                error: null
            }
            return resultState
        });
        axios.get(url)
            .then(response => {
                console.log(response.data)
                setCoursesState(previousState => {
                    return {
                        coursesObj: response.data,
                        isLoading: false,
                        error: null
                    }
                });
            })
            .catch(err => {
                console.log(err)
                setCoursesState(previousState => {
                    return {
                        coursesObj: null,
                        isLoading: false,
                        error: err
                    }
                })
            });
    }, [])

    if (coursesState.coursesObj && !coursesState.isLoading) {
        expPanelContent = (
            coursesState.coursesObjmap((exp, idx) => {
                if (coursesState.coursesObj[idx] !== null) {
                    return (
                        <ExpPreviewPanel
                            expObj={exp}
                            key={idx}
                            imgLink={imgArr[idx]} />
                    )
                } else {
                    return (
                        <ExpPreviewPanel
                            expObj={exp}
                            key={idx}
                            imgLink={'https://images.pexels.com/photos/'
                                + '207691/pexels-photo-207691.jpeg?auto='
                                + 'compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
                        />
                    )
                }
            })
        )

        numResultsContent = (
            <div className="row">
                <h2>{coursesState.coursesObj.total +
                    ' results for "' + parsedQuery.kw + '"'}</h2>
            </div>
        )
    } else if (coursesState.error && !coursesState.isLoading) {
        expPanelContent = <div>Error Loading experiences.</div>
    } else {
        expPanelContent = <div>Loading...</div>
    }

    let mainPageContent = (
        <>
            {numResultsContent}
            <div className="row">
                <div className="col span-1-of-5 filter-panel">
                    {filterGroups.map((group, idx) => {
                        return (
                            <FilterGroup groupObj={group} key={idx} />
                        )
                    })}
                </div>
                <div className="col span-4-of-5 results-panel">
                    {expPanelContent}
                </div>
            </div>
        </>
    )

    const overlay = (
        <div className='content-overlay'>
            <div className='spinner-section'>
                <Loader type="Rings" color="#00BFFF" height={80} width={80} />
            </div>
        </div>
    )

    return (
        <div className="content-section">
            {mainPageContent}
            {coursesState.isLoading === true ? overlay : ''}
        </div>
    )
}

export default SearchResultPage;
