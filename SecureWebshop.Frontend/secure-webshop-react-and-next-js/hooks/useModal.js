import { useState } from "react";

export default function useModal() {
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const toggleModal = () => {
    setModalIsVisible(prevState => !prevState);
  };

  const modalHandler = () => {
    toggleModal();
  };

  return { modalIsVisible, toggleModal, modalHandler };
}