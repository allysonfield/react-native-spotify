import React, {useState, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  ContainerHeader,
  ContainerNavBar,
  GroupItemNavBar,
  ButtonFollow,
  ContainerInfoBand,
  BandName,
  BandFooter,
  Photo,
  Content,
  ButtonRandomOrder,
  ButtonRandomOrderText,
  InfoCategory,
  ContainerMusic,
  MusicGroupAllItens,
  MusicGroupItens,
  Music,
  MusicNumber,
  MusicName,
  MusicListening,
} from './styles';

// import musics from './music.json';
import TabBar from '../../components/TabBar';
import {toptracks} from '../../services/Filter/top-tracks';
import Console from '../../Utils/console';

const Album = ({navigation, route}) => {
  const [detail, setDetail] = useState(null);
  const [iconConfigure] = useState({
    size: 16,
    color: '#fff',
  });
  useEffect(() => {
    console.log('props', route);
    async function init() {
      try {
        const top = await toptracks(route.params.id, route.params.token);
        console.log('top', top);
        setDetail(top);
      } catch (error) {
        Console('error', error);
      }
    }
    init();
  }, [route]);
  const musicsC = musics => {
    if (musics) {
      return (
        // musics &&
        musics.map((album, index) => (
          <Music key={index++}>
            {/* <Photo
              source={{
                uri: album.album.images[0].url,
              }}
            /> */}
            <MusicGroupAllItens>
              <MusicNumber>{index++}</MusicNumber>

              <MusicName>{album.album.name}</MusicName>
              {/* <MusicListening>{album.album.name}</MusicListening> */}
            </MusicGroupAllItens>
            <Icon
              name="ellipsis-v"
              color="#aaa"
              size={16}
              style={{padding: 30}}
            />
          </Music>
        ))
      );
    }
  };
  const goBack = () => {
    navigation.pop();
  };
  return (
    <Container>
      <ContainerHeader>
        <ContainerHeader>
          <Photo
            source={{
              uri: detail && detail[0].album.images[0].url,
            }}
          />
          <ContainerNavBar>
            <Icon
              onPress={() => goBack()}
              name="arrow-left"
              {...iconConfigure}
            />
            {/* <GroupItemNavBar>
              <ButtonFollow>Seguindo</ButtonFollow>
              <Icon name="ellipsis-v" {...iconConfigure} />
            </GroupItemNavBar> */}
          </ContainerNavBar>
          {/* <ContainerInfoBand>
          <BandName>{detail && detail.name}</BandName>
          <BandFooter>{detail && detail.listening} ouvintes mensais</BandFooter>
        </ContainerInfoBand> */}
        </ContainerHeader>

        {/* <ContainerNavBar>
          <Icon onPress={() => goBack()} name="arrow-left" {...iconConfigure} />
          <GroupItemNavBar>
            <ButtonFollow>Seguindo</ButtonFollow>
            <Icon name="ellipsis-v" {...iconConfigure} />
          </GroupItemNavBar>
        </ContainerNavBar> */}
      </ContainerHeader>

      <Content>
        {/* <ButtonRandomOrder>
          <ButtonRandomOrderText>Ordem Aleatória</ButtonRandomOrderText>
        </ButtonRandomOrder>
        <InfoCategory>Popular</InfoCategory> */}
        <ContainerMusic>
          <ScrollView>{musicsC(detail && detail)}</ScrollView>
        </ContainerMusic>
      </Content>
    </Container>
  );
};

export default Album;
