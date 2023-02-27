import React from "react";
import MainLayout from "app/layouts/MainLayout";
import PickupJobs from "./components/PickupJobs";
import RecommendedJobs from "./components/RecommendedJobs";
import SearchArea from "./components/SeachArea";
import ExternalLinkArea from "./components/ExternalLinkArea";
import SupportCenter from "./components/SupportCenter";

const Homepage: React.FC<Props> = () => {
  return (
    <MainLayout>
      <PickupJobs />
      <RecommendedJobs />
      <SearchArea />
      <ExternalLinkArea />
      <SupportCenter />
    </MainLayout>
  );
};

export default Homepage;

interface Props {}
