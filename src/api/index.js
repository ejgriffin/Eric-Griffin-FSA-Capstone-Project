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

export const getAllElectronics = async () => {
  try {
    const response = await fetch(`${APIURL}/products/category/electronics`);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const getAllJewelry = async () => {
  try {
    const response = await fetch(`${APIURL}/products/category/jewelery`);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const getAllMens = async () => {
  try {
    const response = await fetch(
      `${APIURL}/products/category/men%27s%20clothing`
    );
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const getAllWomens = async () => {
  try {
    const response = await fetch(
      `${APIURL}/products/category/women%27s%20clothing`
    );
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userObj.username,
        password: userObj.password,
      }),
    });

    const json = await rsp.json();
    console.log(json);
    return json.token;
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (token) => {
  try {
    const rsp = await fetch(`${APIURL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await rsp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${APIURL}/users`);
    const json = await response.json();

    return json;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userObj) => {
  try {
    const rsp = await fetch(`${APIURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const json = await rsp.json();
    console.log("registerUser", json);
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const getUserCart = async (userId) => {
  try {
    const rsp = await fetch(`${APIURL}/carts/user/${userId}`);
    const json = await rsp.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
