import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useState } from 'react';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      favoriteMovies {
        name
      }
      friends {
        name
      }
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const [movieSearch, setMovieSearch] = useState('');
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [
    fetchMovie,
    {
      data: movieSearchData,
      // error: movieSearchError,
      // loading: movieSearchLoading,
    },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  if (error) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  if (data) {
    return (
      <div>
        <h1>Users</h1>
        {data.users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <div>{user.username}</div>
            <div>{user.age}</div>
            {user.friends && (
              <div>
                Friends:{' '}
                {user.friends.map((friend, i) =>
                  i === user.friends.length - 1
                    ? friend.name
                    : `${friend.name}, `
                )}
              </div>
            )}
          </div>
        ))}
        {movieData ? (
          <>
            <h1>Movies</h1>
            {movieData.movies.map((movie) => (
              <div key={movie.id}>{movie.name}</div>
            ))}
          </>
        ) : (
          <div>movieData loading...</div>
        )}
        <div>
          <input
            type='text'
            placeholder='Interstellar...'
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.currentTarget.value)}
          />
          <button
            onClick={() =>
              fetchMovie({
                variables: {
                  name: movieSearch,
                },
              })
            }
          >
            Fetch Data
          </button>
          <div>
            {movieSearchData && (
              <div>
                <div>Name: {movieSearchData.movie.name}</div>
                <div>
                  Date Published: {movieSearchData.movie.yearOfPublication}
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

  return null;
};

export default DisplayData;
