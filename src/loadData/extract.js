import firebase from "firebase";

export async function getMyShopProduct(userId) {
  const response = await firebase
    .firestore()
    .collection("products")
    .where("seller_uid", "==", userId);

  return response;
}

export async function getAllProducts() {
  const response = await firebase.firestore().collection("products").get();

  const allproducts = response.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return await allproducts;
}

export async function getActiveUser(userId) {
  const response = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId);

  return response;
}

export async function getUserBasket(userId) {
  const response = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
}

export async function getMyOrder(userId) {
  const response = await firebase
    .firestore()
    .collection("orders")
    .where("buyer_uid", "==", userId);

  // const allproducts = response.docs.map((item) => ({
  //   ...item.data(),
  //   id: item.id,
  // }));
  return response;
}

export async function getMySalesOrder(userId) {
  const response = await firebase
    .firestore()
    .collection("orders")
    .where("seller_uid", "==", userId)
    

  // const allproducts = response.docs.map((item) => ({
  //   ...item.data(),
  //   id: item.id,
  // }));
  return response;
}
