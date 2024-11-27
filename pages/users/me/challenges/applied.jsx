import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsApplied } from "@/apis/challengeService.js";
import Table from "@/components/Table.jsx";
import Pagination from "@/components/Pagination.jsx";
import { useState } from 'react';
import Loading from "@/components/Loading.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import Image from "next/image";

function Applied() {
	const viewport = useViewport();
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const [query, setQuery] = useState({
		page: 1,
		limit: 10
	});
	const [page, setPage] = useState(1);
	const user = useUser();
	const { data: applications, isPending, isError } = useQuery({
		queryKey: ["applications", "completed", user?.id, query],
		queryFn: () => getMyChallsApplied(query),
		staleTime: 5 * 60 * 1000,
	});
	console.log("Applied applications", applications);

	if (isPending) {
		return <Loading />;
	}

	return (
		<main className={styles.main}>
			<MyChallHeader progress="applied" />
			<div className={styles.searchAndSort}>
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
				<div className={styles.sort}>
					<select value={sort} onChange={(e) => {
						setSort(e.target.value);
						setPage(1);
						const [key, value] = e.target.value.split('=');
						const [sort, order] = value.split(",");
						setQuery(prev => ({ ...prev, status: undefined, sort: undefined, page, [key]: sort, order }));
					}}>
						<option value="status=Waiting">승인 대기</option>
						<option value="status=Accepted">신청 승인</option>
						<option value="status=Rejected">신청 거절</option>
						<option value="sort=asc,appliedAt">신청 시간 빠른순</option>
						<option value="sort=desc,appliedAt">신청 시간 느린순</option>
						<option value="sort=asc,deadLine">마감 기한 빠른순</option>
						<option value="sort=desc,deadLine">마감 기한 느린순</option>
					</select>
				</div>
			</div>
			<Table applications={applications?.list} me={true} />
			<Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(applications?.totalCount / 10)} />
		</main>
	);
}

export default Applied;
