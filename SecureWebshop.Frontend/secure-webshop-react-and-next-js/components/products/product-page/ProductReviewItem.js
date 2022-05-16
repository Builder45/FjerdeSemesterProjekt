import StarRating from '../../ui/rating/StarRating';
import classes from './ProductReviewItem.module.css';

export default function ProductReviewItem({ review }) {
  const { id, author, title = "Ingen titel", text, rating, date = "2022-01-01T00:00:00" } = review;

  const parsedDate = new Date(date);
  const formattedDate = parsedDate.toLocaleString('da-DK', { month: 'short', day: '2-digit', year: 'numeric' });

  return (
    <div className={classes.review}>
      <div className={classes.header}>
        <StarRating rating={rating} size={20}/>
        <p>{author}</p>
        <p>{formattedDate}</p>
      </div>
      <h4 className={classes.title}>{title}</h4>
      <p className={classes.text}>{text}</p>
      <hr className={classes.hr}/>
    </div>
  );
}