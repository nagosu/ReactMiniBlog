import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@firebase/firestore';
import { db } from '../libs/firebase';

// 정렬 기준별 게시글 목록 조회
export const fetchPostsByOrder = async (
  orderField = 'createdAt',
  orderDirection = 'desc'
) => {
  const q = query(collection(db, 'posts'), orderBy(orderField, orderDirection));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// 게시글 상세 조회
export const fetchPostByPostId = async (postId) => {
  const ref = doc(db, 'posts', postId);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error('존재하지 않는 글입니다.');

  return { id: snap.id, ...snap.data() };
};

// 게시글 검색 (제목)
// 모든 게시글을 가져와서 클라이언트 측에서 필터링
export const fetchPostsByTitle = async (keyword) => {
  const q = query(collection(db, 'posts'));
  const snap = await getDocs(q);

  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // 부분 일치 필터링 (대소문자 구분 없음)
  return posts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

// 게시글 작성
export const createPost = async (data) =>
  addDoc(collection(db, 'posts'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    commentCount: 0,
  });
