import { setModalData } from "../store/actions/modal.action"

export function Home(){

    function hey(){
        setModalData({})
    }

    return (
        <section className="home container">
            <h2>Welcome to Miss-Toy – The Land of Endless Wonder!</h2>
            <h3>Discover toys that spark joy, ignite creativity, and create lifelong memories. From timeless classics to modern favorites, we have the perfect companion for every adventure.</h3>
            <button onClick={hey}> hey</button>
        </section>
    )
}