import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../libs/firebase';

// 댓글 목록 조회
export const fetchCommentsByPostIdAsc = async (postId) => {
  const cRef = collection(db, 'posts', postId, 'comments');
  const q = query(cRef, orderBy('createdAt', 'asc'));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// 댓글 작성 + commentCount 증가
export const createCommentByPostId = async (postId, data) => {
  // 댓글 추가
  await addDoc(collection(db, 'posts', postId, 'comments'), {
    ...data,
    createdAt: serverTimestamp(),
  });

  // commentCount 증가
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const currentCount = postSnap.data().commentCount || 0;
    await updateDoc(postRef, {
      commentCount: currentCount + 1,
    });
  }
};
