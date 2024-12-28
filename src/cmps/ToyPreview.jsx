/* eslint-disable react/prop-types */
export function ToyPreview({ toy }){
    
    return (
        <section className="toy-preview" key={toy._id}>
            {/* <h4>toy preview</h4> */}
            <h1>{toy.name}</h1>
            <h2>{toy.price}$</h2>
        </section>
    )

}