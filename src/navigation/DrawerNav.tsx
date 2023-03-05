import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {Dashboard, Machines, Categories} from '../screens';
import {RootState} from '../redux/Store';
import {Category} from '../models';

const Drawer = createDrawerNavigator();

const DrawerNav = (): JSX.Element => {
  const storedState = useSelector((state: RootState) => state);
  const {category} = storedState;

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* loop categories and list them here */}
      {Array.isArray(category) &&
        category.length > 0 &&
        category.map((categ: Category, idx: number) => {
          if (categ.name !== undefined && categ.name !== 'New Category') {
            return (
              <Drawer.Screen
                key={idx}
                name={categ.name}
                component={Machines}
                initialParams={{categoryId: categ.id}}
              />
            );
          }
        })}
      {/* end loop categories */}
      <Drawer.Screen name="Manage Categories" component={Categories} />
    </Drawer.Navigator>
  );
};

export {DrawerNav};
