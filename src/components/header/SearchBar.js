import jsonFetcher from "@/lib/jsonFetcher";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const SearchBar = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [showResults, setShowResults] = useState(false);
  const { data } = useSWR(`/api/equipment/`, jsonFetcher);

  useEffect(() => {
    if (data) {
      setEquipments(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery) {
      setSearchResult(
        equipments.filter(({ name, category }) => {
          const nameMatches = name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const categoryNameMatches = category.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return nameMatches || categoryNameMatches;
        })
      );
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchResult) {
      setShowResults(true);
    }
  }, [searchResult]);

  const getHighlightedText = (text, highlight) => {
    if (highlight.length < 3) {
      return <span>{text}</span>;
    }
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  const getSearchResults = () => {
    if (!searchQuery || !showResults) {
      return <></>;
    }
    return (
      <div className={`${showResults && searchQuery ? "block" : "hidden"}`}>
        <div className="absolute z-50 w-1/5">
          <ul className="bg-white border border-gray-100 w-full ml-2">
            {searchResult.map((equipment) => {
              return (
                <li className="text-sm text-blueGray-700 pr-2 pl-4 py-2 border-b-1 border-gray-100 relative cursor-pointer hover:text-orange-400 hover:bg-gray-200">
                  <Link
                    href={`/categories/${equipment.category.slug}/${equipment.slug}`}
                    className=""
                  >
                    {getHighlightedText(equipment.name, searchQuery)}
                    <span className="text-gray-400 ml-2">
                      {getHighlightedText(equipment.category.name, searchQuery)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-1/2">
        <div>
          <label htmlFor="simple-search" className="sr-only">
            Search equipment or category
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="text-gray-500 fa fa-search"></i>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search equipment or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // onBlur={() => setShowResults(false)}
              onFocus={() => setShowResults(true)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <span
                className="cursor-pointer px-5 py-1"
                onClick={() => setSearchQuery("")}
              >
                <i className="text-gray-300 hover:text-orange-500 fa fa-close"></i>
              </span>
            </div>
          </div>
        </div>
        {getSearchResults()}
      </div>
    </>
  );
};

export default SearchBar;
