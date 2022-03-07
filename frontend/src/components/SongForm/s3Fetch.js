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
