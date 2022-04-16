import React from 'react';
import {IconType} from "react-icons";

type TextProps = {
    text: string
}

const Text: React.FC<TextProps> = ({text}) => {
    return <span>{text}</span>
}

type SocialProps = {
    title: string;
    icon: IconType;
    link: string;
}

const SocialItem: React.FC<SocialProps> = ({title, icon, link}) => {
    return (
        <li className="w-6 h-6 opacity-70 hover:opacity-100" key={title}>
            <a title={title} target="_blank" rel="noreferrer" href={link}>{React.createElement(icon, {className: "text-gray-600"})}</a>
        </li>
    )
}

type SocialContainerProps = {
    children: React.ReactNode
}

type SocialContainerExports = {
    Item: typeof SocialItem;
}

const Social: React.FC<SocialContainerProps> & SocialContainerExports = ({children}) => {
    return (
        <ul className="flex gap-6">
            {children}
        </ul>
    )
}

Social.Item = SocialItem;

type FooterProps = {
    children: React.ReactNode
}

type FooterExports = {
    Text: typeof Text;
    Social: typeof Social;
}

const Footer: React.FC<FooterProps> & FooterExports = ({children}) => {
     return (
          <div className="flex justify-between mt-8 px-4 p-8 md:mt-20 md:px-20">
              {children}
          </div>
     );
};

Footer.Text = Text;
Footer.Social = Social;

export {Footer};