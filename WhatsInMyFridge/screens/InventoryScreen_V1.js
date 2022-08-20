import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import InventoryListCard from '../components/InventoryListCard';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import themes from '../assets/config/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InventoryScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [itemList, setItemListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = [];
  const getItems = async () => {
    try {
      await firestore()
        .collection('Inventory')
        .where('userId', 'in', [user.uid])
        .get()
        .then(querySnapshot => {
          console.log('Total items: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.exists) {
              const listItem = documentSnapshot.data();
              listItem.id = documentSnapshot.id;
              list.push(listItem);

              
            }
          });
        });
      setItemListData(
        list.map((listItem, index) => ({
        key: `${index}`,
        itemName: listItem.itemName,
        category: listItem.category,
      })));
      console.log(list);
      if (loading) {
        setLoading(false);
      }
      console.log('Items: ', itemList);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    getItems();
    console.log(itemList);
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const renderItem = (items) => {
    return (
      <Pressable style={styles.item}>
        {/* <Image style={styles.image} source={item.imageSrc} /> */}
        <View style={styles.body}>
          <Text style={styles.titleItem}>{items.itemName}</Text>

          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Icon name="purse" color="#777777" size={20} />
              <Text style={styles.footerItemText}>{items.category}</Text>
            </View>
            <Text style={styles.footerItemText}></Text>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.footerItem}>
              <Icon name="alert-octagon" color="#777777" size={20} />
              <Text style={styles.footerItemText}>hello</Text>
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
    <SafeAreaView style={styles.container} nestedScrollEnabled={true}>
      <InventoryListCard />
      <FlatList
        data={itemList}
        nestedScrollEnabled
        scrollEnabled={true}
        renderItem={renderItem}
      />
      

    </SafeAreaView>
  );
};

export default InventoryScreen;

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
    width: 10,
  },
});
