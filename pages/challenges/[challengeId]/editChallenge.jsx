import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { getChallengeWithId, updateChallenge } from "@/apis/challengeService";
import InputItem from "@/components/InputItem";
import TextareaItem from "@/components/TextareaItem";
import Dropdown from "@/components/Dropdown";
import CustomDatePicker from "@/components/CustomDatePicker";
import styles from "@/styles/editChallenge.module.css";
import PopUp from "@/components/PopUp";
import useAuth from "@/utills/useAuth";

function editChallenge() {
  const fields = ["Next.js", "API", "Career", "Modern JS", "Web"];
  const docTypes = ["Blog", "Document"];


  const router = useRouter();
  const { challengeId } = router.query;

  const { errorMessage, setErrorMessage } = useAuth();
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      title: "",
      docUrl: "",
      field: "",
      docType: "",
      deadLine: null,
      maxParticipants: "",
      description: "",
    },
  });

  useEffect(() => {
    if (challengeId) {
      getChallengeWithId(challengeId)
        .then((data) => {
          console.log(data);
          reset(data);
          
        })
        .catch((error) => {
          console.error("데이터 불러오기 실패:", error);
        });
    }
  }, [challengeId, reset]);

  

  const onSubmit = async (data) => {
    try {
      console.log("보내는 데이터:", data);
      const result = await updateChallenge(challengeId, data);
      router.push(`/challenges/${result.challengeId}`);
    } catch (error) {
      console.error("챌린지 수정 중 오류:", error);
    }
  };

  const allFields = watch();

  return (
    <div className={styles.Container}>
      {errorMessage && <PopUp onlyCancel={true} error={errorMessage} setError={setErrorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            name="docType"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="docType"
                label="문서 타입"
                options={docTypes}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="문서 타입"
                {...field}
              />
            )}
          />

          <Controller
            name="deadLine"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                id="deadLine"
                label="마감일"
                selected={field.value ? new Date(field.value) : null}
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
          docType="submit"
          disabled={
            !allFields.title ||
            !allFields.docUrl ||
            !allFields.field ||
            !allFields.docType ||
            !allFields.deadLine ||
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

export default editChallenge;