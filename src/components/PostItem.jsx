import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 350px;
  border-bottom: 1px solid #dcdcdc;
  color: #000;
  text-decoration: none;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #fdfdfd;
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: 15px;
`;

const PostItemTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PostItemTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostItemSubtitle = styled.div`
  word-break: break-word;
  font-size: 0.9rem;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostItemDate = styled.div`
  color: #999;
  font-size: 0.8rem;
  margin-top: 10px;
`;

function PostItem(props) {
  const { post } = props;
  const navigate = useNavigate();

  // 날짜 포맷팅 함수
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

  // PostItem 클릭 핸들러
  const handlePostItemClick = () => {
    // ID만 전달하여 상세 페이지로 이동
    navigate(`/post/${post.id}`);
  };

  return (
    <PostItemContainer onClick={handlePostItemClick}>
      {/* 포스트 썸네일 이미지 */}
      <Thumbnail src={post.thumbnail} alt='Thumbnail' />

      {/* 포스트 정보 */}
      <PostItemContent>
        <PostItemTitleContainer>
          <PostItemTitle>{post.title}</PostItemTitle>
          <PostItemSubtitle>{post.subtitle}</PostItemSubtitle>
        </PostItemTitleContainer>
        <PostItemDate>
          {formatDate(post.createdAt)} | {post.commentCount}개의 댓글
        </PostItemDate>
      </PostItemContent>
    </PostItemContainer>
  );
}

export default PostItem;
