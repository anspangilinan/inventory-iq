import jsonFetcher from "@/lib/jsonFetcher";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const SearchBar = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      <div
        className={`-mt-4 ${showResults && searchQuery ? "block" : "hidden"}`}
      >
        <div className="absolute z-50">
          <ul className="bg-white border border-gray-200 w-full ml-2 shadow-xl">
            {searchResult.map((equipment, i) => {
              return (
                <li
                  key={i}
                  className="text-sm text-blueGray-700 border-b-1 py-4 pr-10 border-gray-100 relative cursor-pointer hover:text-orange-400 hover:bg-gray-200"
                >
                  <Link
                    href={`/categories/${equipment.category.slug}/${equipment.slug}`}
                    className="p-8"
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
      <div className="z-50 w-full">
        <label htmlFor="simple-search" className="sr-only">
          Search equipment or category
        </label>
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
          <span className="z-50 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 pl-1 py-2">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="simple-search"
            className="px-1 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            placeholder="Search equipment or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        {getSearchResults()}
      </div>
    </>
  );
};

export default SearchBar;
