'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from '@/styles/TextEditor.module.css';
import { useRouter } from 'next/router';
import sanitizeHtml from 'sanitize-html';
import { useViewport } from '@/context/ViewportProvider';
import Image from 'next/image';
import X from '@/components/X';

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

const SANITIZE_OPTIONS = {
	allowedTags: [
		'p',
		'br',
		'span',
		'strong',
		'em',
		'u',
		's',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'ul',
		'ol',
		'li',
		'blockquote',
		'pre',
		'code',
		'hr',
		'img',
		'figure',
		'figcaption',
		'iframe',
	],
	allowedAttributes: {
		span: ['style'],
		span: ['class'],
		img: ['src', 'alt', 'width', 'height'],
		iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
	},
};

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

function TextEditor() {
  const router = useRouter();
  const viewport = useViewport();
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const { id } = router.query;
  const STORAGE_KEY = `work_${id}`;

  useEffect(() => {
    setSavedContent(localStorage.getItem(STORAGE_KEY));
    console.log("Saved content", savedContent);
    if (savedContent?.length) {
  		setHasDraft(true);
  	}
  }, [savedContent, id]);

  // useImperativeHandle(ref, () => ({
  // 	saveContent: () => {
  // 		localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  // 		alert('임시 저장되었습니다.');
  // 		console.log('Saved content:', content);
  // 	},
  // }));

  const handleBringBackDraft = () => {
  	setContent(savedContent);
  	setHasDraft(false);
  };

  return (
    <>
      <div className={styles.head}>
        {/* TODO: h1 변경하기, button onClick 구현하기 */}
        <h1>번역하기</h1>
        <div className={styles.buttons}>
          <button className={`${styles.button} ${styles.giveupButton}`} type="button" onClick={() => {
            //
          }}>포기 <Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_giveup.png" alt="Give up" /></button>
          <button className={`${styles.button} ${styles.tempSave}`} type="button" onClick={() => {
            setSavedContent(content);
            localStorage.setItem(STORAGE_KEY, savedContent);
            console.log("Saved content", content);
            setHasDraft(true);
            alert('임시 저장되었습니다.');
          }}>임시저장</button>
          <button className={`${styles.button} ${styles.submit}`} type="button" onClick={() => {
            // router.push(`/work/${id}`)
          }}>제출하기</button>
        </div>
      </div>
      {hasDraft && (
        <div className={styles.bringBackContainer}>
          <div className={styles.bringBackTitle}>
            &nbsp; &nbsp;<X width={16} height={16} onClick={() => setHasDraft(false)} />
            &nbsp; &nbsp;임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요??
          </div>
          <button className={styles.bringBackButton} onClick={handleBringBackDraft}>불러오기</button>
        </div>
      )}
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
    </>
  );
};

export default TextEditor;
