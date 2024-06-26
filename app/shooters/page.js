"use client";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function Shooters() {
    const shooterGames = useGetDataByCategory(endpoints.games, "shooter");

    return(
        <main className="main-inner">
            {shooterGames ? (
                <CardsListSection id="shooter" title="Шутеры" data={shooterGames} slider={false}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}