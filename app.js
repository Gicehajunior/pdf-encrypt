if ("serviceWorker" in window.navigator) {
  window.navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log(registration);
    })
    .catch((err) => {
      console.log(err);
    });
}
