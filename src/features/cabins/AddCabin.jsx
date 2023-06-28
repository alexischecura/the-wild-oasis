import { useState } from "react";

import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handeCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onCloseModal={handeCloseModal}>
          <CreateCabinForm onCloseModal={handeCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
