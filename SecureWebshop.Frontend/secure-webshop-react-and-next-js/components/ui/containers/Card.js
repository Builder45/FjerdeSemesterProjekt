import classes from './Card.module.css';

export default function Card({ children, className }) {

  const cardClasses = `${classes.card} ${className}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );

}