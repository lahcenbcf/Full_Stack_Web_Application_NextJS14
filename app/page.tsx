import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="head_text text-center">Discover & share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center"> AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">Promptai is an platform designed to share, create and discover creative prompts</p>

      <Feed />
    </section>
  );
}
