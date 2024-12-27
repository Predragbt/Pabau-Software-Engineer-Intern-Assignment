import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_CHARACTERS } from "../graphgl/queries";

export const fetchAllSpecies = async (
  client: ApolloClient<NormalizedCacheObject>
): Promise<string[]> => {
  let allSpecies: string[] = [];
  let nextPage = 1;

  while (nextPage) {
    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: { page: nextPage },
    });

    if (data?.characters?.results) {
      // Extract species from the results
      allSpecies = [
        ...allSpecies,
        ...data.characters.results.map(
          (char: { species: string }) => char.species
        ),
      ];
    }

    // Update the next page
    nextPage = data?.characters?.info?.next || null;
  }

  return Array.from(new Set(allSpecies)); // Deduplicate species
};
