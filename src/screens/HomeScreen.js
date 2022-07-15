import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ArticleComponent from '../components/ArticleComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//actions
import {
  GetAllData,
  RenderMoreSearchData,
  ResetData,
  SearchData,
} from '../Redux/Actions/Actions';

let background = require('../../assets/images/NYTimesBackground.png');

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const news = useSelector(state => state.news);
  const {article, error, loading} = news;

  useEffect(() => {
    dispatch(GetAllData(page));
    setPage(page + 2);
  }, []);

  const handleSearch = () => {
    if (search && search !== '') {
      dispatch(SearchData(search));
      setPage(2);
    } else {
      dispatch(GetAllData());
    }
  };

  const handleRefresh = async () => {
    setRefresh(true);
    setPage(0);
    dispatch(ResetData())
      .then(() => dispatch(GetAllData()))
      .then(() => setRefresh(false))
      .catch(err => console.error(err));
  };

  const LoadMoreInfo = async () => {
    setPage(page + 2);
    setIsLoading(true);
    if (search && search !== '') {
      dispatch(RenderMoreSearchData(search, page))
        .then(() => setIsLoading(false))
        .catch(err => console.error(err));
    } else {
      dispatch(GetAllData(page))
        .then(() => setIsLoading(false))
        .catch(err => console.error(err));
    }
  };
  const renderFooter = () => {
    return isLoading ? (
      <View style={{marginVertical: 16, height: 30}}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    ) : (
      <View style={{height: 31, marginVertical: 10}} />
    );
  };
  return (
    <View style={styles.container}>
      <Image source={background} style={styles.imageBackground} />
      <View style={styles.inputButtonContainer}>
        <TextInput
          placeholder={'Search...'}
          value={search}
          onChangeText={x => {
            setSearch(x);
          }}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <FontAwesome name={'search'} size={22} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color="#999999" />
        ) : error ? (
          <Text style={styles.MidText}>
            Something Went Wrong Please Try again
          </Text>
        ) : (
          <FlatList
            data={article}
            key={item => item._id}
            renderItem={({item}) => (
              <ArticleComponent article={item} navigation={navigation} />
            )}
            onRefresh={handleRefresh}
            refreshing={refresh}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 2,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    marginVertical: 10,
                  }}
                />
              );
            }}
            ListFooterComponent={renderFooter}
            onEndReached={() =>
              isLoading ? console.log('loading') : LoadMoreInfo()
            }
            // add onEmpty component
            // ListEmptyComponent= {() => { return (<View>)}}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: 140,
  },
  input: {
    width: '80%',
    borderWidth: 2,
    marginVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    height: 44,
    fontSize: 14,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'black',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 44,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MidText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    alignSelf: 'center',
    width: '60%',
  },
  inputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
});
