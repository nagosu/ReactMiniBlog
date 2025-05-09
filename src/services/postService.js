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
export const fetchPostsByTitle = async (keyword) => {
  const q = query(
    collection(db, 'posts'),
    where('title', '>=', keyword),
    where('title', '<=', keyword + '\uf8ff')
  );
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// 게시글 작성
export const createPost = async (data) =>
  addDoc(collection(db, 'posts'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    commentCount: 0,
  });
