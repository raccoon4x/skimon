import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './InfoPage.module.css';
import Accordion from "../accordion/Accordion";
import Footer from "../footer/Footer";
import PageNotFound from "../pageNotFound/PageNotFound";

function InfoPage({resorts, ...props}) {

  const [isOpenMap, setIsOpenMap] = useState(false);

  function handlerMap() {
    setIsOpenMap(!isOpenMap)
  };

  function closeMap(evt) {
    if (!evt.target.className.includes('map')) {
      setIsOpenMap(false)
    }
    if (evt.key === 'Escape') {
      setIsOpenMap(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeMap);
    document.addEventListener('keydown', closeMap);
    return () => {
      document.removeEventListener('click', closeMap);
      document.removeEventListener('keydown', closeMap);
    }
  })

  let { id } = useParams();
  const resort = resorts.find(el => el.id === +id);

  return resort
    ? (
      <div className={styles.infoPage}>
        <header>

        <Link className={styles.btn_back} to={"/skimon"}>
          {/* Стрелка влево */}
          <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M7.82788 11L13.1919 5.63595L11.7779 4.22195L3.99988 12L11.7779 19.778L13.1919 18.364L7.82788 13L19.9999 13L19.9999 11L7.82788 11Z"/>
          </svg>
            Назад
        </Link>

        <div className={styles.header_title}>
          <h1>{resort.name}</h1>
          <div className={styles.links}>
            <a className={styles.btn_link} target="blank" href={resort.url}>Официальный сайт</a>
            <button onClick={handlerMap} className={`${styles.btn_link} ${styles.btn_primary} map`}>Показать на карте</button>
          </div>
          
        </div>
        </header>
        <hr />
        <main>
          {resort.live_streams.length > 0 && <Accordion props={resort} type='webcams' title='Онлайн трансляция'/>}

          <Accordion props={resort} type='schedule' title='Режим работы'/>
        </main>
        { isOpenMap &&
          <YMaps>
            <Map className={styles.map} defaultState={{
              center: [resort.lat, resort.lon],
              zoom: 8,
              controls: ["zoomControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}>
              <Placemark defaultGeometry={[resort.lat, resort.lon]} />
            </Map>
          </YMaps>
        }
        <Footer />

        
      </div>
      ) : ''
}

export default InfoPage