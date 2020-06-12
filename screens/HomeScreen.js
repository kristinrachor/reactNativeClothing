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
import { Icon } from 'react-native-elements'
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
    this.retrieveItem('counter')
  };

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      if(item.length != 0){
        this.setState({
          [key]: item
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  onPressItem = (item) => {
    this.props.navigation.navigate('Person', {name: item.title, id: item.id, personList: this.state.personList});
  };

  openModal = () =>  {
    this.setState({
      modalVisible: true,
    });
  }

  closeModal = () =>  {
    this.setState({
      modalVisible: false,
    });
  }

  onChangeTextModal(text){
    this.setState({currentModalText: text})
  }

  createNewPerson(){
    let {personList, counter, currentModalText} = this.state;
    personList.push({id: counter, title: currentModalText})
    counter++;
    this.storeData(personList, "personList")
    this.storeData(counter, "counter")
    this.setState({
      modalVisible: false,
      personList: personList, 
      counter: counter,
      currentModalText: '',
    });
  }

  storeData = async (item, name) => {
    try {
      console.warn("saving");
      console.warn(name)
      await AsyncStorage.setItem(name, JSON.stringify(item))
    } catch (e) {
      // saving error
      console.error(e);
    }
  }
  
  render(){
    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/family-sizes-logo.png')
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
            renderItem={({ item }) => 
              <ListItem 
                title={item.title} 
                rightIcon={{           
                  name:'av-timer'
                }}
                onPressItem={() =>this.onPressItem(item)}
              />
            }
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
                style={styles.textBox}
                onChangeText={text => this.onChangeTextModal(text)}
                value={this.state.currentModalText}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {this.closeModal()}}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {this.createNewPerson()}}
                >
                  <Text style={styles.textStyle}>Create</Text>
                </TouchableHighlight>
              </View>
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
  buttonContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: 150,
    height: 110,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  textStyle: {
    color: "black",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textBox:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 150
  }
});
