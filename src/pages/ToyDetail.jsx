/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect} from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams} from "react-router-dom"
import { loadToys, removeReview, saveToy, setIsLoading, setSelectedToy } from "../store/actions/toy.action"
import { ToyReview } from "../cmps/ToyReview"
import { utilService } from "../service/util.service"
import { showErrorMsg, showSuccessMsg } from "../service/event-bus.service"


export function ToyDetail(){

    const toy = useSelector((storeState) => storeState.toyModule.selectedToy)
    const user = useSelector((storeState) => storeState.userModule.user)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setIsLoading(true);
        loadToys()
            .then(() => {
                setSelectedToy(params.toyId)                
             })
            .catch((err) => {
                console.error('Could not load toys:', err);
                navigate("/toys");
             })
            .finally(() => setIsLoading(false));
    }, [params.toyId]);    


    function onReviewSave(txt){
        if(toy && user){
        const newMsg = {id: utilService.makeId(), txt: txt, by:{_id: user._id, fullname: user.fullname}}
        const toyToSave = {...toy, msgs: [newMsg, ...toy.msgs]}
        saveToy(toyToSave)
        .then(()=>{
            showSuccessMsg('review was saves successfully')
        })
        .catch(err => {
            showErrorMsg('could not save review')
            console.error(err);
        })
        }        
    }

    function onReviewRemove(reviewId){
        removeReview(toy, reviewId)
        .then(()=>{
            showSuccessMsg('review was successfully removed')
        })
        .catch(()=>{
            showErrorMsg('could not remove review')
        })
    }

    if (isLoading || !toy) {
        return <div className="toy-detail container">Loading...</div>;
    }    
    return (
        <section className="toy-detail container">
            <div className="toy-img"><img alt="Toy picture" src="https://pl.nice-cdn.com/upload/image/product/large/default/toy-place-bear-100cm-1-st-819856-en.jpg" /></div>
            <section className="toy-info">
            <h1 className="toy-name">
                Toy name: {toy?.name || "No name available"}
            </h1>
            <h2 className="toy-price">
                Toy price: {toy?.price}
            </h2>
            <h3 className="toy-labels">
                Toy labels: {toy?.labels?.join(', ')}
            </h3>
            <h3 className="toy-stock">
                in Stock: {(toy?.inStock ? "In Stock!" : "Out Of Stock")}
            </h3>
            </section>
            {(user && <ToyReview onReviewSave={onReviewSave} />)}
            <section className="review-list">
                {toy?.msgs?.length > 0 && (
                    <>
                    <h5>reviews:</h5>
                    <ul className="review-ul">
                        {toy.msgs.map((review) => (
                            <li className="review-li" key={review.id}>
                                <h4>{review.by.fullname}</h4>
                                <p>{review.txt}</p>
                                {((user?.isAdmin || review?.by._id === user?._id) && 
                            <button className="review-remove" onClick={()=>onReviewRemove(review.id)} >remove</button>
                            )}
                            </li>
                        ))}
                    </ul>
                        </>
                )}
            </section>
        </section>
    )
}