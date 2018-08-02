const secrets = {
  apiLocation:
    process.env.production === "true"
      ? window.location.origin
      : "http://localhost:5000"
};

export default secrets;
