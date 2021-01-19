import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Photo,
  ContainerSubtitle,
  SubtitleDescription,
  SubtitleTitle,
} from './styles';

const Card = ({itens, ...props}) => {
  return (
    <Container>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.onPress(itens.track.id)}>
        <Photo source={{uri: itens.track.album.images[0].url}} />
        <ContainerSubtitle>
          <SubtitleTitle>{itens.track.name}</SubtitleTitle>
          {/* <SubtitleDescription>
            {itens.track.artists[0].name}
          </SubtitleDescription> */}
        </ContainerSubtitle>
      </TouchableOpacity>
    </Container>
  );
};

export default Card;
