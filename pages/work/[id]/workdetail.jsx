import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/apis/instance";
import styles from "@/styles/WorkDetail.module.css";
import { format } from "date-fns";
import likeIconActive from "@/public/images/ic_heart.png";
import likeIconInactive from "@/public/images/ic_inactiveheart.png";
import FeedbackForm from "@/components/FeedbackInput";
import FeedbackList from "@/components/FeedbackList";
import Image from "next/image";

const fetchWorkDetail = async (workId) => {
  const { data } = await instance.get(`/works/${workId}`);
  return data;
};

const toggleLike = async (workId) => {
  const { data } = await instance.post(`/works/${workId}/likes`);
  return data;
};

const WorkDetail = () => {
  const router = useRouter();
  const { id: workId } = router.query;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workDetail", workId],
    queryFn: () => fetchWorkDetail(workId),
    enabled: !!workId,
  });
  console.log("WorkDetail data", data);
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
        <h1 style={{ fontSize: "24px"}}>{data?.title || "제목 없음"}</h1>
        <div>
          <span className={styles.docType}>{data?.docType || "문서 타입 없음"}</span>
          <span className={styles.category}>{data?.category || "카테고리 없음"}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.nickname}>{data?.nickname || "작성자 없음"}</span>
          <button
            className={styles.likeButton}
            onClick={handleLikeClick}
            disabled={likeMutation.isLoading}
          >
            <Image
              width={16}
              height={16}
              src={data?.isLiked ? likeIconActive : likeIconInactive}
              alt="좋아요 아이콘"
              className={styles.likeIcon}
            />
          </button>
          <span className={styles.likes}>{data?.likes || 0}</span>
          <span className={styles.date}>
            {data?.createdAt
              ? format(new Date(data.createdAt), "yyyy-MM-dd")
              : "날짜 정보 없음"}
          </span>
        </div>
        <p style={{maxWidth: "890px"}}>{data?.content || "내용 없음"}</p>
      </div>
      <FeedbackForm workId={workId} />
      <FeedbackList workId={workId} />
    </div>
  );
};

export default WorkDetail;
