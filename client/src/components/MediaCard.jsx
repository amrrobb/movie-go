import { useHistory } from 'react-router-dom'
import detail from '../assets/detail.png'
import del from '../assets/delete.png'
import favorite from '../assets/favorite.png'
import favorited from '../assets/favorited.png'
import edit from '../assets/edit.png'
import './MediaCard.css'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {DELETE_MOVIE, GET_ALL_DATA} from '../graphql/queiries'
import {useMutation, useReactiveVar} from '@apollo/client'
import Swal from 'sweetalert2'
import {favoritesVar} from '../graphql/vars'

export default function MediaCard({el: {title, popularity, poster_path, _id}, type}) {
    const history = useHistory()
    const [delMovies] = useMutation(DELETE_MOVIE)
    const existFav = useReactiveVar(favoritesVar)

    function titleGenerate(input) {
        return input.length < 25 ? input : input.substring(0, 25) + "..."
    }

    function tooltipsIcon(img, title, event) {
        return (
            <>
            <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 200 }}
            overlay={
                <Tooltip id={`tooltip-top`}>{title}</Tooltip>
            }
            >
            {
            <button className="add-to-mediacard-btn col" onClick={event} >
                <img src={img} alt="" className="icon-png"  />
            </button>
            }
            </OverlayTrigger>
            </>
        )
    }

    function deleteMovie(input) {
        Swal.fire({
            title: 'Do you want to delete this movie?',
            showCancelButton: true,
            confirmButtonText: `Delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                delMovies({
                    variables: {input},
                    refetchQueries: [{
                        query: GET_ALL_DATA
                    }]
                })
                Swal.fire(
                    'Delete Movie Success',
                    `The movie has been deleted from database`,
                    'success'
                  )
            }
          })
    }

    const handleFavorite = () => {
        // const existFav = favoritesVar()
        const data = {
            title, popularity, poster_path, _id
        }
        if (existFav.find(({_id: id}) => id === _id )) {
            const newFav = existFav.filter(fav => fav._id !== _id)
            favoritesVar([...newFav])
            Swal.fire(
                'Remove from Favorites',
                `This item has been removed form your favorites`,
                'success'
              )
        } else {
            favoritesVar([...existFav, data])
            Swal.fire(
                'Add to Favorites',
                `This item has been added to your favorites `,
                'success'
              )
        }
    }

    const checkFavorites = () => {
        return (existFav.find(({_id: id}) => id === _id )) ? true : false
    }

    return (
        <>
        <div className="mediacard m-4">
                <div className="product-img">
                    <img  src={poster_path} alt="" />
                    </div>
                    <div className="add-to-fav d-flex align-items-center px-2">
                    { tooltipsIcon(detail, "Detail", (() => history.push(`/detail/${_id}`))) }

                    {
                        !checkFavorites() 
                        ? tooltipsIcon(favorite, "Favorites", (() => handleFavorite()))
                        : tooltipsIcon(favorited, "Favorited", (() => handleFavorite()))
                    }

                    {
                        type === "Movies" 
                        ? <>
                            { tooltipsIcon(edit, "Edit", (() => history.push(`/edit/${_id}`))) }
                            { tooltipsIcon(del, "Delete", (() => deleteMovie(_id))) }
                        </>
                        : null
                        
                    }
                            
                    </div>
                    <div className="mediacard-footer">
                    <div className="title">
                        <h5>{titleGenerate(title)}</h5>
                    </div>
                    <div className="identifier">
                        {/* <small>ID: </small> */}
                        <span>{popularity}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

