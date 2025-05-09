import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1240px;
  height: 60px;
  font-weight: 700;
  font-size: 18px;
  line-height: 60px;
  background-color: transparent;
  margin: 0 auto;
  padding: 0 15px;
`;

const Logo = styled.a`
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;

const PostWriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #757575;
  background-color: transparent;
  color: #111;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #111;
    color: #fff;
  }
`;

function MainHeader() {
  const navigate = useNavigate();

  // 포스트 등록 버튼 클릭 핸들러
  const handleWriteButtonClick = () => {
    navigate('/post/write');
  };

  return (
    <Header>
      {/* 로고 */}
      <Logo href='/'>DEVLOG🌙</Logo>

      {/* 검색바 */}
      <SearchBar />

      {/* 등록 버튼 */}
      <PostWriteButton type='button' onClick={handleWriteButtonClick}>
        포스트 등록
      </PostWriteButton>
    </Header>
  );
}

export default MainHeader;
