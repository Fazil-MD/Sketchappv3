import { useState } from "react";
import Login from "../Login";
import styles from './styles.module.css'

function Modal() {

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  /* const resetModal = () => {
    setOpenModal(!!openModal);
  } */

  return (
    <div className={styles.container}>
      {!openModal ?
        <button type="button" className={styles.open_btn} onClick={toggleModal}>Get Creative</button>
        : <Login handler={toggleModal} />
      }
    </div>
  )
}

export default Modal;