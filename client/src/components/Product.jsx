import React, { useState } from "react";

const Product = ({ data, onClose }) => {
  const [reviewForm, setReviewForm] = useState({
    user: "",
    content: "",
    rating: 0,
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    const rating = name === "rating" ? parseInt(value, 10) : value;
    setReviewForm({
      ...reviewForm,
      [name]: rating,
    });
    console.log(reviewForm);
  };

  const handleSubmitReview = async (id) => {
    const response = await fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewForm),
    });
    const json = await response.json();
    console.log(json);
    setReviewForm({
      user: "",
      content: "",
      rating: 0,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <button
                type="button"
                className="btn-close float-end"
                aria-label="Close"
                onClick={() => onClose()}
              ></button>
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">
                {data.description || "No description available"}
              </p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Price:</strong> ₹{data.price}
                </li>
                <li className="list-group-item">
                  <strong>Stock Availability:</strong> {data.stockAvailability}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong> {data.category}
                </li>
                <li className="list-group-item">
                  <strong>Average User Rating:</strong>{" "}
                  {data.averageUserRating || "Not rated"}
                </li>
                {data.reviews.length > 0 && (
                  <li className="list-group-item">
                    <strong>Reviews:</strong>
                    <ul>
                      {data.reviews.map((review, index) => (
                        <li key={index}>
                          <strong>User:</strong> {review.user},{" "}
                          <strong>Rating:</strong> {review.rating}
                          <p>{review.content}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
              <form onSubmit={() => handleSubmitReview(data._id)}>
                <div className="mb-1">
                  <label htmlFor="user" className="form-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    name="user"
                    value={reviewForm.user}
                    onChange={handleReviewChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="content" className="form-label">
                    Review Content:
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={reviewForm.content}
                    onChange={handleReviewChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-1">
                  <label htmlFor="rating" className="form-label">
                    Rating (1-5):
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
