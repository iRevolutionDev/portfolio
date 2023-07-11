import React from "react";

type ContainerProps = {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 mb-12 gap-2">
            {children}
        </div>
    )
}

type CardExtension = {
    Container: typeof Container;
}

type CardProps = {
    title: string;
    description: string;
    role: string;
}

const Card: React.FC<CardProps> & CardExtension = ({title, description, role}) => {

    return (
        <div
            className="flex flex-col h-36 p-4 border border-ctp-surface1 rounded-md bg-ctp-surface0 hover:border-ctp-overlay0 transition-colors duration-250">
            <h1 className="font-semibold text-[16px] mb-1">{title}</h1>
            <p className="text-sm text-[14px]">{description}</p>
            <div className="mt-auto flex flex-row gap-4 text-sm">
                <p className="flex flex-row items-center text-base">
                    <div className="w-3 h-3 rounded-full mr-1 bg-brand-name"/>
                    {role}
                </p>
            </div>
        </div>
    )
}

Card.Container = Container;

export default Card;