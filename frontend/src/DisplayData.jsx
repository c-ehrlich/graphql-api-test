import { useQuery, gql } from '@apollo/client';

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
      name
    }
  }
`;

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

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
        {movieData.movies && (
          <>
            <h1>Movies</h1>
            {movieData.movies.map((movie) => (
              <div>{movie.name}</div>
            ))}
          </>
        )}
      </div>
    );
  }

  return null;
};

export default DisplayData;
