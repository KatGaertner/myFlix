export const checkAuth = (response) => {
  if (response.statusText === "Unauthorized") {
    throw Error(response.statusText);
  }
};

export const readErrors = (response) => {
  let contentType = response.headers.get("content-type");
  if (contentType) {
    if (contentType.includes("text/html")) {
      response.text().then((info) => {
        alert(info);
      });
    } else if (contentType.includes("application/json")) {
      response.json().then((info) => {
        const message = info.errors.map((e) => e.msg).join("\n");
        alert(message);
      });
    }
  }
};
