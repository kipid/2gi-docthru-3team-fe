import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserProvider";
import { useState } from "react";
import { getChallenges } from "@/apis/challengeService";
import Challenge from "@/components/Challenge";

export default function Home() {
  const user = useUser();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const {
    data: challenges,
    isPending,
    isError
  } = useQuery({
    queryKey: ['challenges', query],
    queryFn: () => getChallenges(query),
  });
  const router = useRouter();

  return (
    <>
      <div className={styles.head}>
        <h1>챌린지 목록</h1>
        {true && <button className={styles.button} type="button" onClick={() => {router.push('/challenges/new')}}>신규 챌린지 신청 <Image width={16} height={16} src="/images/ic_plus.png" alt="New challenge" /></button>}
      </div>
      <div className={styles.subHead}>
        <div className={styles.filter}>
          <div className={styles.filterText}>필터</div>
          <div className={styles.filterIcon}><Image width={16} height={16} src="/images/ic_filter.png" alt="Filter" /></div>
          <div className={styles.filterDropdown}>
            <div className={styles.filterDropdownItem}>최신순</div>
            <div className={styles.filterDropdownItem}>인기순</div>
            <div className={styles.filterDropdownItem}>참여순</div>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.searchIcon}><Image width={16} height={16} src="/images/ic_search.png" alt="Search" /></div>
          <input className={styles.searchInput} type="text" placeholder="챌린지 이름을 검색해보세요." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      {challenges?.map?.(challenge => <Challenge key={challenge.id} challenge={challenge} />)}
    </>
  );
}
