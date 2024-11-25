import { FIELD, TYPE } from "@/apis/translate.js";
import { useViewport } from "@/context/ViewportProvider";
import styles from "./Challenge.module.css";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

export function Field({ field }) {
	return (
		<div className={`${styles.challengeField} ${styles[field]}`}>
			{FIELD[field]}
		</div>
	);
}

export function Type({ type }) {
	return (
		<div className={`${styles.challengeType} ${styles[type]}`}>
			{TYPE[type]}
		</div>
	);
}

function Challenge({ challenge, status }) {
	const viewport = useViewport();
	const router = useRouter();

	return (
		<div className={styles.challenge}>
			{new Date(challenge.deadLine).getTime() < Date.now() && <div className={`${styles.challengeInfo} ${styles.alarm}`}>
				<Image width={viewport.size} height={viewport.size} src="/images/ic_alarm_white.svg" alt="Alarm" />
				<span>챌린지가 마감되었어요.</span>
			</div>}
			{new Date(challenge.deadLine).getTime() >= Date.now() && challenge.maxParticipants <= challenge.participants && <div className={`${styles.challengeInfo} ${styles.fullParticipants}`}>
				<Image width={viewport.size} height={viewport.size} src="/images/ic_participants.svg" alt="Participants" />
				<span>모집이 완료된 상태에요.</span>
			</div>}
			<Link href={`/challenges/${challenge.id}`}><h2 className={styles.challengeTitle}>{challenge.title}</h2></Link>
			<div className={styles.challengeFieldAndType}>
				<Field field={challenge.field} />
				<Type type={challenge.docType} />
			</div>
			<hr className={styles.hr} />
			<div className={styles.bottomContainer}>
				<div className={styles.challengeDateAndParti}>
					<div className={styles.challengeDeadLine}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_alarm.svg" alt="Alarm" /> {moment(new Date(challenge.deadLine)).format("YYYY년 M월 D일 마감")}</div>
					<div className={styles.challengeParticipants}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_participants.svg" alt="Alarm" /> {challenge.participants}/{challenge.maxParticipants}&nbsp;{challenge.participants >= challenge.maxParticipants ? "참여 완료" : "참여중"}</div>
				</div>
				{/* TODO: onClick 제대로 동작하도록... */}
				{status === "ongoing" && <button className={`${styles.button} ${styles.contiChall}`} type="button" onClick={() => router.push(`/`)}>도전 계속하기&nbsp;<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_arrow_right.png" alt="Arrow right" /></button>}
				{/* TODO: onClick 제대로 동작하도록... */}
				{status === "completed" && <button className={`${styles.button} ${styles.seeMine}`} type="button" onClick={() => router.push(`/`)}>내 작업물 보기&nbsp;<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_document.png" alt="Arrow right" /></button>}
			</div>
		</div>
	);
}

export default Challenge;
