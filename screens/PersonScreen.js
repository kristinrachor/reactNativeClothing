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

class PersonScreen extends React.Component {
//export default function PersonScreen({props}) {
  constructor(props) {
   super(props);
    this.state = {
      counter: 0,
      value: "kristin",
      shirtSize: 0,
      pantSize: 0,
      shoeSize: 0,
    }
  }

  componentDidMount(){
    //console.warn("BLAHHHH")
  };

  onChangeText = (text, item) => {
    console.warn('blah', this.props.navigation.state.params.name)
    if(item === "shirt"){
      this.setState({shirtSize: text})
    }
    this.setState({value: text});
  }
  //const [value, onChangeText] = React.useState('Useless Placeholder');

  render(){
    return(
      <View>
        <Text> {this.props.navigation.state.params.name} </Text>

        <Text> Shirt Size </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "shirt")}
          value={this.state.shirtSize}
        />

        <Text> Pants Size </Text>
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "pants")}
          value={this.state.pantSize}
        />

        <Text> Shoe Size </Text>
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeText(text, "shoes")}
          value={this.state.shoeSize}
        />
      </View>
    );
  }
}

export default PersonScreen;

PersonScreen.navigationOptions = {
  title: "this.props.navigation.state.params.name",
};
