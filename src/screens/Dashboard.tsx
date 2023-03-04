import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Dashboard = ({navigation}: {navigation: any}) => (
  <SafeAreaView style={styles.lightBackground}>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
    <ScrollView
      style={[styles.lightBackground, styles.padded]}
      contentContainerStyle={styles.container}>
      <Text style={styles.text}>Get started</Text>
      <Button
        style={styles.button}
        mode="contained"
        compact={true}
        uppercase={true}
        onPress={() => navigation.navigate('Manage Categories')}>
        <Text style={styles.text}>Add A Category</Text>
      </Button>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  lightBackground: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padded: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 44,
    borderRadius: 8,
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
  },
});
export {Dashboard};
