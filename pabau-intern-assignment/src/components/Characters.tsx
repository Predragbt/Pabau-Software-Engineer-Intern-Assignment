import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { GET_CHARACTERS } from "../graphgl/queries";
import { Character } from "../types/types";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  // Load initial data into the state
  useEffect(() => {
    if (data?.characters.results && characters.length === 0) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  // Load more characters
  const loadMore = async () => {
    if (data?.characters.info.next) {
      const nextPage = data.characters.info.next;

      const { data: moreData } = await fetchMore({
        variables: { page: nextPage },
      });

      if (moreData) {
        setCharacters((prev) => [...prev, ...moreData.characters.results]);
      }
    }
  };

  if (loading && characters.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="mb-5">Rick and Morty Characters</h1>
      <InfiniteScroll
        dataLength={characters.length} // Number of characters loaded
        next={loadMore} // Function to load more data
        hasMore={data?.characters.info.next !== null} // Whether there are more pages to load
        loader={<p>Loading more characters...</p>} // Loader displayed during fetching
        className="row"
      >
        {characters.map((character) => (
          <div className="col-4 mb-5" key={character.id}>
            <Card style={{ width: "18rem", height: "100%" }}>
              <Card.Img variant="top" src={character.image} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>
                  <span className="fw-bold"> Status: </span> {character.status}
                  <br />
                  <span className="fw-bold"> Species: </span>{" "}
                  {character.species}
                  <br />
                  <span className="fw-bold"> Gender: </span> {character.gender}
                  <br />
                  <span className="fw-bold"> Origin: </span>{" "}
                  {character.origin.name}
                </Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
