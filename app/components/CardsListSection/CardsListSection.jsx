import { CardsList } from "./CardsList";
import { CardsSlider } from "./CardsSlider";
import Styles from "./CardsListSection.module.css";

export const CardsListSection = (props) => {
    return(
        <section className={Styles["list-section"]}>
            {props.data.length ? (
                <>
                    <h2 className={Styles["list-section__title"]} id={props.id}>{props.title}</h2>
                    {props.slider ? <CardsSlider data={props.data}/> : <CardsList data={props.data}/>}
                </>
            ) : (
                <h2 className={Styles["list-section__title"]}>Игр в категории нет</h2>
            )}
        </section>
    )
}