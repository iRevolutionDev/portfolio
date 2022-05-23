import React from 'react';
import {Header} from "../../layouts/Header";
import {Footer} from "../../layouts/Footer";

import {FaLinkedin, FaTwitter} from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header>
                <Header.Container>
                    <Header.Desktop>
                        <Header.Nav>
                            <Header.Nav.Item path="/" title="Home"/>
                            <Header.Nav.Item path="/" title="About"/>
                            <Header.Nav.Item path="/" title="Contact"/>
                        </Header.Nav>
                    </Header.Desktop>
                    <Header.ThemeButton/>
                </Header.Container>
            </Header>
            <Header.Mobile>

            </Header.Mobile>
            <main>{children}</main>
            <Footer>
                <Footer.Text text={`© ${new Date().getFullYear()} Made with ❤️️ Revolution`}/>
                <Footer.Social>
                    <Footer.Social.Item title={"Twitter"} icon={FaTwitter} link={"https://twitter.com/ImRevolutionxk"}/>
                    <Footer.Social.Item title={"Linkedin"} icon={FaLinkedin} link={`https://www.linkedin.com/in/`}/>
                </Footer.Social>
            </Footer>
        </div>
    );
};