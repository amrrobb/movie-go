import {MediaCard, Box} from '../components'
import {favoritesVar} from '../graphql/vars'
import {useReactiveVar} from '@apollo/client'

export default function Favorites(params) {
    const favorites = useReactiveVar(favoritesVar)

    return (
        <>
        <div className="container my-3">
            <h2 className="text-center p-2">Favorites</h2>
            {
                favorites.length 
                ? (
                    <div className="row row-cols-4">
                    {
                        favorites.map(el => (
                            <div className="col">
                                <MediaCard el={el} type='Movies'  key={el._id} />
                            </div>
                        ))
                    }
                    </div>
                )
                : 
                <Box text={"You don't have any favorites"} />
            }
            
        </div>
        </>
    )
}