import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, GET_ALL_DATA } from '../graphql/queiries'
import Swal from 'sweetalert2'

export default function AddForm() {
    const tagsArr = ['Action', 'Adventure', 'Drama', 'Horror', 'Thriller', 'Romance', 'Comedy', 'Sci-Fi', 'Mystery', 'Fantasy', 'Documentary', 'War']
    const history = useHistory()
    const [addMovie, {data}] = useMutation(ADD_MOVIE)

    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
          // missing "test.lastName" input will be registered
          title: '',
          popularity: null,
          poster_path: '',
          overview: '',
          tags: []
        }
      })

    const formSubmit = async (input) => {
        // e.preventDefault()
        input = {...input, popularity: Number(input.popularity)}
        try {    
            await addMovie({
                variables: {input},
                refetchQueries: [{
                    query: GET_ALL_DATA
                }]
            })
            Swal.fire(
                'Add Movie Success',
                `The new movie has been added to database`,
                'success'
            )
            history.push('/')
        }
        catch(err) {
            Swal.fire(
                'The field/s cannot be empty!',
                "",
                'error'
              )
        }
    }


    return (
        <>
        <div className="container w-50 my-4 p-5 d-flex justify-content-center bg-grad-black rad-card form-box"  >
            <div className="w-75">
                <h2 className="text-center mb-4">Add Movies</h2>
                <form onSubmit={handleSubmit(formSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" {...register('title', {required: true})}/>
                    {errors.title?.type === 'required' && "Title cannot be empty"}
                </div>
                <div className="mb-3">
                    <label className="form-label">Overview</label>
                    <textarea type="text" rows='4' className="form-control" name="overview" {...register('overview', {required: true})}/>
                    {errors.overview?.type === 'required' && "Overview cannot be empty"}
                </div>
                <div className="mb-3">
                    <label className="form-label">Poster URL</label>
                    <input type="text" className="form-control" name="poster_path" {...register('poster_path', {required: true})} />
                    {errors.poster_path?.type === 'required' && "Poster URL cannot be empty"}
                </div>
                <div className="mb-3">
                    <label className="form-label">Popularity</label>
                    <input type="number" step="0.1" className="form-control" name="popularity" {...register('popularity', {required: true, min: 0, max: 10})} />
                    {errors.popularity?.type === 'required' && "Popularity cannot be empty"}
                    {errors.popularity?.type === 'min' && "Popularity min 0"}
                    {errors.popularity?.type === 'max' && "Popularity max 10"}
                </div>
                <div className="mb-3">
                    <label className="form-label" >Tags</label>
                    <div className="row row-cols-6">
                    {
                        tagsArr.map((tag, index) => (
                            <div className="form-check form-check-inline col mx-4">
                                <input className="form-check-input bg-transparent"  type="checkbox" value={tag} key={index} name='tags' {...register('tags')} />
                                <label className="form-check-label">{tag} </label>
                            </div>
                        ))
                    }
                    </div>
                </div>
                
                <div className="d-flex justify-content-between mt-5">
                    <button type="submit" className="btn btn-outline-light form-control me-5">Submit</button>
                    <button type="click" className="btn btn-outline-dark form-control ms-5" onClick={(e) => history.push('/')}>Cancel</button>

                </div>
                </form>
            </div>
        </div>
        </>
    )
}