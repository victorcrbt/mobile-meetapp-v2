import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;
  margin: 0 30px;
  padding: 0 10px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);

  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  padding: 0 10px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);

  flex: 1;
`;
