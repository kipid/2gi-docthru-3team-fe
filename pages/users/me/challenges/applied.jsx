import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsApplied } from "@/apis/challengeService.js";
import Table from "@/components/Table.jsx";
import Pagination from "@/components/Pagination.jsx";
import { useState } from 'react';
import Loading from "@/components/Loading.jsx";

function Applied() {
	const [page, setPage] = useState(1);
	const user = useUser();
	const { data: applications, isPending, isError } = useQuery({
		queryKey: ["applications", "completed", user?.id],
		queryFn: () => getMyChallsApplied(),
		staleTime: 5 * 60 * 1000,
	});
	console.log("Applied applications", applications);

	if (isPending) {
		return <Loading />;
	}

	return (
		<main className={styles.main}>
			<MyChallHeader progress="applied" />
			<Table applications={applications?.list} me={true} />
			<Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(applications?.totalCount / 10)} />
		</main>
	);
}

export default Applied;
