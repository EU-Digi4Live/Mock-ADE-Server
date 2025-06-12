import { removeEmptyEntries } from "./jsonPrettifier.js";

import type { DBQueryResult, DBQueryKey } from "../types/milkDBrecord.js";
import type { icarMilkingVisitEventResource } from '../types/milkURLScheme.js';

/**
 * Returns metadata of the record in ICAR ADE format.
 * @param {DBQueryResult<DBQueryKey>} record
 * @param {string} source URI or reverse DNS of the source system where record is retrieved from.
 * @returns {icarMilkingVisitEventResource["meta"]}
 */
export async function convertMeta(
  record: DBQueryResult<DBQueryKey>,
  source: string
  ) {
    const meta: icarMilkingVisitEventResource["meta"] = {
        source: source,
        sourceId: record["meta.sourceid"],
        isDeleted: record["meta.isdeleted"],
        modified: record["meta.modified"],
        created: record["meta.created"],
        creator: record["meta.creator"],
        validFrom: record["meta.validfrom"],
        validTo: record["meta.validto"]
    };
    const filteredMeta = removeEmptyEntries(meta);
    return filteredMeta;
}

/**
 * Returns trait label of the record in ICAR ADE format.
 * @param {DBQueryResult<DBQueryKey>} record
 * @returns {icarMilkingVisitEventResource["traitLabel"]}
 */
export async function convertTraitLabel(record: DBQueryResult<DBQueryKey>) {
  const traitLabel: icarMilkingVisitEventResource["traitLabel"] = {
      id: record["traitlabel.id"],
      scheme: record["traitlabel.scheme"]
  };
  let filteredTraitLabel = removeEmptyEntries(traitLabel);
  if (Object.keys(filteredTraitLabel).length == 0) filteredTraitLabel = null;
  return filteredTraitLabel;
}