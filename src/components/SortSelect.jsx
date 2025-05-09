import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SortSelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  min-width: 150px;
`;

const Select = styled.select`
  width: auto;
  min-width: 150px;
  padding: 10px 40px 10px 15px;
  font-size: 0.875rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;

  &:hover {
    border-color: #0070f3;
  }

  &:focus {
    border-color: #0070f3;
    background-color: #f9fafb;
    outline: none;
  }
`;

const SortIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
`;

function SortSelect({ sortOption, onChange }) {
  return (
    <SortSelectWrapper>
      <Select value={sortOption} onChange={onChange}>
        <option value='createdAt-desc'>최신순</option>
        <option value='commentCount-desc'>댓글 많은 순</option>
        <option value='title-asc'>제목순 (오름차순)</option>
        <option value='title-desc'>제목순 (내림차순)</option>
      </Select>
      <SortIcon>
        <ChevronDown size={16} />
      </SortIcon>
    </SortSelectWrapper>
  );
}

export default SortSelect;
