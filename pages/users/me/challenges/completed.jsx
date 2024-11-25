import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getMyChallsCompleted } from "@/apis/challengeService.js";
import Loading from "@/components/Loading.jsx";

function Completed() {
	const user = useUser();
	const viewport = useViewport();
	const [search, setSearch] = useState("");
	const { data: challenges, isPending, isError } = useQuery({
		queryKey: ["challenges", "completed", user?.id],
		queryFn: () => getMyChallsCompleted(),
		staleTime: 5 * 60 * 1000,
	});
	console.log("Completed challenges", challenges);

	if (isPending) {
		return <Loading />;
	}

	return (
		<main className={styles.main}>
			<MyChallHeader progress="completed" />
			<div className={styles.search}>
				<input type="text" placeholder="챌린지 이름을 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} />
				<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" />
			</div>
			<div className={styles.challenges}>
				{/* challenges?.list?.map(chall => <Challenge challenge={chall} status="completed" />) */}
			</div>
		</main>
	);
}

export default Completed;
