import {useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom'
import {GET_MOVIE} from '../graphql/queiries'
import { EditForm, Loading, Box } from '../components'

export default function Edit() {
    const {id: input} = useParams()
    const {loading, error, data} = useQuery(GET_MOVIE, {variables: {input}})

    if (loading) return (<><Loading /></>)
    if (error) {

    }

    return (
        <>
        {
            data.getMovies._id
            ? <EditForm data={data.getMovies} />
            : <Box text={"Data Not Found"} />
        }
        </>
    )
}