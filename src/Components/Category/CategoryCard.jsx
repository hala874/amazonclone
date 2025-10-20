import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ info }) {
  return (
    <div className={classes.category}>
      <Link to={`/category/${encodeURIComponent(info.name)}`}>
        <span>
          <h2>{info.title}</h2>
        </span>
        <img src={info.imgLink} alt={info.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
