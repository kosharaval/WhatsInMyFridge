import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {getRecipeByQuery} from '../api/client';
import themes from '../assets/config/themes';

function SearchModel({query, setQuery, setRecipes, setLoading}) {
  const handleSearchRecipe = () => {
    setLoading(true);
    getRecipeByQuery(query.length === 0 ? 'All' : query, 0, 10)
      .then(({hits}) => {
        if (!hits) {
          // keytool -genkey -v -keystore hari_recipe_app.keystore -alias hari_recipe_app-keyalg RSA -keysize 2048 -validity 10000
          return;
        }
        setRecipes(hits);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <View style={styles.iconsearch}>
          <Image source={require('../assets/icon/search.png')} />
        </View>
        <TextInput
          value={query}
          onChangeText={e => setQuery(e)}
          placeholderTextColor="#A5ACAE"
          style={styles.inputSearch}
          onSubmitEditing={handleSearchRecipe}
          placeholder="Find a recipe"
        />
        <View style={styles.filterButton}>
          <Image source={require('../assets/icon/filter.png')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F4EC',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: themes.colors.main,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputSearch: {
    flex: 1,
    padding: 10,
  },
  iconsearch: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchModel;
