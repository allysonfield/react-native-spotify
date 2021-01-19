import React from 'react';

import {Container, Title, SlideScroll} from './styles';
import Card from '../Card';
import {TextInput} from 'react-native-gesture-handler';

const SlideCard = ({slide, goAlbum, track}) => {
  // const goAlbum = item => {
  //   console.warn(item);
  //   console.warn(props);
  //   // props.navigation.navigate('Album', { album: item.album });
  // };
  // const goScreen = (item) => {
  //   goAlbum({
  //     item,
  //   });
  // }
  return (
    <Container>
      {/* <Title>{slide.name}</Title> */}
      {/* <SlideScroll>
        {slide.itens &&
          slide.itens.map((itens, index) => <Card key={index} itens={itens} />)}
      </SlideScroll> */}

      <SlideScroll
        data={track}
        keyExtractor={item => String(item.id)}
        renderItem={
          ({item, index}) => (
            <Card onPress={() => goAlbum(item)} itens={item} key={0} />
          )
          // slide.itens.map((itens, index) => (
          //   <Card onPress={props.onPress} key={index} itens={itens} />
          // ))
        }
      />
    </Container>
  );
};

export default SlideCard;
