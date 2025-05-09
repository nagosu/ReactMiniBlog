import styled from 'styled-components';
import MainContent from '../components/MainContent';

const Container = styled.div`
  background-color: transparent;
  width: 1240px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

function Main() {
  return (
    <Container>
      {/* 메인 */}
      <MainContent />
    </Container>
  );
}

export default Main;
