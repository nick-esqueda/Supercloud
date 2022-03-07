import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postToS3, getSongDuration, secondsToMSS } from "./utils";
import './SongForm.css'
import { postSong } from "../../store/songs";

export default function SongForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [songURL, setSongURL] = useState('');
  const [artworkURL, setArtworkURL] = useState('https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
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
    
    console.log('artwork file in useEffect: ', artworkURL);
    console.log('song file in useEffect: ', songURL);

    if (!songURL) errors.push('please upload a song first');
    // TODO: file over 100MB
    if (!title) errors.push('please enter a title');
    if (title.length > 255) errors.push('title must be shorter than 255 characters');
    if (genre.length > 25) errors.push('genre must be shorter than 25 characters');
    if (description.length > 255) errors.push('description must be shorter than 255 characters');

    setValidationErrors(errors);
  }, [songURL, artworkURL, title, genre, description]);
  
    const s3Upload = async (file, inputName) => {
    if (!file) return console.log('upload a file first');

    const res = await fetch('/api/s3URL');
    const { url } = await res.json();
    const fileURL = await postToS3(url, file);

    if (inputName === 'song') return setSongURL(fileURL);
    if (inputName === 'artwork') return setArtworkURL(fileURL);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validationErrors.length) return setShowErrors(true);
    
    const durationInSeconds = await getSongDuration(audioInputRef.current.files[0]);
    const duration = secondsToMSS(durationInSeconds);

    const song = { songURL, artworkURL, title, genre, description, duration };
    
    const newSong = await dispatch(postSong(song));
    console.log('new song from database inside on onSubmit', newSong);

    return history.push(`/songs/${newSong.id}`);
  }

  return (
    <div className="form_container">
      <h2>upload your song</h2>

      <form onSubmit={onSubmit} className="song_form">
        <div className="song_form__left">
          <div className="image_preview">
            <img
              src={artworkURL}
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
              onChange={e => s3Upload(e.target.files[0], e.target.name)}
            />
          </div>

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
                  setCustomFileText(e.target.files[0].name);
                  s3Upload(e.target.files[0], e.target.name);
                }}
              />
            </div>
          </div>

        </div>

        <div className="song_form__right">
          <div className="form_group">
            <label htmlFor='title' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>title<span style={{ color: 'red' }}>*</span></span>

              <span style={{ color: 'rgba(253, 69, 69, 1)' }}>
                {showErrors && validationErrors.includes('please enter a title') ? 'please enter a title' : null}
              </span>
            </label>
            <input type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form_input"
              style={
                showErrors && (validationErrors.includes('please enter a title'))
                  ? { borderColor: 'rgba(253, 69, 69, 0.829)' } : null
              }

            />
          </div>

          <div className="form_group">
            <label htmlFor='genre' style={{ display: 'flex', justifyContent: 'space-between' }}>
              genre
              
              <span style={{ color: 'rgba(253, 69, 69, 1)', fontSize: '12px' }}>
                {showErrors && validationErrors.includes('genre must be shorter than 25 characters') ? 'genre must be shorter than 25 characters' : null}
              </span>
            </label>
            <input type="text"
              id="genre"
              maxLength={25}
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className="form_input"
            />
          </div>

          <div className="form_group">
            <label htmlFor='description' style={{ display: 'flex', justifyContent: 'space-between' }}>
              description
              
              <span style={{ color: 'rgba(253, 69, 69, 1)', fontSize: '12px' }}>
                {showErrors && validationErrors.includes('description must be shorter than 255 characters') ? 'description must be shorter than 255 characters' : null}
              </span>
            </label>
            <textarea
              id="description"
              placeholder="tell us about your song"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form_input"
              rows={8}
              maxLength={255}
            >
            </textarea>
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
  );
}
