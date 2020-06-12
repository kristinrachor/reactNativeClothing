import React from 'react';
//import { ExpoConfigView } from '@expo/samples';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableHighlight,

} from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'



class PersonScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shirtSize: "0",
      pantSize: "0",
      shoeSize: "0",
      edit: false
    }
  }

  componentDidMount(){
    let key = "sizes" + this.props.navigation.state.params.id;
    this.retrieveItem(key)
  };

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      if(this.retrieveItem){
        const item = JSON.parse(retrievedItem);
        if(item !== null && item.shirtSize !== null && item.pantSize !== null && item.shoeSize !== null){
          this.setState({
            shirtSize: item.shirtSize,
            pantSize: item.pantSize,
            shoeSize: item.shoeSize
          });
        }
      }else{
        console.warn("no retrievedItem")
        this.setState({
            shirtSize: "0",
            pantSize: "0",
            shoeSize: "0",
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  storeSizes = async () => {
    try {
      let key = "sizes" + this.props.navigation.state.params.id;
      await AsyncStorage.setItem(key, JSON.stringify(this.state))
    } catch (e) {
      // saving error
      console.error("DIDINT SAVE");
    }
  }

  deleteUser = async () => {
    try {
      let personList = this.props.navigation.state.params.personList;
      let id = this.props.navigation.state.params.id;
      personList.splice(id, 1);
      await AsyncStorage.setItem('personList', JSON.stringify(personList))
      this.props.navigation.navigate('Home');
    } catch (e) {
      // saving error
      console.error("DIDINT SAVE");
    }
  }

  saveSizes(){
    this.storeSizes()
    this.setState({
      edit: false
    })
  }

  editFields(){
    this.setState({
      edit: true
    })
  }

  onChangeText(text, item){
    if(item === "shirt"){
      this.setState({shirtSize: text})
    }else if(item === "pants"){
      this.setState({pantSize: text})
    }else if(item === "shoes"){
      this.setState({shoeSize: text})
    }
  }

  render(){
    //let editItems = 'none'// this.state.edit ? 'block' : 'none';
    //let staticItems = 'block'//this.state.edit ? 'none' : 'block';

    return(
      <View>
        <Text> {this.props.navigation.state.params.name} </Text>

        <View style={styles.sideBySideContainer}>
          <Text> Shirt Size </Text>

          {this.state.edit ?
            <TextInput
              keyboardType="numeric"
              returnKeyType="go"
              maxLength={5}
              style={styles.textBox}
              onChangeText={text => this.onChangeText(text, "shirt")}
              value={this.state.shirtSize}
            />
            :
            <Text> {this.state.shirtSize} </Text>
          }
        </View>
        <View style={styles.sideBySideContainer}>
          <Text> Pants Size </Text>
          {this.state.edit ?
            <TextInput
              keyboardType="numeric"
              returnKeyType="go"
              maxLength={5}
              style={styles.textBox}
              onChangeText={text => this.onChangeText(text, "pants")}
              value={this.state.pantSize}
            />
            :
            <Text> {this.state.pantSize} </Text>
          }
        </View>
        <View style={styles.sideBySideContainer}>
            <Text> Shoe Size </Text>
            {this.state.edit ?
            <TextInput
              keyboardType="numeric"
              returnKeyType="go"
              maxLength={5}
              style={styles.textBox}
              onChangeText={text => this.onChangeText(text, "shoe")}
              value={this.state.shoeSize}
            />
            :
            <Text> {this.state.shoeSize} </Text>
          }
        </View>

        <View style={styles.sideBySideContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.deleteUser()}
          >
            <Text style={styles.textStyle}>Delete Person</Text>
          </TouchableHighlight>
          {this.state.edit ?
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.saveSizes()}
            >
              <Text style={styles.textStyle}>Save Sizes</Text>
            </TouchableHighlight>
            :
            <TouchableHighlight
              style={styles.button}
              onPress={() => {this.editFields()}}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableHighlight>
          }
        </View>

      </View>
    );
  }
}

export default PersonScreen;

PersonScreen.navigationOptions = {
  title: "Person sizes",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sideBySideContainer: {
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
  button: {
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
