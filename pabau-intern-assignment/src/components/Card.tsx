import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Character } from "../types/types";
import { useNavigate } from "react-router";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="col-4 mb-5">
      <Card className="h-100">
        <Card.Img variant="top" src={character.image} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>
            {t(character.name.toLowerCase(), { defaultValue: character.name })}
          </Card.Title>
          <Card.Text>
            <span className="fw-bold">{t("status")}: </span>{" "}
            {t(character.status.toLowerCase(), {
              defaultValue: character.status,
            })}
            <br />
            <span className="fw-bold">{t("species")}: </span>{" "}
            {t(character.species.toLowerCase(), {
              defaultValue: character.species,
            })}
            <br />
            <span className="fw-bold">{t("gender")}: </span>{" "}
            {t(character.gender.toLowerCase(), {
              defaultValue: character.gender,
            })}
            <br />
            <span className="fw-bold">{t("origin")}: </span>{" "}
            {t(character.origin.name.toLowerCase(), {
              defaultValue: character.origin.name,
            })}
          </Card.Text>
          <Button
            onClick={() => {
              navigate(`/character/${character.id}`);
            }}
            variant="primary"
          >
            {t("details")}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
