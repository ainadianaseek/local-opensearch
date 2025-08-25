import mobilityTrendsDocuments from "../data/mockMobilityTrends.json" assert { type: "json" };
const mobilityTrendsIndexName = "mobility-trends";

const mobilityTrendsIndexAliases = ["mobility-trends"];

const mobilityTrendsIndexMappings = {
  properties: {
    candidateId: {
      type: "long",
    },
    approachable: {
      type: "boolean",
    },
    workHistory: {
      type: "nested",
      properties: {
        startDate: {
          type: "date",
          format: "yyyy-MM-dd",
        },
        endDate: {
          type: "date",
          format: "yyyy-MM-dd",
        },
        normalisedRoleTitleId: {
          type: "keyword",
        },
      },
    },
    candidateLocations: {
      type: "nested",
      properties: {
        locationID: {
          type: "long",
        },
        locationLevel: {
          type: "keyword",
        },
        created: {
          type: "date",
          format: "strict_date_optional_time",
        },
        lastUpdated: {
          type: "date",
          format: "strict_date_optional_time",
        },
        countryId: {
          type: "integer",
        },
        stateId: {
          type: "keyword",
        },
        seekLocationId: {
          type: "keyword",
        },
        seekAreaId: {
          type: "keyword",
        },
        suburbId: {
          type: "keyword",
        },
      },
    },
  },
};

const mobilityTrendsData = mobilityTrendsDocuments;

export {
  mobilityTrendsIndexName,
  mobilityTrendsIndexAliases,
  mobilityTrendsIndexMappings,
  mobilityTrendsData,
};
