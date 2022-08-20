import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import themes from '../assets/config/themes';

import Icon from 'react-native-vector-icons/Ionicons';
import {getRecipeByQuery} from '../api/client';
import SearchModel from '../components/SearchModel';
import Recipe from '../components/Recipe';
import FilterModel from '../components/FilterModel';

const RecipeSearchScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [calories, setCalories] = useState(1500);
  const [health, setHealth] = useState('balanced');
  const [to, setTo] = useState(10);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getRecipeByQuery(query.length === 0 ? 'All' : query, 0, 10)
      .then(({hits}) => {
        if (!hits) {
          return;
        }
        setRecipes(hits);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What would you like to cook?</Text>
        
        <View>
          <SearchModel
            query={query}
            setQuery={setQuery}
            setLoading={setLoading}
            setRecipes={setRecipes}
          />
          <View style={[styles.contentContainer]}>
            <Text style={[styles.title]}>Recipie</Text>
            {loading ? (
              <View style={{height: 100, justifyContent: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                  }}>
                  Loading...
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    textAlign: 'center',

                    fontSize: 19,
                  }}>
                  Note : Internet is required
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  Wait for an minute
                </Text>
              </View>
            ) : (
              <>
                {recipes.length === 0 ? (
                  <View
                    style={{height: height / 1.7, justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 22,
                      }}>
                      No result Found : (
                    </Text>
                  </View>
                ) : (
                  <Recipe data={recipes} />
                )}
              </>
            )}
          </View>
          {!showFilter ? (
            <TouchableOpacity
              onPress={() => {
                setShowFilter(true);
              }}
              style={styles.filter}>
              <Icon name="layers" color="#fff" size={20} />
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 17,
                  marginLeft: 10,
                }}>
                Filter
              </Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          {showFilter ? (
            <View style={styles.modelFilter}>
              <FilterModel
                setRecipes={setRecipes}
                query={query.length === 0 ? 'Trending' : query}
                setShowFilter={setShowFilter}
                setLoading={setLoading}
                calories={calories}
                setCalories={setCalories}
                to={to}
                setTo={setTo}
                health={health}
                setHealth={setHealth}
                setQuery={setQuery}
              />
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeSearchScreen;

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    margin: 10,
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: '#41423F',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,

    // paddingTop: 50,
  },
  
});
