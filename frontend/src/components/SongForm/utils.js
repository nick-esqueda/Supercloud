export const postToS3 = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body,
    });
    
    if (res.ok) {
      const songURL = res.url.split('?')[0];
      return songURL;
    } else {
      console.error('response from s3 fetch not ok, but did not error out');
    }
    
  } catch(e) {
    console.log('PUT REQUEST TO S3 FAILED!');
    console.log(e);
  }
}

export const getSongDuration = async (file) => {
  const audio = document.createElement('audio');

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const songDuration = await new Promise((resolve, reject) => {
      reader.onload = function (e) {
        audio.src = e.target.result;

        audio.addEventListener('loadedmetadata', function () {
          // gets the duration of file in seconds with ms as float
          const duration = audio.duration;
          resolve(Math.floor(duration));
        });
      };
    });
    return songDuration;

  } else {
    return ("you didn\'t pass in an audio file!");
  }
}

export const secondsToMSS = (duration) => {
  let minutes = ~~(duration / 60);
  let seconds = duration - minutes * 60;

  if (seconds <= 9) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
