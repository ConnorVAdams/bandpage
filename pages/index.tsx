import Head from "next/head";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import HomeComponent from "../components/home/HomeComponent";
import Navbar from "../components/nav/Navbar/Navbar";
import SocialBar from "../components/shared/SocialBar";


export default function Home() {
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
            <HomeComponent />
            <SocialBar />
          </Container>
    </>
  );
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   let locale = context.locale as string;


//   return {
//     props: { locale }
//     // revalidate: REVALIDATION_PERIOD
//   };
// };
