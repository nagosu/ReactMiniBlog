import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createPost } from '../services/postService';
import FormGroup from '../components/FormGroup';

const FormContainer = styled.div`
  padding: 50px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: ${(props) => (props.$primary ? '#0070f3' : '#f2f2f2')};
  color: ${(props) => (props.$primary ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

function PostWriteContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    thumbnail: '',
    author: '박진우',
  });

  // 폼 데이터 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 썸네일 업데이트 핸들러
  const setThumbnail = (base64) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: base64,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.content) return;

    createPost(formData)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('게시물 저장 중 오류 발생:', err);
        alert('게시물을 저장하는데 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <FormContainer>
      <Title>새 게시물 작성</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup
          label='썸네일'
          name='thumbnail'
          value={formData.thumbnail}
          setThumbnail={setThumbnail}
        />

        <FormGroup
          label='제목'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />

        <FormGroup
          label='부제목'
          name='subtitle'
          value={formData.subtitle}
          onChange={handleChange}
        />

        <FormGroup
          label='내용'
          name='content'
          value={formData.content}
          onChange={handleChange}
        />

        <ButtonGroup>
          <Button type='button' onClick={() => navigate('/')}>
            취소
          </Button>
          <Button type='submit' $primary>
            저장하기
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default PostWriteContent;
