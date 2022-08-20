import { ReactNativeFirebase } from "@react-native-firebase/app";
import { firebase } from "@react-native-firebase/firestore";

export function addToInventory(itemInvetory, addComplete){

    firebase.firestore()
    .collection('Inventory')
    .add({
        Name: itemInvetory.Name,
        Quantity: itemInvetory.Quantity,
        CategoryName: itemInvetory.CategoryName,
        PurchaseDate: firebase.firestore.FieldValue.serverTimestamp(),
        ExpiryDate: itemInvetory.ExpiryDate,
        ExpiredFlag: false,
        ShoppingFlag: false,
        UsedFlag: false
    }).then((snapshot) => snapshot.get())
    .then((inventoryData) => addComplete(inventoryData.data()))
    .catch((error) => console.log(error));
}

export async function getInvetoryItems(InvetoryList){

    var inventoryList = [];

    var snapshot = await firebase.firestore()
    .collection('Inventory')
    .orderBy('PurchasheDate')
    .get()

    snapshot.forEach((doc)=>{
        inventoryList.push(doc.data());
    });
    console.log(inventoryList);
    InvetoryList(inventoryList);
}