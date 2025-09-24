function Comments({ id, stars, img, description, name }) {
  return (
    <div className="comments text-center">
      <span className="stars">{stars}</span>
      <p className="description">{description}</p>
      <div className="person">
        <img src={img} alt={name} className="review-img" />
        <h3 className="text-name">{name}</h3>
        
      </div>
    </div>
  );
}

export default Comments;
