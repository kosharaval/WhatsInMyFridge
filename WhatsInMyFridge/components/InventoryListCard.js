import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import themes from '../assets/config/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const w = Dimensions.get('screen').width;

const InventoryListCard = ({onPress}) => {
  const reviews = [
    {
      name: 'Apples',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/vegetables.png'),
    },
    {
      name: 'Bread',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/bread.png'),
    },
    {
      name: 'Chiken',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/meat.png'),
    },
    {
      name: 'Milk',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/milk.png'),
    },
    {
      name: 'Tomato',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/vegetables.png'),
    },
    {
      name: 'Apples',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/vegetables.png'),
    },
    {
      name: 'Bread',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/bread.png'),
    },
    {
      name: 'Chiken',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/meat.png'),
    },
    {
      name: 'Milk',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/milk.png'),
    },
    {
      name: 'Tomato',
      quantity: 5,
      categoryName: 'Produce',
      purchaseDate: '12-11-2021',
      expiryDate: '17-11-2021',
      expiredFlag: 'false',
      shoppingFlag: 'false',
      usedFlag: 'false',
      imageSrc: require('../assets/icon/vegetables.png'),
    },
  ];

  const renderItem = ({item}) => {
    
    return (
      <Pressable style={styles.item} onPress={onPress}>
        <Image style={styles.image} source={item.imageSrc} />
        <View style={styles.body}>
          <Text style={styles.titleItem}>{item.name}</Text>

          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Icon name="purse" color="#777777" size={20} />
              <Text style={styles.footerItemText}>{item.expiryDate}</Text>
            </View>
            <Text style={styles.footerItemText}></Text>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Icon name="alert-octagon" color="#777777" size={20} />
              <Text style={styles.footerItemText}>{item.expiryDate}</Text>
            </View>
            <Text style={styles.footerItemText}></Text>
          </View>

          <Pressable style={styles.buttonHeart}>
            <Icon name="heart-outline" color="#777777" size={20} />
          </Pressable>
        </View>
      </Pressable>
    );
  };
  return (
    <View >
      <FlatList
        nestedScrollEnabled
        scrollEnabled={true}
        renderItem={renderItem}
        data={reviews}
      />
    </View>
  );
};

export default InventoryListCard;

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
    width: 75,
    height: 75,
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
  footerItemText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
    fontWeight: '500',
  },
  iconHeart: {
    tintColor: themes.colors.main,
  },
  buttonHeart: {
    position: 'absolute',
    right: 15,
    top: 1,
  },
  itemScroll: {
    width: w - 30,
  },
});
