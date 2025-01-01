/* eslint-disable react/prop-types */
export function ToyPreview({ toy }){
    
    return (
        <section className="toy-preview" key={toy._id}>
            {/* <h4>toy preview</h4> */}
            <h1 className="name">{toy.name}</h1>
            <span className="price">{toy.inStock ? toy.price + "$" : "Out of stock"}</span>
        </section>
    )

}