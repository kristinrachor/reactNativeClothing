import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Modal,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import ListItem from '../components/ListItem'
import { AsyncStorage } from 'react-native';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {

  constructor (props){
    super(props);

    this.state={
      counter: 1,
      modalVisible: false,
      currentModalText: '',
      personList: [
        {
          id: '0',
          title: 'My Sizes'
        }
      ]
    }
  }

  componentDidMount(){
    this.retrieveItem('personList')
  };

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      if(item.length != 0){
        this.setState({
          personList: item
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  onPressItem = (item) => {
    console.warn("BLAHHH", item)
    this.props.navigation.navigate('Person', {name: item.title});
  };

  openModal = () =>  {
    this.setState({
      modalVisible: true,
    });
  }

  onChangeTextModal(text){
    this.setState({currentModalText: text})
  }

  createNewPerson(){
    let {personList, counter, currentModalText} = this.state;
    personList.push({id: counter, title: currentModalText})
    counter++;
    this.storeData(personList)
    this.setState({
      modalVisible: false,
      personList: personList, 
      counter: counter,
      currentModalText: '',
    });
  }

  storeData = async (personList) => {
    try {
      console.warn("saving");
      console.warn(personList)
      await AsyncStorage.setItem('personList', JSON.stringify(personList))
    } catch (e) {
      // saving error
      console.error(e);
    }
  }
  
  render(){
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
              onPress={this.openModal}
              title="Add person"
          />

          <FlatList
            data={this.state.personList}
            renderItem={({ item }) => <ListItem title={item.title} onPressItem={() =>this.onPressItem(item)}/>}
            keyExtractor={item => item.id}
          />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> Add Person </Text>
              <TextInput
                returnKeyType="go"
                maxLength={30}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.onChangeTextModal(text)}
                value={this.state.currentModalText}
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {this.createNewPerson()}}
              >
                <Text style={styles.textStyle}>Create</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default HomeScreen;


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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '75%',
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
