import { useEffect, useState } from 'react'
import Modal from '.';
import SignupForm from '../SignupForm';

export default function SignupModal() {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const root = document.getElementById('root');
    if (showModal) root.classList.add('blur')
  
    return () => root.classList.remove('blur');
  }, [showModal])

  return (
    <>
      <button
        className="btn btn--primary"
        onClick={() => setShowModal(true)}
      >
        create account
      </button>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>

  )
}
