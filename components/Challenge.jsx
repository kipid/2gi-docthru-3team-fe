import { FIELD, TYPE } from "@/apis/translate.js";
import { useViewport } from "@/context/ViewportProvider";
import styles from "@/styles/Challenge.module.css";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import ic_kebab from "@/public/images/ic_kebab_menu.png";
import { useState } from "react";
import { useUser } from "@/context/UserProvider";
import Modal from "@/components/Modal.jsx";
import { deleteChallenge } from "@/apis/challengeService";
import { useMutation } from "@tanstack/react-query";

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
	const user = useUser();
	const [isKebabOpen, setIsKebabOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [invalidMessage, setInvalidMessage] = useState("");

	const mutation = useMutation({
		mutationFn: (data) => deleteChallenge(challenge.id, data.invalidationComment),
		onSuccess: (data) => {
			console.log("successfully updated: ", data);
		},
		onError: (error) => {
			console.error(error);
		}
	})

	const toggleMenu = () => {
		setIsKebabOpen(!isKebabOpen);
	};

	const handleEdit = () => {
		router.push(`/challenges/${challenge.id}/edit`);
	};

	const handleDelete = () => {
		console.log("삭제하기 클릭");
		mutation.mutate({ invalidationCommnent: invalidMessage });
		setIsKebabOpen(false);
	};

	return (
		<div className={styles.challenge}>
			<div className={styles.titleAndKebab}>
			{new Date(challenge.deadLine).getTime() < Date.now() && <div className={`${styles.challengeInfo} ${styles.alarm}`}>
				<Image width={viewport.size} height={viewport.size} src="/images/ic_alarm_white.svg" alt="Alarm" />
				<span>챌린지가 마감되었어요.</span>
			</div>}
			{new Date(challenge.deadLine).getTime() >= Date.now() && challenge.maxParticipants <= challenge.participants && <div className={`${styles.challengeInfo} ${styles.fullParticipants}`}>
				<Image width={viewport.size} height={viewport.size} src="/images/ic_participants.svg" alt="Participants" />
				<span>모집이 완료된 상태에요.</span>
			</div>}
			<Link href={`/challenges/${challenge.id}`}><h2 className={styles.challengeTitle}>{challenge.title}</h2></Link>
			{user?.role === "Admin" && <Image className={styles.kebab} src={ic_kebab} alt="Kebab menu" onClick={toggleMenu} />}
			{isKebabOpen && (
				<div className={styles.kebabMenu}> 
					<button type="button" onClick={handleEdit}>수정하기</button>
					<button type="button" onClick={() => setIsModalOpen(true)}>삭제하기</button>
				</div>
			)}
			</div>
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
				{status === "completed" && <button className={`${styles.button} ${styles.seeMine}`} type="button" onClick={() => router.push(`/`)}>내 작업물 보기&nbsp;<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_arrow_right.png" alt="Arrow right" /></button>}
			</div>
			{isModalOpen && (
				<Modal
					title="삭제"
					value={invalidMessage}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleDelete}
					onChange={(e) => setInvalidMessage(e.target.value)} 
				/>
			)}
		</div>
	);
}

export default Challenge;
