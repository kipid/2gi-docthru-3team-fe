import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styles from "@/styles/WorkDetail.module.css";
import { format } from "date-fns";
import likeIconActive from "@/public/images/ic_heart.png";
import likeIconInactive from "@/public/images/ic_inactiveheart.png";
import FeedbackForm from "@/components/FeedbackInput";
import FeedbackList from "@/components/FeedbackList";

const fetchWorkDetail = async (workId) => {
  const { data } = await axios.get(`/api/works/${workId}`);
  return data;
};

const toggleLike = async (workId) => {
  const { data } = await axios.post(`/api/works/${workId}/likes`);
  return data;
};

const WorkDetail = ({ workId }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workDetail", workId],
    queryFn: () => fetchWorkDetail(workId),
  });

  const formattedDate = data?.createdAt
    ? format(new Date(data.createdAt), "yyyy-MM-dd")
    : "날짜 정보 없음";

    const likeMutation = useMutation({
      mutationFn: () => toggleLike(workId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workDetail", workId] });
      },
      onError: (error) => {
        console.error("좋아요 처리 중 에러:", error);
      },
    });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <div>작업물을 찾을 수 없습니다.</div>;
    }
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  const handleLikeClick = () => {
    likeMutation.mutate();
  };

  return (
    <div>
      <div className={styles.workDetail}>
        <h1>{data.title}</h1>
        <span className={styles.docType}>{data.docType}</span>
        <span className={styles.category}>{data.category}</span>
        <div className={styles.meta}>
          <span className={styles.nickname}>{data.nickname}</span>
          <button
            className={styles.likeButton}
            onClick={handleLikeClick}
            disabled={likeMutation.isLoading}
          >
            <img
              src={data.isLiked ? likeIconActive : likeIconInactive}
              alt="좋아요 아이콘"
              className={styles.likeIcon}
            />
          </button>
          <span className={styles.likes}>{data.likes}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <p>{data.content}</p>
      </div>
      <FeedbackForm workId={workId} />
      <FeedbackList workId={workId} />
    </div>
  );
};

export default WorkDetail;
