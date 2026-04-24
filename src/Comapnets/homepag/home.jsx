import { useState } from "react";
import Head from "../Headr/Headr";
import Main from "../Main/main (1)";

const home = () => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <>
      <Head onSearch={setSearchResults} />
      <Main searchResults={searchResults} />
    </>
  );
};

export default home;