import { gql, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { CharacterError } from "./errorPages/CharacterNotFound";
import { GlobalError } from "./errorPages/GlobalError";

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      type
      created
      location {
        name
      }
      image
      origin {
        name
        dimension
      }
    }
  }
`;

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Validate the `id` parameter
  const isValidId = id && /^\d+$/.test(id);

  // If the ID is invalid, show `CharacterError`
  if (!isValidId) {
    return <CharacterError />;
  }

  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  // Handle loading state
  if (loading) return <div>{t("loading")}</div>;

  // Handle GraphQL errors
  if (error) {
    console.error("Unexpected error:", error);
    return <GlobalError />;
  }

  // If no data is returned, the character was not found
  if (!data || !data.character) {
    return <CharacterError />;
  }

  const character = data.character;

  return (
    <div className="container">
      <h1 className="mb-5 mt-4 pb-5 text-center">
        {t(character.name.toLowerCase(), { defaultValue: character.name })}
      </h1>
      <div className="d-flex justify-content-center">
        <img src={character.image} alt={character.name} className="mb-4" />
        <div className="ms-4 d-flex flex-column text-start">
          <p>
            <span className="fw-bold">{t("status")}: </span>
            {t(character.status.toLowerCase(), {
              defaultValue: character.status,
            })}
          </p>
          <p>
            <span className="fw-bold">{t("species")}: </span>
            {t(character.species.toLowerCase(), {
              defaultValue: character.species,
            })}
          </p>
          <p>
            <span className="fw-bold">{t("gender")}: </span>
            {t(character.gender.toLowerCase(), {
              defaultValue: character.gender,
            })}
          </p>
          <p>
            <span className="fw-bold">{t("type")}: </span>
            {character.type || t("unknown")}
          </p>
          <p>
            <span className="fw-bold">{t("created")}: </span>
            {new Date(character.created).toLocaleDateString()}
          </p>
          <p>
            <span className="fw-bold">{t("location")}: </span>
            {character.location?.name || t("unknown")}
          </p>
          <p>
            <span className="fw-bold">{t("origin")}: </span>
            {character.origin?.name || t("unknown")}
          </p>
          <p>
            <span className="fw-bold">{t("dimension")}: </span>
            {character.origin?.dimension || t("unknown")}
          </p>
        </div>
      </div>
    </div>
  );
};
