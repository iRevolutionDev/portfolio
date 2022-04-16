import React from 'react';
import {Header} from "../Header";
import {Footer} from "../Footer";

import {FaLinkedin, FaTwitter} from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header/>
            <main>{children}</main>
            <Footer>
                <Footer.Text text={`© ${new Date().getFullYear()} Revolution`}/>
                <Footer.Social>
                    <Footer.Social.Item title={"Twitter"} icon={FaTwitter} link={"https://twitter.com/ImRevolutionxk"}/>
                    <Footer.Social.Item title={"Linkedin"} icon={FaLinkedin} link={`https://www.linkedin.com/in/`}/>
                </Footer.Social>
            </Footer>
        </div>
    );
};