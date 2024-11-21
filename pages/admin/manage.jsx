import styles from "@/styles/Manage.module.css";

function Manage() {
  return (
    <main className={main}>
      <div className={styles.head}>
        <h1>챌린지 신청 관리</h1>
      </div>
      <div className={styles.searchAndSort}>
        <div className={styles.search}>
          <input type="text" placeholder="챌린지 이름을 검색해보세요." />
          <Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" />
        </div>
        <div className={styles.sort}>
          <select>
            <option value="1">승인 대기</option>
            <option value="2">신청 승인</option>
            <option value="3">신청 거절</option>
            <option value="4">신청 시간 빠른순</option>
            <option value="5">신청 시간 느린순</option>
            <option value="6">마감 기한 빠른순</option>
            <option value="7">마감 기한 느린순</option>
          </select>
        </div>
      </div>
    </main>
  )
}

export default Manage;
