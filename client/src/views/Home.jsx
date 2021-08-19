import {GET_ALL_DATA} from '../graphql/queiries'
import {useQuery} from '@apollo/client'
import {MediaCard, Loading} from '../components'

export default function Home () {
    const {loading, error, data} = useQuery(GET_ALL_DATA)
    // const { movies, tvSeries } = data.getAll 
    if (loading) return (<> <Loading /> </>)
    if (error) return (<h1>Error</h1>)
    
    return (
        <>
        <div className="container my-3">
            <h2 className="text-center p-2">Movies</h2>
            <div className="row row-cols-4">
            {
                data && data.getAll.movies.map(el => (
                    <div className="col" key={el._id} >
                        <MediaCard el={el} type='Movies'   />
                    </div>
                ))
            }
            </div>
        </div>

        <div className="container my-3">
            <h2 className="text-center p-2">Tv Series</h2>
            <div className="row row-cols-4">
            {
                data && data.getAll.tvSeries.map(el => (
                    <div className="col" key={el._id} >
                        <MediaCard el={el} type='Tv Series'   />
                    </div>
                ))
            }
            </div>
        </div>
        
        </>
    )
}