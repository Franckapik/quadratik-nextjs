import { useState } from "react";
import { Modal } from "react-bootstrap";

export const Loader = ({ text, open }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal centered show={open} onHide={handleClose} backdrop={false}>
      <Modal.Body className="text-center">{text}</Modal.Body>
    </Modal>
  );
};
