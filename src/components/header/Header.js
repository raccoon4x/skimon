import React from "react";
import './Header.css';
import iconLogoPath from '../../images/icon_logo.svg';
import Dropdown from "react-multilevel-dropdown";

function Header({clusters, currentCluster, onClick}) {

  try {
    return (
      <header className="header">
        <a href="/skimon" className="btn_header_title">
          <img src={iconLogoPath} alt="icon logo"/>
          Мониторинг горнолыжных курортов
        </a>
        {
        <Dropdown className="btn_header" title={currentCluster.name || clusters[0].cluster_name}> 
          {clusters.map((cluster) => (
            <Dropdown.Item
              title={cluster.cluster_name}
              key={cluster.cluster_id}
              onClick={onClick}
              id={cluster.cluster_id}>

              {cluster.cluster_name}
              {cluster.regions && 
              <Dropdown.Submenu>
                {cluster.regions.map((region) => (
                  <Dropdown.Item
                    title={region.region_name}
                    key={region.region_id}
                    id={region.region_id}>
                    {region.region_name}
                  </Dropdown.Item>
              ))}
              </Dropdown.Submenu>
              }
            </Dropdown.Item>
          ))
          }
        </Dropdown>
        }
      </header>
    )
  } catch {

  }
}

export default Header;
// 