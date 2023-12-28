const APIURL = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${APIURL}/products`);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
};
