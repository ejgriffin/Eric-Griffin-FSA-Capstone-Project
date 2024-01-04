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

export const registerUser = async (userObj) => {
  try {
    const rsp = await fetch(`${APIURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userObj.email,
        username: userObj.username,
        password: userObj.password,
        name: {
          firstname: userObj.name.firstname,
          lastname: userObj.name.lastname,
        },
        address: {
          city: userObj.address.city,
          street: userObj.address.street,
          number: userObj.address.number,
          zipcode: userObj.address.zipcode,
          geolocation: {
            lat: userObj.geolocation.lat,
            long: userObj.geolocation.long,
          },
        },
        phone: userObj.phone,
      }),
    });
    const json = await rsp.json();
    console.log("registerUser", json);
    return json.token;
  } catch (err) {
    console.error(err);
  }
};
