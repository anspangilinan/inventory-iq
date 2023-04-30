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
  return (
    <>
      <div className="w-1/2">
        <div>
          <label htmlFor="simple-search" className="sr-only">
            Search equipment or category
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search equipment or category"
              onChange={(e) => setSearchQuery(e.target.value)}
              // onBlur={() => setShowResults(false)}
              onFocus={() => setShowResults(true)}
            />
          </div>
        </div>
        {searchResult && (
          <div className={`${showResults && searchQuery ? "block" : "hidden"}`}>
            <div className="absolute z-50 w-1/6">
              <ul className="bg-white border border-gray-100 w-full mt-2">
                {searchResult.map((equipment) => {
                  return (
                    <li className="px-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-orange-300 hover:text-gray-900">
                      <Link
                        href={`/categories/${equipment.category.slug}/${equipment.slug}`}
                        className=""
                      >
                        {getHighlightedText(equipment.name, searchQuery)}
                      </Link>
                      <span className="text-gray-400">
                        {" / "}
                        {equipment.category.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
