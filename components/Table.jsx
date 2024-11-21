import styles from "@/styles/Table.module.css";

function Table({ applications }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>No.</th>
            <th className={styles.th}>분야</th>
            <th className={styles.th}>카테고리</th>
            <th className={styles.th}>챌린지 제목</th>
            <th className={styles.th}>모집 인원</th>
            <th className={styles.th}>신청일</th>
            <th className={styles.th}>마감 기한</th>
            <th className={styles.th}>상태</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => {
            return (
              <tr>
                <td className={styles.td}>1023</td>
                <td className={styles.td}>공식문서</td>
                <td className={styles.td}>Next.js</td>
                <td className={styles.td}>Next.js - App Router: Routing Fundamentals</td>
                <td className={styles.td}>10</td>
                <td className={styles.td}>24/01/16</td>
                <td className={styles.td}>24/02/24</td>
                <td className={styles.td}>승인 대기</td>
              </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
