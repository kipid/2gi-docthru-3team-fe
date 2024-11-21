import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader";
import { useState } from 'react';
import { useViewport } from "@/context/ViewportProvider.jsx";
import Image from "next/image";

function Ongoing() {
	const viewport = useViewport();
	const [search, setSearch] = useState("");

	return (
		<main className={styles.main}>
			<MyChallHeader progress="ongoing" />
			<div className={styles.search}>
				<input type="text" placeholder="챌린지 이름을 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} />
				<Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" />
			</div>
		</main>
	);
}

export default Ongoing;
