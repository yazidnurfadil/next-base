import { Metadata } from "next";

import { HomepageContainer } from "@/components/pages/public/HomepageContainer";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = async () => <HomepageContainer />;

export default HomePage;