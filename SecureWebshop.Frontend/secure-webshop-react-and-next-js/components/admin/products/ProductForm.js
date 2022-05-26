import { useDispatch } from "react-redux";
import { uiActions } from "../../../store";
import { updateProduct } from "../../../utils/api-service";
import Button from "../../ui/Button";
import Input from "../../ui/forms/Input";

import classes from './ProductForm.module.css';

export default function ProductForm({ product, onChange }) {
  const { name, description, price, priceReduction, imageUrl } = product;

  const dispatch = useDispatch();
  
  const updateProductHandler = event => {
    event.preventDefault();
    updateProduct(product).then(response => {
      if (response) {
        dispatch(uiActions.setNotification("Produktet er blevet opdateret!"));
      }
      else {
        dispatch(uiActions.setNotification("Fejl: produktet blev ikke opdateret."));
      }
    })
  }

  return (
    <form>
      <div className={classes.form}>
        <div className={classes.formDivision}>
          <Input id='name' type='text' label='Navn' value={name} onChange={onChange}/>
          <Input id='description' type='textarea' label='Beskrivelse' value={description} onChange={onChange}/>
        </div>
        <div className={classes.formDivision}>
          <div className={classes.priceInputs}>
            <Input id='price' type='number' label='Pris' value={price} onChange={onChange}/>
            <Input id='priceReduction' type='number' label='Rabat%' value={priceReduction} onChange={onChange}/>
          </div>
          <Input id='imageUrl' type='textarea' label='Billedfil til produkt (URL)' value={imageUrl} onChange={onChange}/>
        </div>
      </div>
      <Button onClick={updateProductHandler}>Opdatér produkt</Button>
    </form>
  );
}