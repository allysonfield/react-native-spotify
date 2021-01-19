import styled from 'styled-components/native';

export const Container = styled.View`
  width: 160px;
  padding: 10px 16px;
  justify-content: center;
  align-self: flex-start;
`;

export const Photo = styled.Image`
  width: 260px;
  height: 200px;
  background-color: #888;
  border-radius: 6px;
`;

export const ContainerSubtitle = styled.View`
  flex-direction: column;
  padding: 10px 0px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SubtitleTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
`;

export const SubtitleDescription = styled.Text`
  color: #999;
  font-size: 12px;
`;
