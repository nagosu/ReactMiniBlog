import styled from 'styled-components';
import CommentItem from './CommentItem';
import { useEffect, useState } from 'react';
import {
  createCommentByPostId,
  fetchCommentsByPostIdAsc,
} from '../services/commentService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
  gap: 30px;
`;

const CommentWriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const CommentCountContainer = styled.div`
  width: 100%;

  span {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
  }
`;

const CommentWriteForm = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-family: 'Pretendard';

  textarea {
    width: 100%;
    min-height: 100px;
    border: none;
    outline: none;
    resize: none;
    background-color: transparent;
    font-size: 0.875rem;
    color: #111827;
    font-family: 'Pretendard';

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const CommentWriteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    height: 36px;
    background-color: #3b82f6;
    color: #ffffff;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

function Comment({ postId }) {
  const [comments, setComments] = useState([]); // 댓글 목록
  const [content, setContent] = useState(''); // 댓글 작성 내용

  // 댓글 작성 핸들러
  const handleSubmit = async () => {
    if (!content) return;

    // 댓글 작성
    createCommentByPostId(postId, { content, authorName: '박진우' })
      .then(() => {
        setContent('');

        // 댓글 목록 조회
        fetchCommentsByPostIdAsc(postId)
          .then((res) => {
            setComments(res);
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              });
            }, 10);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // 댓글 목록 조회
  useEffect(() => {
    fetchCommentsByPostIdAsc(postId)
      .then((res) => setComments(res))
      .catch((err) => console.log(err));
  }, [postId]);

  return (
    <Container>
      {/* 댓글 정보 & 댓글 작성 컨테이너 */}
      <CommentWriteContainer>
        {/* 달린 댓글 개수 */}
        <CommentCountContainer>
          <span>{comments.length}개의 댓글</span>
        </CommentCountContainer>

        {/* 댓글 작성 폼 */}
        <CommentWriteForm>
          <textarea
            placeholder='댓글을 입력하세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CommentWriteForm>

        {/* 댓글 작성 버튼 */}
        <CommentWriteButtonContainer>
          <button type='button' onClick={handleSubmit}>
            댓글 작성
          </button>
        </CommentWriteButtonContainer>
      </CommentWriteContainer>

      {/* 댓글 리스트 */}
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </Container>
  );
}

export default Comment;
