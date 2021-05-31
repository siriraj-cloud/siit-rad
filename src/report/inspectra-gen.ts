import jwt from "jsonwebtoken";
import CONFIG from "../utils/config";
import CONFIG_ENV from "../utils/config-env";
import { UserShortInfo } from "./query-report";

type InspectraURLProps = {
  studyKey: number;
  modality: string | null;
  bodypart: string | null;
  hn: string;
  userInfo: UserShortInfo;
  requestFrom: string | undefined;
};

export function inspectraURL({
  studyKey,
  modality,
  bodypart,
  hn,
  userInfo,
  requestFrom,
}: InspectraURLProps): string | null {
  if (!studyKey || !modality || !bodypart) return null;
  // if (modality === "CR" && /CHEST/i.test(bodypart)) {
  const jwtString = signJWT({
    studyKey,
    hn,
    accountName: userInfo.AccountName,
    fullName: userInfo.fullName,
    displayName: userInfo.displayName,
    location: userInfo.location,
  });

  return (
    CONFIG_ENV.inspectra_url_prefix(requestFrom || "") +
    "/cxr/" +
    studyKey +
    "?token=" +
    jwtString
  );
  // }

  return null;
}

function signJWT(props: SignJWTProps): string {
  const { studyKey, hn, accountName, fullName, displayName, location } = props;
  const payload = {
    StudyKey: studyKey,
    username: accountName,
    fullname: fullName || displayName,
    location: location,
    hn,
  };
  const jwtToken = jwt.sign(payload, process.env.INSPECTRA_JWT_SECRET || "", {
    algorithm: "HS256",
    expiresIn: CONFIG.inspectra.jwtExpire,
  });
  return jwtToken;
}
type SignJWTProps = {
  studyKey: number;
  hn: string;
  accountName: string;
  fullName: string;
  displayName: string;
  location: string[];
};

if (process.env.INSPECTRA_JWT_SECRET === undefined)
  console.log("Missing ENV INSPECTRA_JWT_SECRET");
