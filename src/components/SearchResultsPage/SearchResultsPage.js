import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import Loader from "react-loader-spinner";
import FilterGroup from './FilterGroup/FilterGroup';
import ExpPreviewPanel from './ExpPreviewPanel/ExpPreviewPanel';
// import dummyJSON from '../../resources/dummy.json';

const getParsedQuery = (location) => {
    const parsedQuery = queryString.parse(location.search);
    //console.log(parsedQuery)
    return parsedQuery.kw
}

const SearchResultPage = (props) => {
    const [coursesState, setCoursesState] = useState({
        coursesObj: null,
        isLoading: false,
        error: null
    });


    const [searchInputState, setSearchInputState] = useState({
        input: ''
    });

    // const jsonObj = dummyJSON;
    let location = useLocation();
    const api_url = 'http://localhost:8080/es_api/?keyword='
    const parsedQuery = getParsedQuery(location);
    const placeholderText = "Search for anything"
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
            <h2>{0 + ' results for "' + parsedQuery + '"'}</h2>
        </div>
    )

    useEffect(() => {
        let url = api_url + parsedQuery;
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
    }, [location.search])

    useEffect(() => {
        setSearchInputState(previousState => {
            //console.log(parsedQuery)
            return { input: parsedQuery }
        })
    }, [])

    if (coursesState.coursesObj && !coursesState.isLoading) {
        if (coursesState.coursesObj.total < 1) {
            expPanelContent =
                <h3 className='informational-text'>
                    Sorry, we couldn't find any results for "{parsedQuery}"
                </h3>
        } else {
            expPanelContent = (
                coursesState.coursesObj.hits.map((exp, idx) => {
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
        }


        numResultsContent = (
            <div className="row">
                <h2>{coursesState.coursesObj.total +
                    ' results for "' + parsedQuery + '"'}</h2>
            </div>
        )
    } else if (coursesState.error && !coursesState.isLoading) {
        expPanelContent =
            <div className='informational-text'>Error Loading experiences.</div>
    } else {
        expPanelContent = (
            <div className='spinner-section'>
                <Loader type="Rings" color="#c7c7c7" height={80} width={80} />
            </div>
        )
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
                    <div className="row">
                        <div className='input-with-icon'>
                            <input className="search" type="text"
                            placeholder={placeholderText}
                            value={searchInputState.input}
                            onChange={event => {
                                const newVal = event.target.value;
                                setSearchInputState(previousState => {
                                    return { input: newVal }
                                })
                            }} />
                        <Link
                            to={{
                                pathname: "/search/",
                                search: "?kw=" + searchInputState.input
                            }}
                            className="btn">
                                <ion-icon name="search-outline"></ion-icon>
                            </Link>
                        </div>
                        
                    </div>
                    {expPanelContent}
                </div>
            </div>
        </>
    )

    const overlay = (
        <>
            <div className='content-overlay'>
            </div>
        </>
    )

    return (
        <div className="content-section">
            {mainPageContent}
            {coursesState.isLoading === true ? overlay : ''}
        </div>
    )
}

export default SearchResultPage;
