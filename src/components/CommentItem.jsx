import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.span`
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
`;

const CommentDate = styled.span`
  font-size: 0.8125rem;
  color: #9ca3af;
`;

const CommentContent = styled.p`
  font-size: 0.95rem;
  color: #1f2937;
  padding: 10px 0 0 0;
  line-height: 1.7;
  word-break: break-word;
`;

function CommentItem(props) {
  const { comment } = props;

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

  return (
    <Container>
      {/* 댓글 정보 (작성자, 작성일) */}
      <InfoContainer>
        <CommentAuthor>{comment?.authorName}</CommentAuthor>
        <CommentDate>{formatDate(comment?.createdAt)}</CommentDate>
      </InfoContainer>
      <CommentContent>{comment?.content}</CommentContent>
    </Container>
  );
}

export default CommentItem;
