import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageWrapper from "../common/PageWrapper";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchInput from "../common/inputs/SearchInput";
import InterestList from "./InterestList/InterestList";

export default function SearchInterestLists() {
  const history = useHistory();

  const [origionalInterestLists, setOriginalInterestLists] = useState([]);
  const [interestLists, setInterestLists] = useState([]);
  const [subscribedLists, setSubscribedLists] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { configuration } = useSelector((state) => state.configuration);
  const { user } = useSelector((state) => state.user);

  // chunks array into sub chunks
  const chunkArray = (arr) => {
    let chunked = [];

    // copy the array
    let arrayCopy = [...arr];

    // while there is more to chunck.... just keep chunking
    while (arrayCopy.length > 0) {
      chunked.push(
        arrayCopy.splice(0, configuration?.search_results_per_page || 10)
      );
    }

    // the array of array's chuncked to have at most the desired size
    return chunked;
  };

  const filterArray = (origionalArr) => {
    const array = [...origionalArr];

    if (array) {
      return array.filter(
        ({ name, owner }) =>
          name?.includes(search) ||
          owner.first_name.includes(search) ||
          owner.last_name.includes(search)
      );
    }
  };

  // On load...
  useEffect(async () => {
    if (user) {
      // get all the lists from the backend
      axios
        .get(process.env.REACT_APP_INTEREST_LISTS_ALL)
        .then((resp) => {
          // saving the data
          setOriginalInterestLists(resp.data);
          // chunking the array
          const chunked = chunkArray(resp.data);
          setInterestLists(chunked);
        })
        .catch((err) => {
          console.log(err);
        });

      const url = `${process.env.REACT_APP_USER_SUBSCRIPTION_LISTS}`;
      let header = {
        Authorization: "Token " + user.token,
      };
      axios
        .get(url, { headers: header })
        .then((resp) => {
          // checking if a user is subscribed to this list
          setSubscribedLists(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/");
    }
  }, []);

  // On update of search
  useEffect(() => {
    const filteredLists = filterArray(origionalInterestLists);
    const chunckedLists = chunkArray(filteredLists);
    setInterestLists(chunckedLists);
  }, [search]);

  return (
    <PageWrapper>
      <div className='pt-10'>
        <SearchInput
          queryValue={search}
          placeholder={"Search for interest lists"}
          handleChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-row justify-end gap-4 my-2 pb-2">
        <div
          className={`${
            page < 1 && "invisible"
          } bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setPage(page - 1);
          }}>
          prev
        </div>
        <div className="select-none">{page + 1}</div>
        <div
          className={`${
            page === interestLists?.length - 1 && "invisible"
          } bg-base-blue text-white px-2 rounded-md select-none cursor-pointer`}
          onClick={() => {
            setPage(page + 1);
          }}>
          next
        </div>
      </div>

      <div className="space-y-6 pb-10">
        {interestLists[page]?.map((list,index) => {
          if (!subscribedLists.find((slist) => slist.id === list.id)) {
            return (
              <InterestList key={index}
                title={list.name}
                owner={list.owner}
                desc={list.desc}
                id={list.id}
              />
            );
          }
        })}
      </div>
    </PageWrapper>
  );
}
