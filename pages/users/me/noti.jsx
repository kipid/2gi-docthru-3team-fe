import { useUser } from "@/context/UserProvider.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_LIMIT = 10;

const Notis = () => {
	const user = useUser();
	const {
		data: notisData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["notis", user.id],
		initialPageParam: 1,
		queryFn: ({ pageParam }) => fetchNotis(pageParam, PAGE_LIMIT),
		getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => lastPage.hasMore ? lastPageParam + 1 : undefined,
	});

	return (
		<div className={styles.notis}>
			{notisData?.pages?.map((page) => page.list.map((noti) => <Noti key={noti.id} noti={noti} />))}
			{hasNextPage && <button onClick={fetchNextPage} disabled={isFetchingNextPage}>더보기</button>}
		</div>
	)
}

export default Notis;
