import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Photo,
  ContainerSubtitle,
  SubtitleDescription,
  SubtitleTitle,
} from './styles';

const Card = ({album, name, artists, goAlbum}) => {
  return (
    <Container>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => goAlbum(artists[0].id)}>
        <Photo source={{uri: album.images[0].url}} />
        <ContainerSubtitle>
          <SubtitleTitle>{name}</SubtitleTitle>
          <SubtitleDescription>{artists[0].name}</SubtitleDescription>
        </ContainerSubtitle>
      </TouchableOpacity>
    </Container>
  );
};

export default Card;
