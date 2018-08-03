const MSToDateString = dateString => {
  const timeDifferenceInSeconds = Math.floor(
    (Date.now() - new Date(dateString)) / 1000
  );
  if (timeDifferenceInSeconds < 60)
    return `${timeDifferenceInSeconds} seconds ago`;
  else if (timeDifferenceInSeconds < 60 * 60)
    return `${Math.floor(timeDifferenceInSeconds / 60)} minutes ago`;
  else if (timeDifferenceInSeconds < 60 * 60 * 24)
    return `${Math.floor(timeDifferenceInSeconds / (60 * 60))} hours ago`;
  else if (timeDifferenceInSeconds < 60 * 60 * 24 * 365.25)
    return `${Math.floor(timeDifferenceInSeconds / (60 * 60 * 24))} days ago`;
  else
    return `${Math.floor(
      timeDifferenceInSeconds / (60 * 60 * 24 * 365.25)
    )} years ago`;
};

export default MSToDateString;
