import axios from "axios";

export const titleFormat = (name) => {
  const result = name.replaceAll("-", " ");
  return result;
};

export const getCartItems = async (user_id) => {
  try {
    const { data } = await axios.post("http://localhost:8001/getCartItems", {
      user_id: user_id,
    });
    return data;
  } catch (error) {
    console.log("getCartItems");
  }
};

export const emptyCart = async (user_id) => {
  try {
    axios.post("http://localhost:8001/emptyCart", { user_id });
  } catch (error) {
    console.log(error.message);
  }
};
