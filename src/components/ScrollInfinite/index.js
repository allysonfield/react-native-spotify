import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Title, IconGenre, ContainerRow} from './styles';
export default function ScrollInfinite({
  data,
  key,
  Bt,
  Tp,
  clicked,
  setClicked,
  fetchData,
  selectTo,
}) {
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => selectTo(item.id, item.name)}>
      <ContainerRow>
        <Title>{item.name}</Title>

        {item.images && (
          <IconGenre
            style={{height: 50, width: 50, backgroundColor: '#888'}}
            source={{uri: item.images[0].url}}
          />
        )}
      </ContainerRow>
    </TouchableOpacity>
  );
  return (
    <View style={{marginBottom: Bt, marginTop: Tp}}>
      <FlatList
        style={{marginTop: 30, zIndex: 30, display: clicked ? 'flex' : 'none'}}
        contentContainerStyle={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={fetchData}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    width: '100%',
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
