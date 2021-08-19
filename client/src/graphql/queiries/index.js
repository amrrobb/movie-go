import {gql} from '@apollo/client'
export {
    ADD_MOVIE, 
    DELETE_MOVIE, 
    UPDATE_MOVIE, 
    GET_ALL_MOVIES, 
    GET_MOVIE,
    SEARCH_DATA
} from './movies'

export const GET_ALL_DATA = gql `
query Query {
    getAll {
        movies {
            _id
            title
            poster_path
            popularity
        }
        tvSeries {
            _id
            title
            poster_path
            popularity
        }
    }
}
`

