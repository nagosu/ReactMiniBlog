import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

const PostTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.4;
`;

const AuthorAndDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #555;
  gap: 8px;
`;

const Author = styled.span`
  font-weight: 600;
  color: #000;
`;

const PostDate = styled.span`
  color: #999;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
  gap: 20px;
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.03);
`;

const PostContentText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;

  p {
    width: 100%;
    font-size: 1.0625rem;
    line-height: 1.75;
    color: #333;
    word-break: break-word;
    padding: 16px 0;
  }
`;

function PostViewContent(props) {
  const { post } = props;

  // 날짜 포맷팅
  const formatDate = (inputDate) => {
    let dateString;

    // Firestore Timestamp 포맷팅
    if (inputDate?.toDate instanceof Function) {
      dateString = inputDate.toDate().toISOString().split('T')[0];
    } else {
      // 예상치 못한 형식
      console.warn('날짜 오류:', inputDate);
      return '날짜 오류';
    }

    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  // content를 줄바꿈 문자(\n)로 나눠 <p>태그로 분리
  const splitContent = (content) => {
    return content
      .split(/\n+/) // 줄바꿈이 여러 개 있어도 하나로 처리
      .map((paragraph, idx) => <p key={`paragraph-${idx}`}>{paragraph}</p>);
  };

  return (
    <Container>
      <PostInfoContainer>
        <PostTitle>{post?.title}</PostTitle>
        <AuthorAndDate>
          <Author>{post?.author}</Author>
          <span>·</span>
          <PostDate>{formatDate(post?.createdAt)}</PostDate>
        </AuthorAndDate>
      </PostInfoContainer>

      <PostContent>
        <PostThumbnail src={post?.thumbnail} alt='Thumbnail' />
        <PostContentText>{splitContent(post?.content)}</PostContentText>
      </PostContent>

      {/* 댓글 */}
      {post && <Comment postId={post?.id} />}
    </Container>
  );
}

export default PostViewContent;
