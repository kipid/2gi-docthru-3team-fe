import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsCompleted } from "@/apis/challengeService.js";
import Loading from "@/components/Loading.jsx";
import Challenge from "@/components/Challenge.jsx";
import Pagination from "@/components/Pagination.jsx";
import PopUp from "@/components/PopUp";
import { useRouter } from "next/router";

const PAGE_SIZE = 5;

function Completed() {
	const [page, setPage] = useState(1);
	const [error, setError] = useState();
	const [isUnauthorized, setIsUnauthorized] = useState(false);
	const user = useUser();
	const router = useRouter();
	const viewport = useViewport();
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState({
		page,
		limit: 5,
	});
	const { data: challenges, isPending, isError, error: queryError } = useQuery({
		queryKey: ["challenges", "completed", user?.id, { ...query, page }],
		queryFn: () => getMyChallsCompleted({ ...query, page }),
		staleTime: 5 * 60 * 1000,
		retry: false,
	});
	console.log("Completed challenges", challenges);
	console.log("queryError: ", queryError);

	useEffect(() => {
	  if (queryError?.response?.status === 401) {
		setIsUnauthorized(true);
	  } else {
		setIsUnauthorized(false);
	  }
	}, [queryError]);
  
	if (isPending) return <Loading />;
	if (isUnauthorized) return <PopUp onlyCancel={true} error={{ message: "권한이 없습니다.", onCancel: () => router.push('/login') }} setError={setError} />;

	return (
		<main className={styles.main}>
			<MyChallHeader progress="completed" />
			<div className={styles.search}>
				<input type="text" placeholder="챌린지 이름을 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
					if (e.key === "Process") return;
					if (e.code === "Enter" || e.code === "NumpadEnter") {
						setPage(1);
						setQuery({ ...query, keyword: search.trim() ? search.trim() : undefined });
					}
				}} />
				<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" onClick={() => {
					setPage(1);
					setQuery({ ...query, keyword: search.trim() ? search.trim() : undefined });
				}} />
			</div>
			<div className={styles.challenges}>
				{challenges?.list?.map(chall => <Challenge key={chall.id} challenge={chall} status="completed" />)}
			</div>
			<Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(challenges?.totalCount / PAGE_SIZE)} />
		</main>
	);
}

export default Completed;
