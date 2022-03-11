import './Backdrop.css';

export default function Backdrop() {
  return (
    <div id="backdrop">
      <video autoPlay="autoplay" muted loop className='video'>
        <source src="/backdrop2.mp4" type="video/mp4" />
      </video>
      <div className='overlay'></div>
    </div>

  )
}
