import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import { AsyncStorage } from 'react-native';


class PersonScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shirtSize: 0,
      pantSize: 0,
      shoeSize: 0,
    }
  }

  componentDidMount(){
      this.retrieveItem('shirtSize')
  };

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      console.warn("item", item);
      if(item !== {}){
        this.setState({
          shirtSize: item.shirtSize,
          pantSize: item.pantSize,
          shoeSize: item.shoeSize
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('sizes', JSON.stringify(this.state))
    } catch (e) {
      // saving error
      console.error("DIDINT SAVE");
    }
  }

  saveSizes(){
    this.storeData()
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

      </View>
    );
  }
}

export default PersonScreen;

PersonScreen.navigationOptions = {
  title: "Person sizes",
};
