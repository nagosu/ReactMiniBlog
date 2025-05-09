import styled from 'styled-components';
import PostItem from './PostItem';

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  padding: 15px 0 30px 0;
`;

function PostList(props) {
  const { posts } = props;

  return (
    <PostContainer>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </PostContainer>
  );
}

export default PostList;
