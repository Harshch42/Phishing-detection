import React from "react";

import { Header } from "../components";
import AlertCardList from "./AlertCardList";

const Orders = () => {
  const alertData = [
    {
      website_name: "Fake News Hub",
      desc_as_fake_websites_done_by_them:
        "A network of websites spreading false information and conspiracy theories.",
      website_url: "http://fakenewshub.com",
    },
    {
      website_name: "Scam Alert Online",
      desc_as_fake_websites_done_by_them:
        "Promotes fraudulent schemes and scams, preying on unsuspecting individuals.",
      website_url: "http://scamalertonline.net",
    },
    {
      website_name: "Conspiracy Central",
      desc_as_fake_websites_done_by_them:
        "Publishes baseless conspiracy theories and misinformation.",
      website_url: "http://conspiracycentral.org",
    },
    {
      website_name: "Fake Product Reviews Forum",
      desc_as_fake_websites_done_by_them:
        "Hosts fake product reviews written by undisclosed paid shills.",
      website_url: "http://fakeproductreviewsforum.com",
    },
    {
      website_name: "Phishing Paradise",
      desc_as_fake_websites_done_by_them:
        "Creates phishing websites to steal sensitive information from users.",
      website_url: "http://phishingparadise.com",
    },
    {
      website_name: "Rumor Mill Gazette",
      desc_as_fake_websites_done_by_them:
        "Spreads unverified rumors and gossip as fact.",
      website_url: "http://rumormillgazette.org",
    },
    {
      website_name: "Fake Health Cures Inc.",
      desc_as_fake_websites_done_by_them:
        "Promotes fake health remedies and unproven treatments.",
      website_url: "http://fakehealthcuresinc.com",
    },
    {
      website_name: "Fake Charity Foundation",
      desc_as_fake_websites_done_by_them:
        "Pretends to be a charity organization but diverts donations for personal gain.",
      website_url: "http://fakecharityfoundation.org",
    },
    {
      website_name: "Counterfeit Marketplace",
      desc_as_fake_websites_done_by_them:
        "Sells counterfeit products and scams Feedback.",
      website_url: "http://counterfeitmarketplace.com",
    },
    {
      website_name: "Fake Scholarship Portal",
      desc_as_fake_websites_done_by_them:
        "Offers fake scholarships and steals personal information from applicants.",
      website_url: "http://fakescholarshipportal.net",
    },
  ];

  const alerts = JSON.parse(localStorage.getItem("alerts"));
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header title="Alerts - Frequently flagged webites" />
      {alerts.map((item, index) => (
        <AlertCardList key={index} data={item} />
      ))}
    </div>
  );
};
export default Orders;
