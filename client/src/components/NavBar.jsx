import {NavLink} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function  NavBar() {
    const history = useHistory()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            input: ''
        }
      })

      const formSubmit = ({input}) => {
        history.push(`search/${input}`)
    }

    return (
        <>
        {/* style={{"background-color": "#CA3E47"}} */}
        <nav className="navbar navbar-dark navbar-expand-lg p-3 bg-transparent" >
        <div className="container-fluid px-4  h5">
            <p className="mb-0 h3"><b>MovieGo</b></p>
            

            <div className="collapse navbar-collapse mx-5">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <NavLink className="nav-link me-3" exact to='/'>Home</NavLink>
                <NavLink className="nav-link me-3" to='/add'>Add Movies</NavLink>
                <NavLink className="nav-link me-3" to='/favorites'>Favorites</NavLink>
            </ul>
            <form className="d-flex" onSubmit={handleSubmit(formSubmit)} >
                <input className="form-control me-2" type="search" name='input' placeholder="Search..." aria-label="Search" {...register('input')} />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
        </>
    )
}