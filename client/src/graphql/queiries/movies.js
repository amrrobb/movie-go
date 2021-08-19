import {gql} from '@apollo/client'

export const ADD_MOVIE = gql `
mutation Mutation($input: Form!) {
    addMovies(input: $input) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`
export const DELETE_MOVIE = gql `
mutation Mutation($input: ID!) {
    delMovies(id: $input) {
        message
    }
}

`

export const UPDATE_MOVIE = gql `
mutation Mutation($id: ID!, $input: Form!) {
  updateMovies(id: $id, input: $input) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}

`

export const GET_ALL_MOVIES = gql `
query Query($input: String) {
  getMoviesAll(input: $input) {
    _id
    title
    poster_path
    popularity
  }
}
`

export const SEARCH_DATA = gql `
query Query($input: String) {
  getMoviesAll(input: $input) {
    _id
    title
    poster_path
    popularity
  }
  getTvSeriesAll(input: $input) {
    _id
    title
    poster_path
    popularity
  }
}
`


export const GET_MOVIE = gql `
query Query($input: ID!) {
  getMovies(id: $input) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}`