export const currentSite =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/images/"
    : "https://frozen-sea-50507.herokuapp.com/images/";
