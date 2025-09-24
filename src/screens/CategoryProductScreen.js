import { useParams } from "react-router-dom";

function CategoryProductsScreen() {
  const { categoryName } = useParams();

  return (
    <div>
      <h2>{categoryName.toUpperCase()}</h2>
    </div>
  );
}

export default CategoryProductsScreen;
