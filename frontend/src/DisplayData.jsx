import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';
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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

const DisplayData = () => {
  const [movieSearch, setMovieSearch] = useState('');
  const [createUserInput, setCreateUserInput] = useState({
    name: '',
    username: '',
    age: 0,
    nationality: '',
  });
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
  const [createUser, { data: createUserData, error: createUserError }] =
    useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  if (error) {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  if (data) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '100px',
            marginRight: '100px',
          }}
        >
          <input
            type='text'
            placeholder='name'
            value={createUserInput.name}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setCreateUserInput((input) => {
                return { ...input, name: e.target.value };
              });
            }}
          />
          <input
            type='text'
            placeholder='username'
            value={createUserInput.username}
            onChange={(e) => {
              setCreateUserInput((input) => {
                return { ...input, username: e.target.value };
              });
            }}
          />
          <input
            type='number'
            placeholder='age'
            value={createUserInput.age}
            onChange={(e) => {
              console.log(e.target);
              setCreateUserInput((input) => {
                return { ...input, age: Number(e.target.value) };
              });
            }}
          />
          <input
            type='text'
            placeholder='nationality'
            value={createUserInput.nationality}
            onChange={(e) => {
              setCreateUserInput((input) => {
                return { ...input, nationality: e.target.value.toUpperCase() };
              });
            }}
          />
          <button
            onClick={() =>
              createUser({
                variables: {
                  input: createUserInput,
                },
              })
            }
          >
            Create User
          </button>
          <div>{createUserData && JSON.stringify(createUserData)}</div>
          <div>{createUserError && JSON.stringify(createUserError)}</div>
        </div>
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
