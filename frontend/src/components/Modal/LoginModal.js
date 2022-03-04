import { useState } from 'react';
import Modal from '.';


function LoginModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn btn--secondary--outline"
        onClick={() => setShowModal(true)}
      >
        log in
      </button>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          this is the text inside the modal
        </Modal>
      )}
    </>
  );
}

export default LoginModal;
