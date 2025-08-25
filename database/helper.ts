/* eslint-disable no-console */
import type { Client } from "@opensearch-project/opensearch";

const DEBUG = false;

const deleteIndexIfExists = async (client: Client, indexName: string) => {
  const indexExists = await client.indices.exists({ index: indexName });

  if (indexExists) {
    const response = await client.indices.delete({ index: indexName });
    console.log(
      `${indexName} index deleted successfully`,
      DEBUG ? response : ""
    );
  } else {
    console.log(`${indexName} index does not exist`);
  }
};

const createIndex = async (
  client: Client,
  indexName: string,
  mappings: object,
  analysis?: object
) => {
  try {
    await deleteIndexIfExists(client, indexName);
  } catch {
    console.log(
      `deleteIndexIfExists for ${indexName} failed, moving on, this is expected when running the setup script for the first time`
    );
  }

  const response = await client.indices.create({
    index: indexName,
    body: {
      settings: {
        index: {
          number_of_shards: 1,
          number_of_replicas: 0,
        },
        analysis: analysis ?? undefined,
      },
      mappings,
    },
  });

  console.log(`${indexName} index created successfully`, DEBUG ? response : "");
};

const setIndexAliases = async (
  client: Client,
  indexName: string,
  aliases: string[]
) => {
  for (const alias of aliases) {
    const response = await client.indices.putAlias({
      index: indexName,
      name: alias,
    });

    console.log(
      `${alias} successfully associated with ${indexName} index`,
      DEBUG ? response : ""
    );
  }
};

const bulkPostData = async (
  client: Client,
  indexName: string,
  data: object[]
) => {
  const body = data.flatMap((doc) => [{ index: { _index: indexName } }, doc]);

  const response = await client.bulk({ body });

  console.log(`Bulk data posted to ${indexName} index`, DEBUG ? response : "");
};

export { createIndex, setIndexAliases, bulkPostData };
