import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '/hooks/useAuth';
import useForm from '/hooks/useForm';
import useModal from '/hooks/useModal';
import { updateProductReview } from '/utils/api-service';
import { validateNumber, validateText } from '/utils/input-validation';
import Button from '../../ui/Button';
import Input from '../../ui/forms/Input';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Modal from '../../ui/modal/Modal';
import StarRating from '../../ui/rating/StarRating';
import classes from './ReviewForm.module.css';

export default function ReviewForm({ productId }) {

  const [ isProcessing, setIsProcessing ] = useState(false);
  const { modalIsVisible, toggleModal, modalHandler } = useModal();
  const router = useRouter();

  const initialFormState = { author: "" , title: "", text: "", rating: 3 };
  const validations = [
    { id: "author", method: ({author}) => validateText(author, 1, 20) },
    { id: "title", method: ({title}) => validateText(title, 1, 30) },
    { id: "text", method: ({text}) => validateText(text, 1, 200) },
    { id: "rating", method: ({rating}) => validateNumber(rating, 0, 5) }
  ];

  const { input, isValid, errors, touched, changeHandler, blurHandler } = useForm(initialFormState, validations);

  if (isProcessing) return <LoadingSpinner />

  const submitHandler = async event => {
    event.preventDefault();

    if (isValid) {
      setIsProcessing(true);
      const review = {
        author: input.author,
        title: input.title,
        text: input.text,
        rating: input.rating
      };
      try {
        await updateProductReview(review, productId);
        setIsProcessing(false);
        router.reload();
      }
      catch {
        setIsProcessing(false);
        toggleModal();
      }
    }
  }

  const ratingChangeHandler = event => {
    changeHandler(event);
  }

  const authorError = touched.author && errors.author ? errors.author : "";
  const titleError = touched.title && errors.title ? errors.title : "";
  const textError = touched.text && errors.text ? errors.text : "";

  return (
    <>
      <form className={classes.reviewForm} onSubmit={submitHandler}>
        <div className={classes.inputs}>
          <Input id="author" type="text" label="Navn" value={input.author} onChange={changeHandler} onBlur={blurHandler} error={authorError}/>
          <Input id="title" type="text" label="Overskrift" value={input.title} onChange={changeHandler} onBlur={blurHandler} error={titleError}/>
          <Input id="text" type="textarea" label="Anmeldelse" value={input.text} onChange={changeHandler} onBlur={blurHandler} error={textError}/>
          <div className={classes.rating}>
            <input id="rating" type="range" min="0" max="5" step="1" onChange={ratingChangeHandler}/>
            <StarRating rating={input.rating} size={25}/>
          </div>
        </div>
        <div className={classes.actions}>
          <Button disabled={!isValid}>Opret anmeldelse</Button>
        </div>
      </form>
      <Modal visible={modalIsVisible} btnText={"Prøv igen"} onClick={modalHandler}>Der skete en fejl med din anmeldelse.</Modal>
    </>
  );
}