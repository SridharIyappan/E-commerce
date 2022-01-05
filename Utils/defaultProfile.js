import normalizeUrl from "normalize-url";
import gravatar from "gravatar";

const defaultProfile = (email) => {
  return normalizeUrl(
    gravatar.url(email, {
      s: "200",
      pg: "pg",
      d: "mm",
    }),
    { forceHttps: true }
  );
};

export default defaultProfile;
