// import { ReviewData } from "./ReviewsData";
// import Comments from "./Comments";
// import { Row, Col, Container, Form, Button } from "react-bootstrap";
// import { useState } from "react";
// import axios from "axios";

// function Reviews() {
//   const [review, setReview] = useState("");
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/reviews/add/", {
//         name: "Guest User", // ممكن بعدين تخليها اسم اليوزر لو فيه login
//         text: review,
//       });
//       setReview("");
//       alert("Thank you for your review!");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting review");
//     }
//   };
//   return (
//     <div id="reviews">
//       <Container>
//         <div className="reviews-container">
//           <h1>Reviews</h1>
//           <p>How we made a difference</p>
//         </div>
// <Row>
//   {ReviewData.map((rating) => {
//     const { id, stars, img, description, name } = rating;
//     return (
//       <Col
//         key={id}
//         md={4}
//         className="mb-4 d-flex justify-content-center"
//       >
//         <Comments
//           stars={stars}
//           img={img}
//           description={description}
//           name={name}
//         />
//       </Col>
//     );
//   })}
// </Row>
// <Form onSubmit={submitHandler}>
//   <Form.Group
//     className="mb-3 reviews-container"
//     controlId="exampleForm.ControlTextarea1"
//   >
//     <Form.Label className="mb-3 d-flex justify-content-center">
//       We truly value your review
//     </Form.Label>
//     <Form.Control
//       as="textarea"
//       rows={6}
//       placeholder="Add your Review "
//       value={review}
//       onChange={(e) => setReview(e.target.value)}
//       style={{
//         backgroundColor: "#e8c999",
//         border: "1px solid #ccc",
//         color: "#000",
//         fontSize: "16px",
//       }}
//     />
//   </Form.Group>
//   <div className="d-flex justify-content-center">
//     <Button
//       type="submit"
//       className="px-4"
//       style={{
//         backgroundColor: "#e8c999",
//         borderColor: "#e8c999",
//         color: "#000000",
//         fontSize: "20px",
//         fontWeight: "600",
//       }}
//     >
//       Send
//     </Button>
//   </div>
// </Form>
//       </Container>
//     </div>
//   );
// }

// export default Reviews;

import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import { ReviewData } from "./ReviewsData";

function Reviews() {
  const [text, setText] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const { userInfo } = useSelector((state) => state.userLogin);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setSubmitStatus({ type: "error", message: "Review cannot be empty" });
      return;
    }

    try {
      const reviewData = {
        text: text.trim(),
      };

      const config = userInfo
        ? { headers: { Authorization: `Bearer ${userInfo.token}` } }
        : {};

      await axios.post("/reviews/add/", reviewData, config);

      setText("");
      setSubmitStatus({
        type: "success",
        message:
          "Thank you for your review! It will be displayed on the reviews page.",
      });

      setTimeout(() => setSubmitStatus({ type: "", message: "" }), 5000);
    } catch (error) {
      console.error("Error submitting review", error);
      setSubmitStatus({
        type: "error",
        message: "Error submitting review. Please try again.",
      });
    }
  };

  return (
    <div id="reviews">
      <Container>
        <div className="reviews-container">
          <h1>How we made a difference</h1>
        </div>

        {submitStatus.message && (
          <Alert
            variant={submitStatus.type === "success" ? "success" : "danger"}
            className="mb-4"
          >
            {submitStatus.message}
          </Alert>
        )}

        <Row>
          {ReviewData.map((rating) => {
            const { id, stars, img, description, name } = rating;
            return (
              <Col
                key={id}
                md={4}
                className="mb-4 d-flex justify-content-center"
              >
                <Comments
                  stars={stars}
                  img={img}
                  description={description}
                  name={name}
                />
              </Col>
            );
          })}
        </Row>

        <Form onSubmit={submitHandler} className="mt-5">
          <Form.Group className="mb-3 reviews-container" controlId="reviewText">
            <Form.Label className="mb-3 d-flex justify-content-center">
              We truly value your review
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Add your Review ..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-review"
              maxLength={500}
            />
            <Form.Text className="text-muted d-block mt-2 text-center">
              {text.length}/500 characters
              {!userInfo && " - Your review will be posted as 'Guest User'"}
            </Form.Text>
          </Form.Group>
          <div className="d-flex justify-content-center ">
            <Button type="submit" className="px-4 py-2 button-review">
              Send Review
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Reviews;
