const getTimeElapsed = createdAt => {
  const ms = new Date() - createdAt;
  
  const secondsAgo = Math.floor(ms / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (minutesAgo < 1) return secondsAgo + ' seconds ago';
  if (hoursAgo < 1) return minutesAgo + ' minutes ago';
  if (daysAgo < 1) return hoursAgo + ' hours ago';
  if (monthsAgo < 1) return daysAgo + ' days ago'
  if (yearsAgo < 1) return monthsAgo + ' months ago';
  else return yearsAgo + ' years ago';
}




module.exports = { getTimeElapsed };
