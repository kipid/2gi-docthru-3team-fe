import { getChallengeWithId } from "@/apis/challengeService.js";
import { Field, Type } from "@/components/Challenge.jsx";
import Loading from "@/components/Loading.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import styles from "@/styles/ChallengeDetail.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

function ChallengeDetail() {
  const viewport = useViewport();
  const router = useRouter();
  const [kebabMenuShown, setKebabMenuShown] = useState(false);
  const { challengeId } = router.query;
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: () => getChallengeWithId(challengeId),
  });

  if (isPending) return <Loading />;

  return (
    <main className={styles.main}>
      <div className={styles.headContainer}>
        <div className={styles.head}>
          <h1>{challenge.title}</h1>
          <div className={styles.subHead}>
            <Field field={challenge.field} />
            <Type type={challenge.docType} />
          </div>
        </div>
        <div className={styles.kebabMenu}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_kebab_menu.png" alt="Kebab menu" onClick={() => setKebabMenuShown(prev => !prev)} /></div>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>{challenge.description}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} type="button" onClick={() => {router.push(`/challenges/${challengeId}/edit`)}}>수정</button>
          <button className={styles.button} type="button">삭제</button>
        </div>
      </div>
    </main>
  );
}

export default ChallengeDetail;
