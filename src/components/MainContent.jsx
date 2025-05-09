import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchPostsByOrder } from '../services/postService';
import SortSelect from './SortSelect';
import PostList from './PostList';

const Container = styled.main`
  padding-top: 30px;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const PostListTitle = styled.h3`
  font-weight: 600;
`;

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState('createdAt-desc');

  // 정렬 변경 핸들러
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // 포스트 목록 조회
  useEffect(() => {
    const [field, direction] = sortOption.split('-');

    fetchPostsByOrder(field, direction)
      .then((res) => setPosts(res))
      .catch((err) => console.log(err));
  }, [sortOption]);

  return (
    <Container>
      {/* 정렬 */}
      <SortContainer>
        <SortSelect sortOption={sortOption} onChange={handleSortChange} />
      </SortContainer>

      {/* 포스트 목록 */}
      <section>
        <PostListTitle>등록된 포스트</PostListTitle>
        <PostList posts={posts} />
      </section>
    </Container>
  );
}

export default MainContent;
