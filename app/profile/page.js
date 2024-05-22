"use client";
import { useRouter } from "next/navigation";
import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { Preloader } from "../components/Preloader/Preloader";
import Styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { getNormalizedFavouriteGameData, isResponseOk } from "../api/api-utils";
import { useStore } from "../store/app-store";

export default function Profile() {
    const [gameData, setGameData] = useState(null);
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const store = useStore();
    const router = useRouter();

    useEffect(() => {
        store.isAuth === false && router.push("/");
    }, [store.isAuth]);
    
    useEffect(() => {
        async function fetchData() {
            const data = await getNormalizedFavouriteGameData(endpoints.games, store.user.id);

            if(isResponseOk(data)) {
                data.length && setGameData(data);
                setPreloaderVisible(false);
            }

        }

        store.user && fetchData();
    }, [store.user]);

    return(
        <main className="main-inner">
            {store.user && <h2 className={Styles["profile__title"]}>Профиль {store.user.username}</h2>}
            {gameData && store.user ? (
                <CardsListSection id="favourite" title="Понравившиеся игры" data={gameData} slider={false}/>
            ) : preloaderVisible ? (
                <Preloader/>
            ) : (
                <h2 className={Styles["empty__message"]}>Здесь пока ничего нет :(</h2>
            )}
        </main>
    )
}