const externlInspectra = "https://siriraj.cloud:9003";
const configENV = {
  inspectra_url_prefix: (host: string): string | null =>
    /^https?:\/\/siriraj\.cloud/gi.test(host)
      ? externlInspectra
      : process.env.INSPECTRA_URL || null,
};
export default configENV;

if (process.env.INSPECTRA_URL === undefined) {
  console.log("Missing ENV INSPECTRA_URL");
}
