import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import './SongForm/SongForm.css';

export default function S3Test() {
  const history = useHistory();
  const [songFile, setSongFile] = useState('');
  const [artworkFile, setArtworkFile] = useState('https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [customFileText, setCustomFileText] = useState('no file chosen yet...')
  const [validationErrors, setValidationErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const audioInputRef = useRef();
  const uploadSongBtn = useRef();
  const artworkInputRef = useRef();
  const artworkPreview = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) return setShowErrors(true);

    // TODO: THUNK HERE WITH S3 FETCHES FOR BOTH FILES
  }


  return (
    <div className="form_container">
      <h2>upload your song</h2>

      <form onSubmit={onSubmit} className="song_form">
        <div className="song_form__left">

          <div>
            <h4 style={{ marginTop: '20px' }}>select song<span style={{ color: 'red' }}>*</span></h4>
            <span style={{ color: 'rgba(253, 69, 69, 1)', fontSize: '12px' }}>
              {showErrors && validationErrors.includes('please upload a song first') ? 'please upload a song first' : null}
            </span>

            <div className="custom_upload_container">
              <button
                type="button"
                id="customUploadButton"
                className="btn btn--secondary--outline"
                ref={uploadSongBtn}
                onClick={e => audioInputRef.current.click()}
                style={
                  showErrors && (validationErrors.includes('please upload a song first'))
                    ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null
                }

              >
                upload file
              </button>
              <span className="custom_file_text">
                {customFileText}
              </span>
              <input type="file"
                accept=".mp3"
                name="song"
                ref={audioInputRef}
                hidden={true}
                onChange={e => {
                  setSongFile(e.target.files[0]);
                  setCustomFileText(e.target.files[0].name);
                }}
              />
            </div>
          </div>

        </div>


        <div className="song_form__bottom">
          <span className="required_label">required fields</span>
          <div className="btn_container">
            <button type="button" className="btn btn--secondary" onClick={e => {
              if (window.confirm('Are you sure you want to cancel your upload?')) {
                history.push('/');
              }
            }}
            >
              cancel
            </button>
            <button type="submit" className="btn btn--primary">save</button>
          </div>
        </div>

      </form>
    </div>

  )
}
