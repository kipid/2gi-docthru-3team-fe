import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styles from "@/styles/FeedbackForm.module.css";
import inactiveImage from "@/public/images/status=inactive.png";
import activeImage from "@/public/images/status=active.png";
import TextareaItem from "../../../../../components/TextareaItem";


const postFeedback = async ({ workId, content }) => {
  const { data } = await axios.post(`/api/works/${workId}/feedbacks`, { content });
  return data;
};

const FeedbackForm = ({ workId }) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(postFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks", workId]);
      setContent("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      mutation.mutate({ workId, content });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.feedbackForm}>
      <TextareaItem
      id="feedback"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="피드백을 남겨주세요"
        className={styles.textarea}
      />
      <button type="submit" disabled={mutation.isLoading || !content.trim()} className={styles.submitButton}>
        <img
          src={content.trim() ? activeImage : inactiveImage}
          alt="Submit Button"
        />
      </button>
    </form>
  );
};

export default FeedbackForm;