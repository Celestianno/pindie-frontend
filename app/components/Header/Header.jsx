"use client";
import { AuthForm } from "../AuthForm/AuthForm";
import { Overlay } from "../Overlay/Overlay";
import { Popup } from "../Popup/Popup";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/app/store/app-store";
import { RegForm } from "../AuthForm/RegForm";
import { useRouter } from "next/navigation";
import Styles from "./Header.module.css";

export const Header = () => {
  const pathname = usePathname();

  const router = useRouter();

  const authContext = useStore();

  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);

  const openPopup = () => setPopupIsOpened(true);
  const closePopup = () => setPopupIsOpened(false);

  const onRegistration = () => setIsRegistration(true);
  const offRegistration = () => setIsRegistration(false);

  const handleLogout = () => {
    authContext.logout();
  }

  return (
    <header className={Styles['header']}>
      {pathname === "/" ? (
        <div className={Styles['logo']}>
          <img
          className={Styles['logo__image']}
          src="/images/logo.svg"
          alt="Логотип Pindie"
          />
        </div>
      ) : (
        <Link href="/" className={Styles['logo']}>
          <img
            className={Styles['logo__image']}
            src="/images/logo.svg"
            alt="Логотип Pindie"
          />
        </Link>
      )}
      <nav className={Styles['menu']}>
        <ul className={Styles['menu__list']}>
          <li className={Styles['menu__item']}>
            <Link href="/new" className={`${Styles['menu__link']} ${pathname === "/new" && Styles["menu__link_active"]}`}>
              Новинки
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/popular" className={`${Styles['menu__link']} ${pathname === "/popular" && Styles["menu__link_active"]}`}>
              Популярные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/shooters" className={`${Styles['menu__link']} ${pathname === "/shooters" && Styles["menu__link_active"]}`}>
              Шутеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/runners" className={`${Styles['menu__link']} ${pathname === "/runners" && Styles["menu__link_active"]}`}>
              Ранеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/pixel-games" className={`${Styles['menu__link']} ${pathname === "/pixel-games" && Styles["menu__link_active"]}`}>
              Пиксельные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/tds" className={`${Styles['menu__link']} ${pathname === "/tds" && Styles["menu__link_active"]}`}>
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles['auth']}>
          {pathname === "/profile" ? (
            <button className={Styles["auth__button"]} onClick={() => {router.push("/"); handleLogout()}}>Выйти</button>
          ) : (
            <>
              <button className={Styles["auth__button"]}>Меню</button>
              <div className={Styles["auth__menu"]}>
              {authContext.isAuth ? (
                <>
                  <button className={Styles["auth__button"]} onClick={() => router.push("/profile")}>Профиль</button>
                  <button className={Styles["auth__button"]} onClick={handleLogout}>Выйти</button>
                </>
              ) : (
                <>
                  <button className={Styles["auth__button"]} onClick={() => {onRegistration(); openPopup()}}>Регистрация</button>
                  <button className={Styles["auth__button"]} onClick={openPopup}>Войти</button>
                </>
              )}
              </div>
            </>
          )}
        </div>
      </nav>
      <Overlay isOpened={popupIsOpened} onClose={{closePopup, offRegistration}}/>
      <Popup isOpened={popupIsOpened} onClose={{closePopup, offRegistration}}>
        {isRegistration ? <RegForm close={{closePopup, offRegistration}}/> : <AuthForm close={closePopup}/>}
      </Popup>
    </header>
  )
}
