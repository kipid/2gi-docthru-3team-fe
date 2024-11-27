import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useState } from 'react';
import { useViewport } from "@/context/ViewportProvider.jsx";
import Image from "next/image";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsOngoing } from "@/apis/challengeService.js";
import Challenge from "@/components/Challenge.jsx";
import Loading from "@/components/Loading.jsx";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 5;

function Ongoing() {
	const [page, setPage] = useState(1);
	const user = useUser();
	const viewport = useViewport();
	const [search, setSearch] = useState("");
	const { data: challenges, isPending, isError } = useQuery({
		queryKey: ["challenges", "ongoing", user?.id, page],
		queryFn: () => getMyChallsOngoing({ page, limit: 5 }),
		staleTime: 5 * 60 * 1000,
	});
	console.log("Ongoing challenges", challenges);

	if (isPending) {
		return <Loading />;
	}

	return (
		<main className={styles.main}>
			<MyChallHeader progress="ongoing" />
			<div className={styles.search}>
				<input type="text" placeholder="챌린지 이름을 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} />
				<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" />
			</div>
			<div className={styles.challenges}>
				{challenges?.list?.map(chall => <Challenge challenge={chall} status="ongoing" />)}
			</div>
			<Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(challenges?.totalCount / PAGE_SIZE)} />
		</main>
	);
}

export default Ongoing;
