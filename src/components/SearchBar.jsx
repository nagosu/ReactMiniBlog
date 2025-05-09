import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 10px;
  border: 1px solid #bebebe;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
`;

const SearchInput = styled.input`
  width: 360px;
  height: 100%;
  padding: 15px;
  background-color: transparent;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  border: none;
  background-color: transparent;

  img {
    width: 20px;
    height: 20px;
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  // Enter 키 입력 핸들러
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type='text'
        placeholder='검색어를 입력하세요'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <SearchButton type='button' onClick={handleSearch}>
        <img src='/images/search.svg' alt='Search' />
      </SearchButton>
    </SearchBarContainer>
  );
}

export default SearchBar;
