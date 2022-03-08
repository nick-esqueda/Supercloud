import './PlayControls.css';

const PlayControls = () => {


  return (
    <div className='play_controls'>
      <audio controls src='' />

      <div className='play_controls__details'>
        <img
          src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/11/css-gradient.png?fit=1200%2C600&ssl=1"
          alt=''
        />

        <div className='flexColLeft'>
          <small>artist</small>
          <span>song name</span>
        </div>

        <div>

        </div>
      </div>
    </div>
  );
}

export default PlayControls
