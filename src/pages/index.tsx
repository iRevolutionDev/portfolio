import type { NextPage } from 'next';

import {Container} from "../components/Container";
import {HandWave} from "../components/HandWave";

const Index: NextPage = () => {
    return (
        <Container>
            <Container.Title>
                Hey there <HandWave/>
            </Container.Title>

            <Container.Description>
                I am a software engineer, specializing in creating high performance and
                accessible websites and applications for Android, IOS and Desktop.
                I&apos;m always studying and taking chances on new experiences and
                passionate about reverse engineering and C/C++.
            </Container.Description>
        </Container>
    )
}

export default Index;
