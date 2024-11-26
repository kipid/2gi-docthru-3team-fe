import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputItem from "@/components/InputItem";
import TextareaItem from "@/components/TextareaItem";
import Dropdown from "@/components/Dropdown";
import CustomDatePicker from "@/components/CustomDatePicker";
import styles from "@/styles/new.module.css"
import axios from "axios";

function NewChallenge() {
  const fields = ["Next.js", "API", "Career", "Modern JS", "Web"];
  const doctypes = ["Blog", "Document"];

  const { handleSubmit, control, formState: { isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      link: "",
      category: "",
      doctype: "",
      deadline: null,
      personnel: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/challenges`, data);
    } catch (error) {
      console.log("챌린지 등록 실패:", error);
    }
  };

  const allFields = watch();

  return (
    <div className={styles.Container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>신규 챌린지 신청</h2>
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputItem
                  id="name"
                  label="제목"
                  placeholder="제목을 입력해주세요"
                  {...field}
                />
              )}
            />

            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <InputItem
                  id="link"
                  label="원문 링크"
                  placeholder="원문 링크를 입력해주세요"
                  {...field}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id="category"
                  label="카테고리"
                  options={fields}
                  placeholder="카테고리"
                  {...field}
                />
              )}
            />

            <Controller
              name="doctype"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id="doctype"
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
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="YYYY/MM/DD"
                />
              )}
            />

            <Controller
              name="personnel"
              control={control}
              render={({ field }) => (
                <InputItem
                  id="personnel"
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
            disabled={!isValid}
          >
            신청하기
          </button>
        </form>
    </div>
  );
}

export default NewChallenge;