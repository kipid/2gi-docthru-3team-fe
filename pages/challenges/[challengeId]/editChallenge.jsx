import instance from "@/apis/instance";
import { useRouter } from "next/router";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputItem from "@/components/InputItem";
import TextareaItem from "@/components/TextareaItem";
import Dropdown from "@/components/Dropdown";
import CustomDatePicker from "@/components/CustomDatePicker";
import styles from "@/styles/editChallenge.module.css";
import PopUp from "@/components/PopUp";
import { useUser } from "@/context/UserProvider";
import { useState } from "react";

function updateChallenge() {
  const fields = ["Next.js", "API", "Career", "Modern JS", "Web"];
  const doctypes = ["Blog", "Document"];
  const user = useUser();
  const router = useRouter();
  const [error, setError] = useState(null);

  if (!user) {
    return <PopUp onlyCancel={true} error={{ message: "로그인이 필요합니다.", onCancel: () => router.push('/login') }} setError={setError} />;
  }

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      title: "",
      docUrl: "",
      field: "",
      type: "",
      deadline: null,
      maxParticipants: "",
      description: "",
    },
  });

  const updateChallenge = async (challengeid, data) => {
    try {
      const response = await instance.patch(`/challenges/${challengeid}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("챌린지 수정 실패:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const challengeId = router.query.id;
      const result = await updateChallenge(challengeId, data);
      router.push(`/challenges/${result.id}`);
    } catch (error) {
      console.error("챌린지 수정 중 오류:", error);
    }
  };

  const allFields = watch();

  return (
    <div className={styles.Container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>챌린지 수정</h1>
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputItem
                id="title"
                label="제목"
                placeholder="제목을 입력해주세요"
                {...field}
              />
            )}
          />

          <Controller
            name="docUrl"
            control={control}
            render={({ field }) => (
              <InputItem
                id="docUrl"
                label="원문 링크"
                placeholder="원문 링크를 입력해주세요"
                {...field}
              />
            )}
          />

          <Controller
            name="field"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="field"
                label="카테고리"
                options={fields}
                placeholder="카테고리"
                {...field}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="type"
                label="문서 타입"
                options={doctypes}
                placeholder="문서 타입"
                {...field}
              />
            )}
          />

          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                id="deadline"
                label="마감일"
                selected={field.value || null}
                onChange={(date) => field.onChange(date)}
                placeholder="YYYY/MM/DD"
                {...field}
              />
            )}
          />

          <Controller
            name="maxParticipants"
            control={control}
            render={({ field }) => (
              <InputItem
                id="maxParticipants"
                label="최대 인원"
                placeholder="인원을 입력해주세요"
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextareaItem
                id="description"
                label="내용"
                placeholder="내용을 입력해주세요"
                {...field}
              />
            )}
          />
        </div>
        <button
          className={styles.button}
          type="submit"
          disabled={
            !allFields.title ||
            !allFields.docUrl ||
            !allFields.field ||
            !allFields.type ||
            !allFields.deadline ||
            !allFields.maxParticipants ||
            !allFields.description
          }
        >
          수정하기
        </button>
      </form>
    </div>
  );
}

export default updateChallenge;