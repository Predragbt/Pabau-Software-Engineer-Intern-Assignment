export interface Origin {
  name: string;
}

export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  origin: Origin;
}

export interface CharactersData {
  characters: {
    info: {
      next: number | null;
      count?: number;
      pages?: number;
      prev?: number | null;
    };
    results: Character[];
  };
}

export interface CharactersVariables {
  page: number;
}
