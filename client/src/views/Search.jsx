import {useQuery} from '@apollo/client'
import {SEARCH_DATA} from '../graphql/queiries'
import {MediaCard, Loading, Box} from '../components'
import { useParams } from 'react-router-dom'

export default  function Search() {
    const {input} = useParams()
    const {loading, error, data} = useQuery(SEARCH_DATA, {variables: {input}})
    if (loading) return (<> <Loading /> </>)
    if (error) return (<h1>Error</h1>)

    if(data) {
    const result = [...data.getMoviesAll, ...data.getTvSeriesAll]
    return (
        <>
        <div className="container my-3">
            <h2 className="text-center p-2">Search Result</h2>
        {
            result.length
            ? <div className="row row-cols-4">
            {
                data.getMoviesAll.map(el => (
                    <div className="col">
                        <MediaCard el={el} type='Movies'  key={el._id} />
                    </div>
                ))
            }
            {
                data.getTvSeriesAll.map(el => (
                    <div className="col">
                        <MediaCard el={el} type='Tv Series'  key={el._id} />
                    </div>
                ))
            }
            </div>
            : <Box text={`Sorry`} text2={`We couldn't find any matches for '${input}'`}  />
        }
        </div>
        </>
    )
    }
}