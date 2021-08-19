import {useQuery} from '@apollo/client'
import {useHistory, useParams } from 'react-router-dom'
import {GET_MOVIE} from '../graphql/queiries'
import back from '../assets/return.png'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Loading, Box} from '../components'

export default function Edit() {
    const {id: input} = useParams()
    const {loading, error, data} = useQuery(GET_MOVIE, {variables: {input}})
    const history = useHistory()

    console.log(data);
    
    if (loading) return (<><Loading /></>)
    if (error) return (<p>Error</p>)
    

    function tagsJoin(input) {
        return input.join(', ')
    }
    
    if (data) {
    const {title, poster_path, overview, popularity, tags, _id} = data.getMovies
    return (
        <>
        {
            _id 
            ?
            <div className="container w-50 my-4 p-5 bg-grad-black rad-card form-box"  >
                
                <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 200 }}
                overlay={<Tooltip id={`tooltip-top`}>Back</Tooltip>}
                >
                {
                <button className="btn" type="click" onClick={() => history.push('/')}>
                    <img src={back} alt="" width={"35px"} />
                </button>
                }
                </OverlayTrigger>
                <h2 className="text-center mb-4">{title}</h2>
                
                <div className="row pt-4">
                    <div className="col-4">
                        <img src={poster_path} alt="" srcset="" width={"206px"} height={"305px"} />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h6 className="col-3"><b>Overview</b></h6>
                            <h6 className="col-1">:</h6>
                            <h6 className="col-8">{overview}</h6>
                        </div>
                        
                        <div className="row">
                            <h6 className="col-3"><b>Tags</b></h6>
                            <h6 className="col-1">:</h6>
                            <h6 className="col-8">{tagsJoin(tags)}</h6>
                        </div>

                        <div className="row">
                            <h6 className="col-3"><b>Rating</b></h6>
                            <h6 className="col-1">:</h6>
                            <h6 className="col-8">{popularity} / 10</h6>
                        </div>
                    </div>

                </div>
            </div>
            : <Box text={"Data Not Found"} />
            
        }
        
        </>
    )
    }
}