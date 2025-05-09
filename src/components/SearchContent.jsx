import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPostsByTitle } from '../services/postService';
import PostList from './PostList';

const Container = styled.main`
  padding-top: 30px;
`;

const PostListTitle = styled.h3`
  font-weight: 600;
`;

const NoResult = styled.div`
  padding: 30px;
  text-align: center;
  color: #999;
`;

function SearchContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [posts, setPosts] = useState([]);

  // 검색어 변경 시 포스트 목록 조회
  useEffect(() => {
    if (query) {
      fetchPostsByTitle(query)
        .then((res) => setPosts(res))
        .catch((err) => console.log(err));
    }
  }, [query]);

  return (
    <Container>
      {/* 포스트 목록 */}
      <section>
        <PostListTitle>검색 결과: "{query}"</PostListTitle>
        {posts.length > 0 && <PostList posts={posts} />}
        {posts.length === 0 && <NoResult>검색 결과가 없습니다.</NoResult>}
      </section>
    </Container>
  );
}

export default SearchContent;
