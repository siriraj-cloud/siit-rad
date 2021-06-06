const HOUR_s = 3600; // 24 hours in seconds
const MINUTE_s = 60; // 24 hours in seconds

const config = {
  HNLength: 8,
  cookie: {
    client_cookie_name: "siradsiit_login",
  },
  CORS_CONF: {
    ALLOW_ORIGIN: /* istanbul ignore next */ process.env.CORS_ALLOW_ORIGIN
      ? (process.env.CORS_ALLOW_ORIGIN as string).split(",")
      : "",
    ALLOW_METHODS: "GET,HEAD,PUT,PATCH,POST,DELETE",
    ALLOW_HEADERS: "Origin, X-Requested-With, Content-Type, Accept",
  },
  inspectra: {
    jwtExpire: 1 * HOUR_s,
  },
  Allergy: {
    redis: {
      table_list_key: "siradsiit-rad-allergy-table:",
      expire_s: 8 * HOUR_s,
    },
  },
};
export default config;

if (process.env.CORS_ALLOW_ORIGIN === undefined)
  console.error("ENV CORS_ALLOW_ORIGIN is undefined");
