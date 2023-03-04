import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dashboard, Machines, Categories} from '../screens';

const Drawer = createDrawerNavigator();

const DrawerNav = (): JSX.Element => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* loop categories and list them here */}
      <Drawer.Screen name="Bull Dozers" component={Machines} />
      {/* end loop categories */}
      <Drawer.Screen name="Manage Categories" component={Categories} />
    </Drawer.Navigator>
  );
};

export {DrawerNav};
