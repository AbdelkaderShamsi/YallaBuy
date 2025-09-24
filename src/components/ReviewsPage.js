// import React from "react";
// import { Container, Card } from "react-bootstrap";

// function ReviewsPage() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Aly Mourad",
//       img: "/media/man1.jfif",
//       text: "Excellent service and fast delivery! Definitely recommend YallaBuy.",
//     },
//     {
//       id: 2,
//       name: "Ghada El-Saeid",
//       img: "/media/woman1.jpeg",
//       text: "Great quality products and amazing customer support.",
//     },
//     {
//       id: 3,
//       name: "Marwan Abo-Shahba",
//       img: "/media/man2.jpg",
//       text: "Very easy to use website, shopping was smooth and fun.",
//     },
//     {
//       id: 4,
//       name: "Mai Ismail",
//       img: "",
//       text: "my first time, excellent searching excellent timing excellent packaging ,, woooooooooow ",
//     },
//     {
//       id: 5,
//       name: "Christine Michael",
//       img: "",
//       text: "lots of recommendations to my relations",
//     },
//     {
//       id: 6,
//       name: "Peter Abanoub",
//       img: "",
//       text: "Please add some sports supplies, I think Nowadays it is a must",
//     },
//     {
//       id: 7,
//       name: "Hala ElSaid",
//       img: "",
//       text: "Easy Super Power .. WoWoWo",
//     },
//     {
//       id: 8,
//       name: "Ramy Ahmed",
//       img: "",
//       text: "Not much varieties .. please improve",
//     },
//   ];

//   return (
//     <Container className="py-4">
//       <div className="story-title text-center mb-5">
//         <h1 className="m-0">Reviews</h1>
//       </div>

//       {reviews.map((review) => (
//         <Card key={review.id} className="mb-4 shadow-sm reviewPage-card">
//           <Card.Body className="d-flex align-items-center">
//             <img
//               src={review.img}
//               alt={"No Img"}
//               className="rounded-circle me-3"
//               style={{ width: "80px", height: "80px", objectFit: "cover" }}
//             />
//             <div>
//               <h5>{review.name}</h5>
//               <p className="text-muted mb-0">{review.text}</p>
//             </div>
//           </Card.Body>
//         </Card>
//       ))}
//     </Container>
//   );
// }

// export default ReviewsPage;

import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const staticReviews = [
    {
      id: 1,
      name: "Aly Mourad",
      img: "/media/man1.jfif",
      text: "Excellent service and fast delivery! Definitely recommend YallaBuy.",
    },
    {
      id: 2,
      name: "Ghada El-Saeid",
      img: "/media/woman1.jpeg",
      text: "Great quality products and amazing customer support.",
    },
    {
      id: 3,
      name: "Marwan Abo-Shahba",
      img: "/media/man2.jpg",
      text: "Very easy to use website, shopping was smooth and fun.",
    },
    {
      id: 4,
      name: "Mai Ismail",
      img: "",
      text: "my first time, excellent searching excellent timing excellent packaging ,, woooooooooow ",
    },
    {
      id: 5,
      name: "Christine Michael",
      img: "",
      text: "lots of recommendations to my relations",
    },
    {
      id: 6,
      name: "Peter Abanoub",
      img: "",
      text: "Please add some sports supplies, I think Nowadays it is a must",
    },
    {
      id: 7,
      name: "Hala ElSaid",
      img: "",
      text: "Easy Super Power .. WoWoWo",
    },
    {
      id: 8,
      name: "Ramy Ahmed",
      img: "",
      text: "Not much varieties .. please improve",
    },
  ];

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("/reviews/");
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews", error);
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const allReviews = [...staticReviews, ...reviews];

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading reviews...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" fluid>
      <div className="story-title text-center mb-5">
        <h1 className="m-0 display-4">Reviews</h1>
      </div>

      {error && (
        <Alert variant="warning" className="text-center">
          {error}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          {allReviews.map((review, index) => (
            <Card
              key={review.id || `review-${index}`}
              className="mb-4 shadow-lg border-0"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-start">
                  <img
                    src={review.img || ""}
                    alt={review.name}
                    className="rounded-circle me-4 flex-shrink-0"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      border: "3px solid #e8c999",
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h4 className="mb-1 text-primary">{review.name}</h4>
                        {review.createdAt && (
                          <small className="text-muted">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </small>
                        )}
                      </div>
                      {!review.createdAt && (
                        <span className="badge bg-warning text-dark">
                          Featured Review
                        </span>
                      )}
                    </div>

                    <p
                      className="mb-0 lead"
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      {review.text}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {allReviews.length === 0 && !loading && (
        <div className="text-center py-5">
          <div className="py-5">
            <i className="fas fa-comments fa-3x text-muted mb-3"></i>
            <h3 className="text-muted">No Reviews Yet</h3>
            <p className="text-muted">
              Be the first to share your experience with YallaBuy!
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .lead {
          font-weight: 400;
        }
      `}</style>
    </Container>
  );
}

export default ReviewsPage;
