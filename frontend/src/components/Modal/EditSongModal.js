import { useEffect, useState } from "react"
import Modal from '.';
import SongForm from '../SongForm';


export default function EditSongModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const root = document.getElementById('root');
    if (showModal) root.classList.add('blur')

    return () => root.classList.remove('blur');
  }, [showModal])

  return (
    <>
      <button
        className='btn btn--secondary--outline'
        onClick={() => setShowModal(true)}
      >
        <img src="https://a-v2.sndcdn.com/assets/images/edit-2fe52d66.svg"
          style={{ transform: 'scale(1.0)' }}
          alt=''
        />
        &nbsp;edit
      </button>


      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <SongForm song={song} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
