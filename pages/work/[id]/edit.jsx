'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from '@/styles/TextEditor.module.css';
import { useRouter } from 'next/router';
// import Toast from '../modals/Toast';
// import CAN_USE_DOM from '@/utils/canUseDom';

const MODULES = {
	toolbar: [
		['bold', 'italic', 'underline'],
		[{ size: [] }],
		[{ color: [] }, { background: [] }],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['clean'],
	],
};

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading Editor...</p>,
});

function TextEditor() {
	const router = useRouter();
	const { id } = router.query;
	const [isIframeOpen, setIsIframeOpen] = useState(false);
	// const [hasDraft, setHasDraft] = useState(false);
	// const STORAGE_KEY = `work_${id}`;
	// let savedContent;
	const [content, setContent] = useState("");

	// if (CAN_USE_DOM) {
		// savedContent = localStorage.getItem(STORAGE_KEY);
	// }



	// useImperativeHandle(ref, () => ({
	// 	saveContent: () => {
	// 		localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
	// 		alert('임시 저장되었습니다.');
	// 		console.log('Saved content:', content);
	// 	},
	// }));

	// const handleBringBackDraft = () => {
	// 	setContent(JSON.parse(savedContent));
	// 	setHasDraft(false);
	// };

	// useEffect(() => {
	// 	if (savedContent) {
	// 		setHasDraft(true);
	// 	}
	// }, []);

	return (
		<>
			<div className={[styles.TextEditor, isIframeOpen ? styles.fixed : ""].join(" ")}>
				<ReactQuill
					value={content}
					onChange={setContent}
					modules={MODULES}
					theme="snow"
					placeholder="번역 시작하기..."
				/>
			</div>
			<div className={[styles.iframeContainer, isIframeOpen ? styles.fixed : styles.closed].join(" ")}>
				<iframe
					className={styles.iframe}
					src={`http://example.com`}
					hidden={!isIframeOpen}
				/>
				<button className={styles.closeButton} onClick={() => setIsIframeOpen(false)}>
					닫기
				</button>
			</div>
			<button className={styles.openButton} onClick={() => setIsIframeOpen(true)}>원문</button>
			{/* {hasDraft && (
				<Toast
					msg="임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요??"
					buttonDisplay="불러오기"
					onConfirm={handleBringBackDraft}
					onClose={() => setHasDraft(false)}
				/>
			)} */}
		</>
	);
};

export default TextEditor;
