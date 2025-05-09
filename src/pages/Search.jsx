import styled from 'styled-components';
import SearchContent from '../components/SearchContent';

const Container = styled.div`
  background-color: transparent;
  width: 1240px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

function Search() {
  return (
    <Container>
      {/* 검색 결과 */}
      <SearchContent />
    </Container>
  );
}

export default Search;
