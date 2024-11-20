import { getChallengeWithId } from "@/apis/challengeService.js";
import { Field, Type } from "@/components/Challenge.jsx";
import Loading from "@/components/Loading.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import styles from "@/styles/ChallengeDetail.module.css";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

function padNumber(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function ChallengeDetail() {
  const viewport = useViewport();
  const router = useRouter();
  const [kebabMenuShown, setKebabMenuShown] = useState(false);
  const { challengeId } = router.query;
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: () => getChallengeWithId(challengeId),
  });
  console.log(challenge);

  if (isPending) return <Loading />;

  return (
    <>
      <main className={styles.main}>
        <div className={styles.challengeInfoContainer}>
          <div className={styles.headContainer}>
            <div className={styles.head}>
              <h1>{challenge.title}</h1>
              <div className={styles.subHead}>
                <Field field={challenge.field} />
                <Type type={challenge.docType} />
              </div>
            </div>
            {/* TODO: user 가 맞을때만 수정/삭제 보이도록... */}
            <div className={styles.kebabMenu}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_kebab_menu.png" alt="Kebab menu" onClick={() => setKebabMenuShown(prev => !prev)} /></div>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>{challenge.description}</div>
            <div className={styles.writerContainer}>
              <Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_profile.png" alt="Profile" />
              <span>{challenge.writer}writer?</span>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.challengeDateAndParti}>
            <div className={styles.challengeDeadLine}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_alarm.svg" alt="Alarm" /> {moment(new Date(challenge.deadLine)).format("YYYY년 M월 D일 마감")}</div>
            <div className={styles.challengeParticipants}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_participants.svg" alt="Alarm" /> {challenge.participants}/{challenge.maxParticipants}</div>
          </div>
          <button className={`${styles.button} ${styles.seeOriginal}`} type="button" onClick={() => window.open(challenge.docUrl)}>원문 보기</button>
          <button className={styles.button} type="button" onClick={() => router.push(`/challenges/${challengeId}/edit`)}>작업 도전하기</button>
        </div>
      </main>
      <div className={styles.participantsStatus}>
        <div className={styles.head}>
          <h2>참여 현황</h2>
          <span className={styles.page}>{page}/{pageMax}</span>
          <button className={styles.button} type="button">&lt;</button>
          <button className={styles.button} type="button">&gt;</button>
        </div>
        <div className={styles.participantsContainer}>
          <div className={styles.rank}></div>
        </div>
      </div>
    </>
  );
}

export default ChallengeDetail;
