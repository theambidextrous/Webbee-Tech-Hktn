import React from 'react';
import {View} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {Appbar, Text} from 'react-native-paper';

const Machines = ({navigation}: {navigation: any}) => (
  <View>
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title="Manage Machines" />
    </Appbar.Header>
    <Text>Get started</Text>
  </View>
);

export {Machines};
