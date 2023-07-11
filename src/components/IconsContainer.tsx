import React from "react";
import {IconType} from "react-icons";

type IconProps = {
    Icon: IconType;
    size?: number;
    color?: string;
}

const Icon: React.FC<IconProps> = ({ Icon, size, color }) => {
    return (
        <li className="flex p-2">
            <Icon size={size ?? 32} color={color}/>
        </li>
    )
}

type IconsContainerExtension = {
    Icon: typeof Icon;
}

type IconsContainerProps = {
    children?: React.ReactNode;
}

const IconsContainer: React.FC<IconsContainerProps> & IconsContainerExtension = ({ children }) => {
    return (
        <ul className="w-full flex flex-wrap flex-row justify-center p-1 border border-ctp-surface1 rounded-md mb-12 bg-ctp-surface0">
            {children}
        </ul>
    )
}

IconsContainer.Icon = Icon;

export default IconsContainer;