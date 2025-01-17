import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsApplied } from "@/apis/challengeService.js";
import Table from "@/components/Table.jsx";
import Pagination from "@/components/Pagination.jsx";
import { useState, useRef } from 'react';
import Loading from "@/components/Loading.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import Image from "next/image";
import useAuth from "@/hooks/useAuth.jsx";
import PopUp from "@/components/PopUp.jsx";
import Sort from "@/components/Sort.jsx";

function Applied() {
	const viewport = useViewport();
	const [search, setSearch] = useState("");
	const [currentSort, setCurrentSort] = useState("status=Waiting");
	const { errorMessage, setErrorMessage } = useAuth();
	const sortRef = useRef();
	const [query, setQuery] = useState({
		page: 1,
		limit: 10
	});
	const [page, setPage] = useState(1);
	const user = useUser();
	const { data: applications, isPending, isError } = useQuery({
		queryKey: ["applications", user?.id, query],
		queryFn: () => getMyChallsApplied(query),
		staleTime: 5 * 60 * 1000,
	});

	if (isPending) return <Loading />;

	const handleSortChange = (e) => {
		setPage(1);
		setCurrentSort(e.target.value);
		const [key, value] = e.target.value.split('=');
		const [sort, order] = value.split(",");
		setQuery(prev => ({ ...prev, status: undefined, sort: undefined, page, [key]: sort, order }));
	  }

	return (
		<main className={styles.main}>
			{errorMessage && <PopUp onlyCancel={true} error={errorMessage} setError={setErrorMessage} />}
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
					<Sort ref={sortRef} currentValue={currentSort} onChange={handleSortChange}/>
				</div>
			</div>
			<Table applications={applications?.list} me={true} />
			<Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(applications?.totalCount / 10)} />
		</main>
	);
}

export default Applied;
