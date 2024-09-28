import Header from "../Header/Header";

const Page = ({ children }: { children?: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
      <footer />
    </>
  );
};

export default Page;
