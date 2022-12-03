import { FC, useState } from "react";
import Icon from "../../custom/icons/Icon";
import { default as Mode } from '../../../public/icons/mode.svg'
import { styles } from "../build/NavbarStyles";

const SwitchMode: FC = () => {

    const [ mode, setMode ] = useState<boolean>( () => {
        if( typeof window === "undefined" ) return false 
        const mode = document.body.style.colorScheme == "light dark"
        ? true : false

        return mode
    } )

    const handleSwitchMode: () => void = () => {

        if( typeof window === "undefined" ) return

        setMode( !mode )
        mode ? document.body.style.cssText = `
            --bg: #3E3E3E;
            --font-color: white;
            --border: 2px solid white;
        ` :
        document.body.style.cssText = `
        --font-color: #3E3E3E;
        --bg: white;
        --border: 2px solid var(--font-color);
        ` 
    }

    return (
      <div className={styles.icon}>
        <div className={styles.mode_icon} onClick={handleSwitchMode}>
        <svg width="100%" height="100%" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="mode">
        <circle id="Ellipse 2" cx="10.5" cy="10.5" r="4.5" fill="#3E3E3E"/>
        <circle id="Ellipse3" cx={ mode ? "19.5" : "13.5" } cy="10.5" r="4.5" fill="#3E3E3E"/>
        <g id="stars">
        <path id="Polygon1" d="M10.5 0L12.6651 3.75H8.33494L10.5 0Z" fill="#3E3E3E"/>
        <path id="Polygon 3" d="M17.9246 3.07538L16.8039 7.25797L13.742 4.1961L17.9246 3.07538Z" fill="#3E3E3E"/>
        <path id="Polygon 5" d="M21 10.5L17.25 12.6651L17.25 8.33494L21 10.5Z" fill="#3E3E3E"/>
        <path id="Polygon 7" d="M17.9246 17.9246L13.742 16.8039L16.8039 13.742L17.9246 17.9246Z" fill="#3E3E3E"/>
        <path id="Polygon 2" d="M10.5 21L8.33494 17.25L12.6651 17.25L10.5 21Z" fill="#3E3E3E"/>
        <path id="Polygon 4" d="M3.07537 17.9246L4.19609 13.742L7.25795 16.8039L3.07537 17.9246Z" fill="#3E3E3E"/>
        <path id="Polygon 6" d="M-1.56095e-07 10.5L3.75 8.33494L3.75 12.6651L-1.56095e-07 10.5Z" fill="#3E3E3E"/>
        <path id="Polygon 8" d="M3.07538 3.07537L7.25797 4.19609L4.1961 7.25795L3.07538 3.07537Z" fill="#3E3E3E"/>
        </g>
        </g>
        </svg>

        </div>
      </div>
    );
}

export default SwitchMode