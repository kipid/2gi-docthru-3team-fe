import styles from "./Loading.module.css";

function Loading() {
	return <div class={styles.loading}><div class={styles.outerCircle}></div><div class={styles.innerCircle}></div></div>
}

export default Loading;
