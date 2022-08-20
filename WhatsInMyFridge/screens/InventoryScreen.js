import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  SafeAreaView
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import themes from '../assets/config/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InventoryScreen = () => {

  const {user, logout} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [itemImageSrc, setItemImageSrc] = useState();

  useEffect(() => {
    getInventory();
  }, []);

  getInventory = async () => {
    setIsLoading(true);

    const snapshot = await firestore()
      .collection('Inventory')
      .where('userId', 'in', [user.uid])
      .where('expiryFlag','==', false)
      .get();

    if (!snapshot.empty) {
      let newInventory = [];

     for (let i = 0; i < snapshot.docs.length; i++) {
        newInventory.push(snapshot.docs[i].data());
      }
      console.log(lastDoc);
      setInventory(newInventory);
    } 

    console.log(inventory[0].imageSrc);
  };

  selectImage = ({category})=>{
    if(category =='Dairy'){
      setItemImageSrc(require('../assets/icon/milk.png'))
    }
    else if(category =='Meat'){
      setItemImageSrc(require('../assets/icon/meat.png'))
    }
    else if(category =='Vegetables'){
      <Image source={require('../assets/icon/vegetables.png')} />
    }
  };

  renderList = ({itemName, category, expiryDate, purchaseDate,quantity,imageSrc}) => {
    selectImage(category);
    return (
      <Pressable style={styles.item}>
        <Image style={styles.image} source={imageSrc} />
        <View style={styles.body}>
          <Text style={styles.titleItem}>{itemName}</Text>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Icon style={styles.footerItemIcon} name="fridge-outline" color="#3c404f" size={20} />
              <Text style={styles.footerItemText}>{category}</Text>
              <Icon style={styles.footerItemIcon} name="calendar" color="#3164d4" size={20} />
              <Text style={styles.footerItemText}>{new Date(purchaseDate.toDate()).toDateString()}</Text>
            </View>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
            <Icon style={styles.footerItemIcon} name="purse" color="#de6952" size={20} />
              <Text style={styles.footerItemText}>{quantity}</Text>
              <Icon style={styles.footerItemIcon} name="alert-octagon" color="#db1d1d" size={20} />
              <Text style={styles.footerItemText}>{new Date(expiryDate.toDate()).toDateString()}</Text>
            </View>
          </View>
          <Pressable style={styles.buttonHeart}>
            <Icon name="check-circle-outline" color="#47b037" size={20} />
          </Pressable>
        </View>
      </Pressable>
      
    );
  };

  return (
    <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
      <FlatList data={inventory} renderItem={({item}) => renderList(item)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: 'gray',
  },
  starCon: {
    flexDirection: 'row',
    marginVertical: 9,
  },
  star: {
    marginRight: 5,
  },
  titleItem: {
    fontSize: 20,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius:10,
    borderWidth:1,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  body: {
    paddingHorizontal: 20,
    flex: 1,    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: themes.colors.main,
    alignSelf: 'center',
    marginTop: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerItemIcon:{
    margin: 10,
  },
  footerItemText: {
    fontSize: 16,
    color: 'gray',
    margin: 5,
    fontWeight: '500',
  },
  iconHeart: {
    tintColor: themes.colors.main,
  },
  buttonHeart: {
    position: 'absolute',
    right: 25,
    top: 1,
  },
  itemScroll: {
    width: 10,
  },
});

export default InventoryScreen;
