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
      allSpecies = [
        ...allSpecies,
        ...data.characters.results.map((char: { species: string }) => char.species),
      ];
    }

    nextPage = data?.characters?.info?.next || null;
  }

  const uniqueSpecies = Array.from(new Set(allSpecies));
  return uniqueSpecies; // Return untranslated species
};