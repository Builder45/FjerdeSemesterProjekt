import classes from './StarRating.module.css';

import EmptyStar from '../../../assets/rating/empty-star.png';
import HalfStar from '../../../assets/rating/half-star.png';
import FullStar from '../../../assets/rating/full-star.png';
import Image from 'next/image';

function getStarType(rating, starIndex) {
  const relevantRating = (rating - starIndex).toFixed(1);
  if (relevantRating >= 0.8) return FullStar;
  if (relevantRating >= 0.3) return HalfStar;
  return EmptyStar;
}


export default function StarRating({ rating, size = 16 }) {

  const dynamicStyle = { width: `${size * 5 + 4}px`, height: `${size}px` };

  return (
    <div className={classes.starRating} style={dynamicStyle}>
      <Image src={getStarType(rating, 0)} width={size} height={size}/>
      <Image src={getStarType(rating, 1)} width={size} height={size}/>
      <Image src={getStarType(rating, 2)} width={size} height={size}/>
      <Image src={getStarType(rating, 3)} width={size} height={size}/>
      <Image src={getStarType(rating, 4)} width={size} height={size}/>
    </div>
  );
}