const APIURL = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${APIURL}/products`);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${APIURL}/products/${id}`);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userObj) => {
  try {
    const rsp = await fetch(`${APIURL}/auth/login`, {
      method: "POST",

      body: JSON.stringify({
        username: userObj.username,
        password: userObj.password,
      }),
    });
    const json = await rsp.json();

    return json.token;
  } catch (err) {
    console.error(err);
  }
};
