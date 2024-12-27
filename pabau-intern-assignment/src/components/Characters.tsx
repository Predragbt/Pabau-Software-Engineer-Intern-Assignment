import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
  useQuery,
} from "@apollo/client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { GET_CHARACTERS } from "../graphgl/queries";
import { Character } from "../types/types";
import { CharacterCard } from "./Card";
import { FilterDropdown } from "./FilterDropdown";
import { fetchAllSpecies } from "../utils/FetchSpecies";

export const Characters = () => {
  const [originalCharacters, setOriginalCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("None");

  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { t } = useTranslation();

  // Status mapping for translations
  const statusMapping: Record<"alive" | "dead" | "unknown", string> = {
    alive: t("alive"),
    dead: t("dead"),
    unknown: t("unknown"),
  };

  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_CHARACTERS,
    {
      variables: {
        page: 1,
        filter: {
          species: selectedSpecies === "All" ? null : selectedSpecies,
          status:
            selectedStatus === "All"
              ? null
              : Object.keys(statusMapping).find(
                  (key) =>
                    statusMapping[key as keyof typeof statusMapping] ===
                    selectedStatus
                ) || selectedStatus,
        },
      },
    }
  );

  // Fetch all species on mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const allSpecies = await fetchAllSpecies(client);
        setSpecies(["All", ...allSpecies]);
      } catch (error) {
        console.error("Error fetching species:", error);
      }
    };

    fetchSpecies();
  }, [client]);

  // Update character data when API data changes
  useEffect(() => {
    if (data?.characters.results) {
      const fetchedCharacters = data.characters.results;
      setOriginalCharacters(fetchedCharacters);
      setAllCharacters(fetchedCharacters);
    }
  }, [data]);

  // Handle sorting
  useEffect(() => {
    if (sortBy === "None") {
      setAllCharacters([...originalCharacters]);
    } else {
      let sortedCharacters = [...originalCharacters];
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
            species: selectedSpecies === "All" ? null : selectedSpecies,
            status:
              selectedStatus === "All"
                ? null
                : Object.keys(statusMapping).find(
                    (key) =>
                      statusMapping[key as keyof typeof statusMapping] ===
                      selectedStatus
                  ) || selectedStatus,
          },
        },
      });

      if (moreData) {
        const fetchedCharacters = moreData.characters.results;
        setOriginalCharacters((prev) => [...prev, ...fetchedCharacters]);
        setAllCharacters((prev) => [...prev, ...fetchedCharacters]);
      }
    }
  };

  const handleFilterChange = (type: "species" | "status", value: string) => {
    const updatedValue = value === t("all") ? "All" : value;

    if (type === "species") {
      setSelectedSpecies(updatedValue);
    } else if (type === "status") {
      const apiValue =
        Object.keys(statusMapping).find(
          (key) =>
            statusMapping[key as keyof typeof statusMapping] === updatedValue
        ) || updatedValue;

      setSelectedStatus(apiValue || "");
    }

    refetch({
      page: 1,
      filter: {
        species: type === "species" ? updatedValue : selectedSpecies,
        status: type === "status" ? updatedValue : selectedStatus,
      },
    });

    setOriginalCharacters([]);
    setAllCharacters([]);
  };

  if (loading && allCharacters.length === 0) return <p>{t("loading")}</p>;
  if (error)
    return (
      <p>
        {t("error")}: {error.message}
      </p>
    );

  return (
    <div className="container">
      <h1 className="mb-5">{t("characters")}</h1>

      <div className="filters d-flex justify-content-center mb-4 gap-4">
        <FilterDropdown
          label="species"
          options={species}
          selected={selectedSpecies}
          onChange={(value) => handleFilterChange("species", value)}
        />
        <FilterDropdown
          label="status"
          options={["All", t("alive"), t("dead"), t("unknown")]}
          selected={selectedStatus}
          onChange={(value) => handleFilterChange("status", value)}
        />
        <FilterDropdown
          label="sortBy"
          options={["None", t("name"), t("origin")]}
          selected={sortBy}
          onChange={(value) => setSortBy(value)}
        />
      </div>

      <InfiniteScroll
        dataLength={allCharacters.length}
        next={loadMore}
        hasMore={data?.characters.info.next !== null}
        loader={<p>{t("loadingMore")}</p>}
        className="row"
      >
        {allCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
