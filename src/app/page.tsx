import { Header, Hero, Gallery, Footer, Loader } from '@/components/organisms';

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
