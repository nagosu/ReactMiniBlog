import styled from 'styled-components';
import PostViewContent from '../components/PostViewContent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostByPostId } from '../services/postService';

const Container = styled.div`
  background-color: transparent;
  width: 768px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

function PostView() {
  const { id } = useParams();

  const [post, setPost] = useState(null); // 포스트 데이터

  // 포스트 상세 조회
  useEffect(() => {
    fetchPostByPostId(id)
      .then((res) => setPost(res))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      {/* 포스트 내용 */}
      {post && <PostViewContent post={post} />}
    </Container>
  );
}

export default PostView;
