import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';


export default function ListItem(props) {
    return (
        <View style={styles.item}>
          <Text style={styles.title} onPress={props.onPressItem}>{props.title}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      padding: 20,
      marginVertical: 5,
    },
    title: {
      fontSize: 24,
    },
  });
  