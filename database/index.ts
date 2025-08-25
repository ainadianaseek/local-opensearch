/* eslint-disable no-console */
import { Client } from "@opensearch-project/opensearch";
import { bulkPostData, createIndex } from "./helper.js";
import {
  mobilityTrendsData,
  mobilityTrendsIndexMappings,
  mobilityTrendsIndexName,
} from "./mapping/mobilityTrends.js";

const LOCAL_CLUSTER_URL = "https://localhost:9200";

const createIndexes = async (client: Client) => {
  console.log("Creating Indexes");

  console.log(`Creating index: ${mobilityTrendsIndexName}`);
  await createIndex(
    client,
    mobilityTrendsIndexName,
    mobilityTrendsIndexMappings
  );
  console.log("Indexes Created Successfully");
};

const populateIndexes = async (client: Client) => {
  console.log("Populating Indexes");

  await bulkPostData(client, mobilityTrendsIndexName, mobilityTrendsData);
};

const init = async () => {
  const client = new Client({
    node: LOCAL_CLUSTER_URL,
    auth: {
      username: "admin",
      password: "Seek12345678!",
    },
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await createIndexes(client);
  await populateIndexes(client);
};

init().catch((err) => {
  console.error(err);
});
