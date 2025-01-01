/* eslint-disable react/prop-types */
import { useState } from "react";

export function ToyReview({ onReviewSave }) {
    const [reviewTxt, setReviewTxt] = useState("")

    const handleInputChange = (ev) => {
        setReviewTxt(ev.target.value)
    };

    const handleSave = (ev) => {
        ev.preventDefault()
        if (reviewTxt.trim()) {
            onReviewSave(reviewTxt)
            setReviewTxt("")
        } else {
            alert("Review text cannot be empty!")
        }
    };

    return (
        <section className="toy-review">
            <h4>Leave a review:</h4>
            <textarea
                rows="3"
                cols="40"
                value={reviewTxt}
                onChange={handleInputChange}
                placeholder="Write your review here..."
            />
            <button onClick={handleSave} className="review-btn button-main">
                Save
            </button>
        </section>
    );
}
