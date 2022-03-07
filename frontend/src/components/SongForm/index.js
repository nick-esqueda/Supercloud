import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import './SongForm.css'

export default function SongForm() {
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

  useEffect(() => {
    // TODO: write validations
    // TODO: highlight input fields that don't pass validation, like in signup form

    const errors = [];

    if (!songFile) errors.push('please upload a song first');
    if (!artworkFile) errors.push('please upload some cover art');
    if (!title) errors.push('please enter a title');

    setValidationErrors(errors);
  }, [songFile, artworkFile, title, genre, description]);

  const setPreviewImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        artworkPreview.current.setAttribute('src', e.currentTarget.result);
      });

      reader.readAsDataURL(file);

      setArtworkFile(file);
    }
  }


  const onSubmit = async (e) => {
    e.preventDefault();

    // if (validationErrors.length) return setShowErrors(true);

    // TODO: THUNK HERE WITH S3 FETCHES FOR BOTH FILES
    const res = await fetch('/api/s3URL');
    const { url } = await res.json();
    console.log(url);
  
    return;
  }

  return (
    <div className="form_container">
      <h2>upload your song</h2>

      <form onSubmit={onSubmit} className="song_form">
        <div className="song_form__left">
          <div className="image_preview">
            <img
              src={artworkFile}
              alt="artwork-placeholder"
              className="artwork"
              ref={artworkPreview}
            >
            </img>
            <button
              type="button"
              className="btn btn--secondary--outline"
              style={{ width: '150px' }}
              onClick={e => artworkInputRef.current.click()}
            >
              upload image
            </button>

            <input type="file"
              accept=".jpg, .jpeg, .png"
              name="artwork"
              ref={artworkInputRef}
              hidden={true}
              onChange={setPreviewImage}
            />
          </div>

          <div>
            <h4 style={{ marginTop: '20px' }}>select song</h4>

            <div className="custom_upload_container">
              <button
                type="button"
                id="customUploadButton"
                className="btn btn--secondary--outline"
                style={{ width: '110px', margin: '0' }}
                ref={uploadSongBtn}
                onClick={e => audioInputRef.current.click()}
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

        <div className="song_form__right">
          <div className="form_group">
            <label htmlFor='title'>title</label>
            <input type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form_input"
            />
          </div>

          <div className="form_group">
            <label htmlFor='genre'>genre</label>
            <input type="text"
              id="genre"
              maxLength={25}
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className="form_input"
            />
          </div>

          <div className="form_group">
            <label htmlFor='description'>description</label>
            <textarea
              id="description"
              placeholder="tell us about your song"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form_input"
              rows={8}
            >
            </textarea>
          </div>
        </div>

        <ul className='error_container'>
          {showErrors && validationErrors.map(err => (
            <li key={err}>{err}</li>
          ))}
        </ul>

        <div className="song_form__bottom">
          <span className="required_label">required fields</span>
          {/* button here (disable button until required inputs are filled) */}
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
  );
}
