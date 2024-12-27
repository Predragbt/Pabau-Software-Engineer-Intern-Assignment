import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
  useQuery,
} from "@apollo/client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GET_CHARACTERS } from "../graphgl/queries";
import { Character } from "../types/types";
import { CharacterCard } from "./Card";
import { FilterDropdown } from "./FilterDropdown";
import { fetchAllSpecies } from "../utils/FetchSpecies";

export const Characters = () => {
  const [originalCharacters, setOriginalCharacters] = useState<Character[]>([]); // Unmodified characters from API
  const [allCharacters, setAllCharacters] = useState<Character[]>([]); // Filtered and sorted characters
  const [species, setSpecies] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>(""); // State for selected species
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State for selected status
  const [sortBy, setSortBy] = useState<string>("None"); // State for sorting, default "None"
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_CHARACTERS,
    {
      variables: {
        page: 1,
        filter: {
          species: selectedSpecies || null, // Filter by species
          status: selectedStatus || null, // Filter by status
        },
      },
    }
  );

  // Fetch all species on mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const allSpecies = await fetchAllSpecies(client);
        setSpecies(allSpecies);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };

    fetchSpecies();
  }, [client]);

  // Update originalCharacters and allCharacters when data changes
  useEffect(() => {
    if (data?.characters.results) {
      const fetchedCharacters = data.characters.results;
      setOriginalCharacters(fetchedCharacters); // Store original order
      setAllCharacters(fetchedCharacters); // Use for display and filtering
    }
  }, [data]);

  // Handle sorting whenever sortBy changes
  useEffect(() => {
    if (sortBy === "None") {
      // Reset to original order
      setAllCharacters([...originalCharacters]);
    } else {
      let sortedCharacters = [...allCharacters];
      if (sortBy === "Name") {
        sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "Origin") {
        sortedCharacters.sort((a, b) =>
          a.origin.name.localeCompare(b.origin.name)
        );
      }
      setAllCharacters(sortedCharacters);
    }
  }, [sortBy, originalCharacters]);

  // Load more characters
  const loadMore = async () => {
    if (data?.characters.info.next) {
      const nextPage = data.characters.info.next;

      const { data: moreData } = await fetchMore({
        variables: {
          page: nextPage,
          filter: {
            species: selectedSpecies || null, // Maintain species filter
            status: selectedStatus || null, // Maintain status filter
          },
        },
      });

      if (moreData) {
        const fetchedCharacters = moreData.characters.results;
        setOriginalCharacters((prev) => [...prev, ...fetchedCharacters]); // Append to original characters
        setAllCharacters((prev) => [...prev, ...fetchedCharacters]); // Append to displayed characters
      }
    }
  };

  // Unified handler for filters
  const handleFilterChange = (type: "species" | "status", value: string) => {
    const updatedValue = value === "All" ? "" : value;

    if (type === "species") {
      setSelectedSpecies(updatedValue);
    } else if (type === "status") {
      setSelectedStatus(updatedValue);
    }

    // Refetch characters with updated filters
    refetch({
      page: 1, // Reset to the first page
      filter: {
        species:
          type === "species" ? updatedValue || null : selectedSpecies || null,
        status:
          type === "status" ? updatedValue || null : selectedStatus || null,
      },
    });

    setOriginalCharacters([]); // Clear original results for a clean reload
    setAllCharacters([]); // Clear displayed results for a clean reload
  };

  if (loading && allCharacters.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="mb-5">Rick and Morty Characters</h1>

      <div className="filters d-flex justify-content-center mb-4 gap-4">
        {/* Dropdown for filtering species */}
        <FilterDropdown
          label="Species:"
          options={["All", ...species]} // Add "All" for no filtering
          selected={selectedSpecies}
          onChange={(value) => handleFilterChange("species", value)}
        />

        {/* Dropdown for filtering status */}
        <FilterDropdown
          label="Status:"
          options={["All", "Alive", "Dead", "unknown"]} // Status options
          selected={selectedStatus}
          onChange={(value) => handleFilterChange("status", value)}
        />

        {/* Dropdown for sorting */}
        <FilterDropdown
          label="Sort By:"
          options={["None", "Name", "Origin"]} // Sorting options with "None"
          selected={sortBy}
          onChange={(value) => setSortBy(value)} // Update sorting
        />
      </div>

      <InfiniteScroll
        dataLength={allCharacters.length} // Number of characters loaded
        next={loadMore} // Function to load more data
        hasMore={data?.characters.info.next !== null} // Whether there are more pages to load
        loader={<p>Loading more characters...</p>} // Loader displayed during fetching
        className="row"
        style={{ width: "1100px" }}
      >
        {allCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
