import classes from "./Category.module.css";
import CategoryCard from "./CategoryCard";
import { categoryInfos } from "./CategoryFullInfos";
function Category() {
  return (
    <section  className={classes.category_container}>
      {categoryInfos?.map((data, index) => (
        <CategoryCard key={index} info={data} />
      ))}
    </section>
  );
}

export default Category;