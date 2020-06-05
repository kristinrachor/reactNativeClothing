import React from 'react';
//import { ExpoConfigView } from '@expo/samples';
import {
  Text,
  View,
  Button,
  TextInput
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
    return(
      <View>
        <Text> {this.props.navigation.state.params.name} </Text>

        <Text> Shirt Size </Text>
        <TextInput
          keyboardType="numeric"
          returnKeyType="go"
          maxLength={3}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "shirt")}
          value={this.state.shirtSize}
        />

        <Text> Pants Size </Text>
         <TextInput
          keyboardType="numeric"
          returnKeyType="go"
          maxLength={3}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "pants")}
          value={this.state.pantSize}
        />

        <Text> Shoe Size </Text>
         <TextInput
          keyboardType="numeric"
          returnKeyType="go"
          maxLength={3}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "shoes")}
          value={this.state.shoeSize}
        />

        <Button
          onPress={() => this.saveSizes()}
          title="Save Sizes"
          color="#841584"
          accessibilityLabel="Save your clothing sizes for ___"
        />
        <Icon
            raised
            name='trash'
            type='font-awesome'
            onPress={() => this.deleteUser()} />

      </View>
    );
  }
}

export default PersonScreen;

PersonScreen.navigationOptions = {
  title: "Person sizes",
};
