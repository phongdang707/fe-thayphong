import { safeParse } from "../config/utils";

export function getEntryV2(res, def) {
  if (typeof res !== "undefined") {
    const code = parseInt(safeParse(res.data.code, 500));
    const message = parseInt(safeParse(res.data.message, ""));
    validateRedirect(code, message);
    const codeMessage = safeParse(
      res.data.codeMessage,
      "INTERNAL_SERVER_ERROR"
    );

    let entry = def;
    // need get entry for code !== 200
    // if (code === 200) {
    const data = safeParse(res.data.data, {});
    const entries = safeParse(data.entries, []);
    if (entries.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      entry = safeParse(entries[0], def);
      // codeMessage = 'SUCCESS';
    }
    // }
    return {
      code,
      codeMessage,
      message: getMessageByCode(codeMessage),
      data: entry,
    };
  }
  return {
    code: 500,
    codeMessage: "INTERNAL_SERVER_ERROR",
    message: getMessageByCode("INTERNAL_SERVER_ERROR"),
    data: def,
  };
}

function validateRedirect(code, message) {
  if (code === 402) {
    // case license expire
    window.location.href = `${window.location.origin}/license-expire`;
  } else if (code === 400 && message === "Portal not found") {
    // case license expire
    window.location.href = `${window.location.origin}/login`;
  } else if (code === 401) {
    window.location.href = `${window.location.origin}/login`;
  }
}
export function getMessageByCode(messageCode, def) {
  if (def === undefined) {
    def = "Error happened. Please try again.";
  }
  const tempt = MESSAGES[messageCode];
  if (tempt === undefined) {
    return def;
  }
  return tempt;
}
