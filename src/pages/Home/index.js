import React, {useState, useEffect} from 'react';

import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, ContainerList} from './styles';
import Card from '../../components/Card';
import Cardd from '../../components/Cardd';
import Mock from '../../services/mock';
import Console from '../../Utils/console';
import useShare from '../../Utils/useShare';
import {access} from '../../services/api';
import {genre} from '../../services/Filter/genre';
import {playlists} from '../../services/Filter/playlist';
import {track} from '../../services/Filter/track';
import mock from '../../JSON/mock.json';
import {release} from '../../services/Filter/release';
import {SlideScroll, Title} from '../../components/SlideCard/styles';
import Scroll from '../../components/Scroll';
import {search} from '../../services/Filter/search';
import ScrollInfinite from '../../components/ScrollInfinite';

import {Button, Divider, Menu, Provider} from 'react-native-paper';
let interval = null;
let limit = 10;
const Home = ({navigation}) => {
  const [slides, setSlides] = useState([]);
  new useShare({cod1: 'pt_BR', cod2: 'BR'});
  const [token, setToken] = useState();
  const [clicked, setClicked] = useState(false);
  const [country, setCountry] = useState({
    selectedCountry: 'Brasil',
    value: 'pt_BR',
  });
  const [visible, setVisible] = React.useState(false);
  const [genres, setGenres] = useState({
    selectedGenre: '',
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: '',
    listOfPlaylistFromAPI: [],
  });
  const [filters, setFilters] = useState([]);
  const [tracks, setTracks] = useState({
    selectedTracks: '',
    listOfTracksFromAPI: [],
  });
  const [list, setList] = useState({selectedList: '', listOfPlFromAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);
  const [releases, setRelease] = useState(null);
  const [key, setKey] = useState(null);

  const fetchData = async () => {
    limit += 10;
    await search(key, limit, token)
      .then(async searchResponse => {
        if (searchResponse.playlists.items.length > 0) {
          setList({
            ...list,
            listOfPlFromAPI: searchResponse.playlists.items,
          });
        }
      })
      .catch(() => {
        limit = 10;
      });
  };

  useEffect(() => {
    async function init() {
      const accss = await access();
      Console('token', accss);
      setToken(accss);
      AsyncStorage.setItem('spotify@tokendev', accss);

      const genr = await genre(accss, useShare.state.cod1);
      Console('categorias', genr);
      setGenres({
        selectedGenre: genr.categories.items[0].name,
        listOfGenresFromAPI: genr.categories.items,
      });
      const play = await playlists(genr.categories.items[0].id, accss);

      setPlaylist({
        selectedPlaylist: play.playlists.items[0].name,
        listOfPlaylistFromAPI: play.playlists.items,
      });

      const trk = await track(play.playlists.items[0].id, accss);
      setTracks({
        selectedTracks: tracks.selectedPlaylist,
        listOfTracksFromAPI: trk.items,
      });
      const currentTracks = [...trk.items];
      const trackInfo = currentTracks.filter(t => t.id === trk.items[0].id);
      setTrackDetail(trackInfo[0].track);

      Console('filter', trackInfo[0].track.album);
      setFilters(mock);
    }
    console.log('again');
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeSearch = async e => {
    setKey(e);

    await search(e, limit, token)
      .then(async searchResponse => {
        Console('search', searchResponse);
        if (searchResponse.playlists.items.length > 0) {
          setList({
            selectedList: e,
            listOfPlFromAPI: searchResponse.playlists.items,
          });
        } else {
          setList({
            selectedList: '',
            listOfPlFromAPI: [],
          });
        }
      })
      .catch(err => {
        Console('searchError', err);
        setList({
          selectedList: '',
          listOfPlFromAPI: [],
        });
      });
  };
  const goAlbumScreen = id => {
    console.log(id);
    navigation.navigate('Album', {id, token, value: country.value});
  };

  const pressGenre = async (id, name) => {
    setGenres({
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
      selectedGenre: name,
    });
    await playlists(id, token)
      .then(async playlistResponse => {
        setPlaylist({
          selectedPlaylist: playlistResponse.playlists.items[0].name,
          listOfPlaylistFromAPI: playlistResponse.playlists.items,
        });
        await track(playlistResponse.playlists.items[0].id, token).then(
          response => {
            setTracks({
              selectedTracks: tracks.selectedPlaylist,
              listOfTracksFromAPI: response.items,
            });
            const currentTracks = [...response.items];
            const trackInfo = currentTracks.filter(
              t => t.id === response.items[0].id,
            );
            setTrackDetail(trackInfo[0].track);
          },
        );
      })
      .catch(err => {
        Console(err);
      });
  };

  const pressPlaylist = async (id, name) => {
    console.log('id', id);
    setPlaylist({
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
      selectedPlaylist: name,
    });
    await track(id, token).then(response => {
      setTracks({
        selectedTracks: tracks.selectedPlaylist,
        listOfTracksFromAPI: response.items,
      });
      const currentTracks = [...response.items];
      const trackInfo = currentTracks.filter(
        t => t.id === response.items[0].id,
      );
      setTrackDetail(trackInfo[0].track);
      // setList({selectedList: '', listOfPlFromAPI: []});
    });
  };

  const listboxClicked = e => {
    const currentTracks = [...tracks.listOfTracksFromAPI];
    const trackInfo = currentTracks.filter(t => t.track.id === e);
    setTrackDetail(trackInfo[0].track);
  };

  const selectTo = async (e, name) => {
    setKey(name);
    setPlaylist({
      selectedPlaylist: name,
      listOfPlaylistFromAPI: list.listOfPlFromAPI,
    });
    setClicked(false);
    await track(e, token).then(response => {
      setTracks({
        selectedTracks: tracks.selectedPlaylist,
        listOfTracksFromAPI: response.items,
      });
      const currentTracks = [...response.items];
      const trackInfo = currentTracks.filter(
        t => t.id === response.items[0].id,
      );
      setTrackDetail(trackInfo[0].track);
      setList({selectedList: '', listOfPlFromAPI: []});
    });
  };

  const changedLocale = async e => {
    Console('e', e);
    setVisible(false);
    setCountry({
      selectedCountry: filters[e].country,
      value: filters[e].value,
    });

    await genre(token, filters[e].value).then(async genreResponse => {
      Console('categorias', genreResponse);
      setGenres({
        selectedGenre: genreResponse.categories.items[0].name,
        listOfGenresFromAPI: genreResponse.categories.items,
      });
      await playlists(genreResponse.categories.items[0].id, token)
        .then(async playlistResponse => {
          setPlaylist({
            selectedPlaylist: playlistResponse.playlists.items[0].name,
            listOfPlaylistFromAPI: playlistResponse.playlists.items,
          });
          await track(playlistResponse.playlists.items[0].id, token).then(
            async trackResponse => {
              setTracks({
                selectedTracks: tracks.selectedPlaylist,
                listOfTracksFromAPI: trackResponse.items,
              });
              const currentTracks = [...trackResponse.items];
              const trackInfo = currentTracks.filter(
                t => t.id === trackResponse.items[0].id,
              );
              setTrackDetail(trackInfo[0].track);

              // await release(token, filters[e].code).then(releaseresponse => {
              //   Console('release', releaseresponse);
              //   setRelease(releaseresponse.playlists.items);
              // });
              // clearInterval(interval);
              // setInterval(async () => {
              //   await release(token, filters[e].code).then(releaseresponse => {
              //     Console('release', releaseresponse);
              //     setRelease(releaseresponse.playlists.items);
              //   });
              // }, 30000);
            },
          );
        })
        .catch(err => {
          Console(err);
        });
    });
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            left: '35%',
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                color="#FFF"
                onPress={openMenu}
                icon={<Icon name="arrow-down" size={25} color="#fff" />}>
                {country.selectedCountry}
              </Button>
            }>
            {mock.map((obj, i) => (
              <>
                <Menu.Item
                  onPress={() => {
                    changedLocale(i);
                  }}
                  title={obj.country}
                />
                <Divider />
              </>
            ))}
          </Menu>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <TextInput
            onFocus={() => setClicked(true)}
            placeholder="Goosebumps - Remix, Top List..."
            placeholderTextColor="#FFF"
            value={key}
            onChangeText={e => changeSearch(e)}
            style={{
              borderWidth: 1,
              borderColor: '#FFF',
              borderRadius: 6,
              color: '#FFF',
              textAlign: 'center',
              fontSize: 17,
            }}
          />
          <Icon
            size={25}
            color="#FFF"
            onPress={() => console.log('clicked')}
            name="search"
            style={{position: 'absolute', zIndex: 10, right: 10}}
          />
        </View>

        <ScrollInfinite
          setClicked={setClicked}
          key={key}
          changeSearch={changeSearch}
          clicked={clicked}
          selectTo={selectTo}
          data={list.listOfPlFromAPI}
          fetchData={fetchData}
        />
        <ScrollView>
          <Scroll
            Tp={15}
            Bt={15}
            selected={genres.selectedGenre}
            data={genres.listOfGenresFromAPI}
            press={pressGenre}
          />
          <Scroll
            Bt={20}
            selected={playlist.selectedPlaylist}
            data={playlist.listOfPlaylistFromAPI}
            press={pressPlaylist}
          />
          {/* <Title>{playlist.listOfPlaylistFromAPI[0].name}</Title> */}
          <SlideScroll
            data={tracks.listOfTracksFromAPI}
            keyExtractor={item => String(item.id)}
            renderItem={
              ({item, index}) => (
                <Card onPress={listboxClicked} itens={item} key={0} />
              )
              // slide.itens.map((itens, index) => (
              //   <Card onPress={props.onPress} key={index} itens={itens} />
              // ))
            }
          />
          {trackDetail && <Cardd goAlbum={goAlbumScreen} {...trackDetail} />}
        </ScrollView>
      </Container>
    </Provider>
  );
};

export default Home;
// {slides &&
//   slides.map((slide, index) => (
//     <SlideCard
//       onPress={() => goAlbum(slide)}
//       key={index}
//       slide={slide}
//     />
//   ))}
