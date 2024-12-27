import { Button, Card } from "react-bootstrap";
import { Character } from "../types/types";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="col-4 mb-5">
      <Card className="h-100">
        <Card.Img variant="top" src={character.image} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <span className="fw-bold"> Status: </span> {character.status}
            <br />
            <span className="fw-bold"> Species: </span> {character.species}
            <br />
            <span className="fw-bold"> Gender: </span> {character.gender}
            <br />
            <span className="fw-bold"> Origin: </span> {character.origin.name}
          </Card.Text>
          <Button variant="primary">Details</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
