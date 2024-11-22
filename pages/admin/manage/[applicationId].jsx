import { getApplicationWithId } from "@/apis/applicationService.js";
import { Field, Type } from "@/components/Challenge.jsx";
import Error from "@/components/Error.jsx";
import Loading from "@/components/Loading.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import styles from "@/styles/ManageApp.module.css";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useRouter } from 'next/router';

function ManageApp() {
	const viewport = useViewport();
	const router = useRouter();
	const { applicationId } = router.query;
	const { data: application, isPending, isError } = useQuery({
		queryKey: ["applications", applicationId],
		queryFn: () => getApplicationWithId(applicationId),
		staleTime: 5 * 60 * 1000,
	});
	console.log(application);

	if (isPending) return <Loading />;
	if (isError) return <Error />;

	const { id, challenge } = application;

	return (
		<main className={styles.main}>
			<div className={styles.challengeInfoContainer}>
				<div className={styles.headContainer}>
					<div className={styles.head}>
						<div className={styles.number}>No.&nbsp;{id}</div>
						<h1>{challenge.title}</h1>
						<div className={styles.subHead}>
							<Field field={challenge.field} />
							<Type type={challenge.docType} />
						</div>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.description}>{challenge.description}</div>
					{/* <div className={styles.writerContainer}>
						<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_profile.png" alt="Profile" />
						<span>{application.userId}</span>
					</div> */}
				</div>
				<div className={styles.challengeDateAndParti}>
					<div className={styles.challengeDeadLine}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_alarm.svg" alt="Alarm" />{moment(new Date(challenge.deadLine)).format("YYYY년 M월 D일 마감")}</div>
					<div className={styles.challengeParticipants}><Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_participants.svg" alt="Alarm" />{challenge.maxParticipants}</div>
				</div>
			</div>
			<div className={styles.originalLinkIframe}>
				<h2>원문 링크</h2>
				<div className={styles.iframeContainer}>
					<iframe src={challenge.docUrl} width="100%" height="100%" />
				</div>
			</div>
		</main>
	);
}

export default ManageApp;
