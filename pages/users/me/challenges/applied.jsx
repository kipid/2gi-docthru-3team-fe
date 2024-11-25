import styles from "@/styles/MyChalls.module.css";
import MyChallHeader from "@/components/MyChallHeader.jsx";
import { useUser } from "@/context/UserProvider.jsx";

function Applied() {
	const user = useUser();

	return (
		<main className={styles.main}>
			<MyChallHeader progress="applied" />
		</main>
	);
}

export default Applied;
