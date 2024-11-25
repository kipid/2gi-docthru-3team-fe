import styles from "./PopUp.module.css";

function PopUp({ error, setError }) {
	return (
		<div id="popup-container" className={[styles.popup_container, (error ? "" : styles.none)].join(" ")}>
			<div id="popup" className={styles.popup}>
				<div id="popup-text" className={styles.popup_text}>
					{error?.message}
				</div>
				<div className={styles.buttons}>
					<button id="popup-button-ok" className={styles.popup_button_ok} onClick={() => {
						setError(null);
						error?.onClose?.();
					}}>확인</button>
					<button id="popup-button-cancel" className={styles.popup_button_cancel} onClick={() => {
						setError(null);
						error?.onCancel?.();
					}}>닫기</button>
				</div>
			</div>
		</div>
	);
}

export default PopUp;
