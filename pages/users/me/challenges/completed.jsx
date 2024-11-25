import MyChallHeader from "@/components/MyChallHeader";

function Completed() {
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
