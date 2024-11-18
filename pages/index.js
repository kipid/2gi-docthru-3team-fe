import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    data: challenges,
    isPending,
    isError
  } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => getChallenges(),
  });

  return (
    <>
      <Challenges />
    </>
  );
}
