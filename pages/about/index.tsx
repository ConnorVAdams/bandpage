import Head from "next/head";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import MusicComponent from "../../components/music/MusicComponent";
import ContactComponent from "../../components/contact";
import AboutComponent from "../../components/about";
import Navbar from "../../components/nav/Navbar/Navbar";
import SocialBar from "../../components/shared/SocialBar";



export default function About() {
  return (
    <>
      <Head>
        {/* page config */}
        {/* <title>{homeData.Head.title}</title> */}
        {/* <meta name="description" content={homeData.Head.desc} /> */}
        {/* <meta name="keywords" content={homeData.Head.keywords.join(', ')} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <Container disableGutters maxWidth={false}>
            <Navbar />
            <AboutComponent />
            <SocialBar />
          </Container>
    </>
  );
}
