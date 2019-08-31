import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  align-self: stretch;
  padding: 0 20px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);
`;

export const SubmitButton = styled(Button)``;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #d44059;
`;
