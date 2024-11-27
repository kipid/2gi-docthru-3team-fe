import { getApplications } from "@/apis/applicationService.js";
import Error from "@/components/Error.jsx";
import Loading from "@/components/Loading.jsx";
import Pagination from "@/components/Pagination.jsx";
import Table from "@/components/Table.jsx";
import { useViewport } from "@/context/ViewportProvider.jsx";
import styles from "@/styles/Manage.module.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

function Manage() {
  const viewport = useViewport();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({
    page,
    limit: 10,
  });
  const {
    data: applications,
    isPending,
    isError
  } = useQuery({
    queryKey: ['applications', { ...query, page }, page],
    queryFn: () => getApplications({ ...query, page }),
    staleTime: 5 * 60 * 1000,
  });
  console.log("/admin/manage applications", applications);

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <h1>챌린지 신청 관리</h1>
      </div>
      <div className={styles.searchAndSort}>
        <div className={styles.search}>
          <input type="text" placeholder="챌린지 이름을 검색해보세요." />
          <Image width={1.5 * viewport.size} height={1.5 * viewport.size} src="/images/ic_search.png" alt="Search" />
        </div>
        <div className={styles.sort}>
          <select value={sort} onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
            const [key, value] = e.target.value.split('=');
            const [sort, order] = value.split(",");
            setQuery(prev => ({ ...prev, status: undefined, sort: undefined, page, [key]: sort, order }));
          }}>
            <option value="status=Waiting">승인 대기</option>
            <option value="status=Accepted">신청 승인</option>
            <option value="status=Rejected">신청 거절</option>
            <option value="sort=asc,appliedAt">신청 시간 빠른순</option>
            <option value="sort=desc,appliedAt">신청 시간 느린순</option>
            <option value="sort=asc,deadLine">마감 기한 빠른순</option>
            <option value="sort=desc,deadLine">마감 기한 느린순</option>
          </select>
        </div>
      </div>
      <Table applications={applications?.list} />
      <Pagination page={page} setPage={setPage} pageMaxCandi={Math.ceil(applications.totalCount / 10)} />
    </main>
  )
}

export default Manage;
