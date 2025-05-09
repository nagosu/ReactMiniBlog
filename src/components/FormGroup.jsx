import styled from 'styled-components';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const GroupContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const ThumbnailUploadContainer = styled.div`
  margin-bottom: 20px;
`;

const DropZoneArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 364px;
  height: 280px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.3s;

  &:hover {
    border-color: #0070f3;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const DropZoneText = styled.div`
  color: #999;
  font-size: 14px;
`;

function FormGroup({ label, name, value, onChange, setThumbnail }) {
  // Dropzone 설정
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const base64 = await getBase64(file);
        setThumbnail(base64);
      }
    },
    [setThumbnail]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <GroupContainer>
      <Label>{label}</Label>

      {label === '썸네일' ? (
        <ThumbnailUploadContainer>
          <DropZoneArea {...getRootProps()}>
            <input {...getInputProps()} />
            {value ? (
              <img src={value} alt='썸네일 미리보기' />
            ) : (
              <DropZoneText>
                {isDragActive
                  ? '이미지를 놓으세요'
                  : '클릭 또는 드래그해서 이미지 추가'}
              </DropZoneText>
            )}
          </DropZoneArea>
        </ThumbnailUploadContainer>
      ) : label === '내용' ? (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`내용을 입력하세요`}
        />
      ) : (
        <Input
          type='text'
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`${label}을 입력하세요`}
        />
      )}
    </GroupContainer>
  );
}

export default FormGroup;
