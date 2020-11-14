export const swDev = () => {
   let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

   if (navigator.serviceWorker) {
      window.addEventListener("load", () => {
         navigator.serviceWorker
            .register(swUrl)
            .then((reg) => console.log("Service worker registered..."))
            .catch((err) =>
               console.log(`Service worker registration failed.  Error: ${err}`)
            );
      });
   }
};
