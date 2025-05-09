import styled from 'styled-components';
import PostWriteContent from '../components/PostWriteContent';

const Container = styled.div`
  background-color: transparent;
  width: 768px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

function PostWrite() {
  return (
    <Container>
      <PostWriteContent />
    </Container>
  );
}

export default PostWrite;
