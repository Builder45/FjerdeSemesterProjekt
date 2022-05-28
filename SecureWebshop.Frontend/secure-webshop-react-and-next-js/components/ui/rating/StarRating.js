import classes from './StarRating.module.css';

import NoReviewStar from '/assets/rating/no-reviews-star.png';
import EmptyStar from '/assets/rating/empty-star.png';
import HalfStar from '/assets/rating/half-star.png';
import FullStar from '/assets/rating/full-star.png';
import Image from 'next/image';

function getStarType(rating, starIndex) {
  const relevantRating = (rating - starIndex).toFixed(1);
  if (relevantRating >= 0.8) return FullStar;
  if (relevantRating >= 0.3) return HalfStar;
  return EmptyStar;
}

export default function StarRating({ rating, totalReviews, size = 16 }) {

  const dynamicStyle = { width: `${size * 5 + 4}px`, height: `${size}px` };

  let stars = [];
  if (totalReviews !== 0) {
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image key={i} src={getStarType(rating, i)} width={size} height={size}/>
      );
    }
  }
  else {
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image key={i} src={NoReviewStar} width={size} height={size}/>
      );
    }
  }

  return (
    <div className={classes.starRating} style={dynamicStyle}>
      {stars}
    </div>
  );
}