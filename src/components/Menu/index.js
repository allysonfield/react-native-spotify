import * as React from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import mock from '.././../JSON/mock.json';
const MenuCountry = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 40,
          position: 'relative',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          {mock.map(obj => (
            <>
              <Menu.Item onPress={() => {}} title={obj.country} />
              <Divider />
            </>
          ))}
        </Menu>
      </View>
    </Provider>
  );
};

export default MenuCountry;
