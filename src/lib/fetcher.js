const BASE = async ({ url, method, body }) => {
  let fetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
  };
  if (body) {
    fetchOptions.body = body;
  }
  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  if (!response.ok) {
    console.log(url, { response });
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const GET = async ({ url }) => {
  return await BASE({ url, method: "GET" });
};

const POST = async ({ url, body }) => {
  return await BASE({ url, method: "POST", body });
};

const PUT = async ({ url, body }) => {
  return await BASE({ url, method: "PUT", body });
};

const PATCH = async ({ url, body }) => {
  return await BASE({ url, method: "PATCH", body });
};

export { GET, POST, PUT, PATCH };
