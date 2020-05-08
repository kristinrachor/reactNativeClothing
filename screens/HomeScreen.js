import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from 'react-native';


import { MonoText } from '../components/StyledText';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function HomeScreen({navigation}) {
  function onPressItem(){
    navigation.navigate('Person', {name: 'Jane'});
  };

  function addItem(){
    alert('Add item')
  }
  
  function Item({ title }){
    return (
      <View style={styles.item}>
        <Text style={styles.title} onPress={onPressItem}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text> Family Clothing Sizes App </Text>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <Button
            onPress={addItem}
            title="Add person"
        />

        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title}/>}
          keyExtractor={item => item.id}
        />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: '30%',
    marginBottom: '30%',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    padding: 20,
    marginVertical: 5,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
