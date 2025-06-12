import type {
  Context,
  UnknownParams,
} from 'openapi-backend';

declare namespace Components {
    namespace Parameters {
        export type LocationId = string;
        export type LocationScheme = string;
        export type MetaModifiedFrom = string; // date-time
        export type MetaModifiedTo = string; // date-time
    }
    export interface PathParameters {
        "location-scheme": Parameters.LocationScheme;
        "location-id": Parameters.LocationId;
    }
    export interface QueryParameters {
        "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
        "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
    }
    namespace Responses {
        /**
         * A collection of RFC7807 compliant problem responses for JSON APIs.
         */
        export interface Default {
            errors?: {
                /**
                 * Machine readable URI or code that defines the type of error or warning.
                 */
                type?: string;
                /**
                 * Distinguish errors, warnings, and informational messages.
                 */
                severity?: "Information" | "Warning" | "Error";
                /**
                 * The HTTP status code applicable to this problem.
                 */
                status?: number | null; // int32
                /**
                 * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                 */
                title?: string;
                /**
                 * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                 */
                detail?: string;
                /**
                 * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                 */
                instance?: string | null;
            }[];
        }
    }
    namespace Schemas {
        export type BatchResults = {
            /**
             * Unique identifier created in the system for this event. SHOULD be a UUID.
             */
            id?: string;
            /**
             * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * An array of errors for this resource. The messages array may be unspecified OR null.
             */
            messages?: {
                /**
                 * Machine readable URI or code that defines the type of error or warning.
                 */
                type?: string;
                /**
                 * Distinguish errors, warnings, and informational messages.
                 */
                severity?: "Information" | "Warning" | "Error";
                /**
                 * The HTTP status code applicable to this problem.
                 */
                status?: number | null; // int32
                /**
                 * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                 */
                title?: string;
                /**
                 * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                 */
                detail?: string;
                /**
                 * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                 */
                instance?: string | null;
            }[] | null;
        }[];
        /**
         * Represents a collection of daily milking averages per animal. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarDailyMilkingAveragesCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test day result events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The date on which the average has been calculated.
                 */
                averageDate: string; // date
                /**
                 * The average-amount of milk produced within 24h.
                 */
                milkYieldAvg24h?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
                /**
                 * The average-amount of milk produced within 7 days.
                 */
                milkYieldAvg7days?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
            }[];
        }
        /**
         * Represents a collection of lactations. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarLactationCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactations.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                beginDate?: string; // date-time
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                endDate?: string; // date-time
                /**
                 * The parity of the animal during this lactation.
                 */
                parity?: number;
                /**
                 * The length of the lactation until this moment.
                 */
                lactationLength?: number;
                /**
                 * The amount of milk produced in this lactation.
                 */
                milkAmount?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
                /**
                 * The amount of fat produced in this lactation.
                 */
                fatAmount?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
                /**
                 * The amount of protein produced in this lactation.
                 */
                proteinAmount?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
                /**
                 * The amount of lactosis produced in this lactation.
                 */
                lactosisAmount?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM" | "LBR";
                    value: number; // double
                };
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                lastTestDay?: string; // date-time
                /**
                 * This type of lactation based on lactation length that is delivered.
                 */
                lactationType?: "Normal" | "100Days" | "200Days" | "305Days" | "365Days";
                /**
                 * milk recording method information.
                 */
                milkRecordingMethod?: {
                    /**
                     * Protocol A: Official MRO representative, Protocol B: Herd owner or its nominee, Protocol C: Official MRO representative or herd owner or its nominee.
                     */
                    milkRecordingProtocol?: "A-OfficialMRORepresentative" | "B-HerdOwnerOrNominee" | "C-Both";
                    /**
                     * all milkings at testday, all milkings in period, one milking at testday.
                     */
                    milkRecordingScheme?: "AllMilkingsAtTestday" | "AllMilkingsInPeriod" | "OneMilkingAtTestday";
                    /**
                     * 1 per day, 2, 3, 4, Continuous Milkings (e.g. robotic milking).
                     */
                    milkingsPerDay?: "1" | "2" | "3" | "4" | "Robot";
                    /**
                     * proportional size sampling of all milkings, constant size sampling of all milkings, sampling of one milking at alternating moments (Alternative Sampling), sampling of one milking at the same moments (Corrected Sampling), sampling of one milking at changing moments (AMS), sampling of multiple milkings at changing moments (AMS).
                     */
                    milkSamplingScheme?: "ProportionalSizeSamplingOfAllMilkings" | "ConstantSizeSamplingOfAllMilkings" | "AlternateSampling" | "CorrectedSampling" | "OneMilkingSampleInAMS" | "MulitpleMilkingSampleInAMS";
                    /**
                     * A number in days of the interval between milk recordings. In case of e.g.4 weeks, use 30.
                     */
                    recordingInterval?: number;
                    /**
                     * Composite = composite sample from morning and evening, Morning, Evening.
                     */
                    milkSamplingMoment?: "Composite" | "Morning" | "Evening";
                    /**
                     * indicates whether this information is certified by ICAR
                     */
                    icarCertified?: boolean;
                    /**
                     * Official milk result supplied by milk recording organisation, Measure by ICAR approved equipment, Measure by not approved equipment
                     */
                    milkingType?: "OfficialMilkResultSuppliedByMRO" | "MeasureByICARApprovedEquipment" | "MeasureByNotApprovedEquipment";
                };
            }[];
        }
        export type IcarLactationStatusObservedEventArray = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The lactation status at the time of observation.
             */
            observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
        }[];
        /**
         * Represents a collection of animal lactation status observation events. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarLactationStatusObservedEventCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactation status events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The lactation status at the time of observation.
                 */
                observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
            }[];
        }
        /**
         * This event records an observed lactation status without necessarily a parturition, drying off, or other event.
         */
        export interface IcarLactationStatusObservedEventResource {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The lactation status at the time of observation.
             */
            observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
        }
        /**
         * Represents a collection of milk predictions per animal. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarMilkPredictionsCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case milk prediction events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The amount of milk, fat and protein milked in a defined period of time
                 */
                averagePredictedProduction?: {
                    /**
                     * The amount of milk milked
                     */
                    milkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    fatWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    proteinWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                     */
                    hours?: number;
                };
                /**
                 * The days in milk in a lactation when the peak production is expected to occur.
                 */
                daysInMilkAtLactationPeak?: number;
                /**
                 * The amount of milk, fat and protein milked in a defined period of time
                 */
                lactationPeakProduction?: {
                    /**
                     * The amount of milk milked
                     */
                    milkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    fatWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    proteinWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                     */
                    hours?: number;
                };
                /**
                 * The amount of milk, fat and protein milked in a defined period of time
                 */
                predictedProductionNextMR?: {
                    /**
                     * The amount of milk milked
                     */
                    milkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    fatWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    proteinWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                     */
                    hours?: number;
                };
            }[];
        }
        export type IcarMilkingVisitEventArray = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingStartingDateTime: string; // date-time
            /**
             * The length in time of the milking
             */
            milkingDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * The length in time of the milking
             */
            milkingVisitDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * This code allows organisations to distinguish between manual and automated milking.
             */
            milkingType?: "Manual" | "Automated";
            /**
             * A certified milking weight that complies with the ICAR guidelines.
             */
            milkingMilkWeight: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * indication whether this milking was completed normally.
             */
            milkingComplete?: boolean;
            /**
             * The milking parlour unit where the milking took place.
             */
            milkingParlourUnit?: string;
            /**
             * The milking box number where the milking took place.
             */
            milkingBoxNumber?: string;
            /**
             * The ID of the device where the milking took place.
             */
            milkingDeviceId?: string;
            /**
             * The ID of the device where the measurement of the milking took place
             */
            measureDeviceId?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingShiftLocalStartDate?: string; // date-time
            /**
             * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
             */
            milkingShiftNumber?: number;
            /**
             * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
             */
            quarterMilkings?: {
                /**
                 * the unique id of the quarter milking
                 */
                icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                /**
                 * Optional milking robot X position. Vendors may choose not to provide this.
                 */
                xposition?: number | null;
                /**
                 * Optional milking robot Y position. Vendors may choose not to provide this.
                 */
                yposition?: number | null;
                /**
                 * Optional milking robot Z position. Vendors may choose not to provide this.
                 */
                zposition?: number | null;
                /**
                 * The length in time of the milking
                 */
                quarterMilkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                quarterMilkingWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                icarQuarterMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                icarQuarterCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
            }[];
            /**
             * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
             */
            animalMilkingSample?: {
                /**
                 * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                 */
                bottleIdentifierType?: "BRC" | "RFD";
                /**
                 * Number of the sample rack
                 */
                rackNumber?: string;
                /**
                 * Position of the bottle in the sample rack
                 */
                bottlePosition?: string;
                /**
                 * Bottle identifier read from barcode or RFID
                 */
                bottleIdentifier?: string;
                /**
                 * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                 */
                validSampleFillingIndicator?: "0" | "1" | "2";
                /**
                 * The operator that took the sample
                 */
                operator?: string;
            }[];
            /**
             * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
             */
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
        }[];
        /**
         * Represents a collection of animal milking visit events. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarMilkingVisitEventCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case milking visit events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                milkingStartingDateTime: string; // date-time
                /**
                 * The length in time of the milking
                 */
                milkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The length in time of the milking
                 */
                milkingVisitDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * This code allows organisations to distinguish between manual and automated milking.
                 */
                milkingType?: "Manual" | "Automated";
                /**
                 * A certified milking weight that complies with the ICAR guidelines.
                 */
                milkingMilkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * indication whether this milking was completed normally.
                 */
                milkingComplete?: boolean;
                /**
                 * The milking parlour unit where the milking took place.
                 */
                milkingParlourUnit?: string;
                /**
                 * The milking box number where the milking took place.
                 */
                milkingBoxNumber?: string;
                /**
                 * The ID of the device where the milking took place.
                 */
                milkingDeviceId?: string;
                /**
                 * The ID of the device where the measurement of the milking took place
                 */
                measureDeviceId?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                milkingShiftLocalStartDate?: string; // date-time
                /**
                 * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
                 */
                milkingShiftNumber?: number;
                /**
                 * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
                 */
                quarterMilkings?: {
                    /**
                     * the unique id of the quarter milking
                     */
                    icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                    /**
                     * Optional milking robot X position. Vendors may choose not to provide this.
                     */
                    xposition?: number | null;
                    /**
                     * Optional milking robot Y position. Vendors may choose not to provide this.
                     */
                    yposition?: number | null;
                    /**
                     * Optional milking robot Z position. Vendors may choose not to provide this.
                     */
                    zposition?: number | null;
                    /**
                     * The length in time of the milking
                     */
                    quarterMilkingDuration?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode?: "SEC" | "MIN";
                        value?: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    quarterMilkingWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    icarQuarterMilkingSample?: {
                        /**
                         * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                         */
                        bottleIdentifierType?: "BRC" | "RFD";
                        /**
                         * Number of the sample rack
                         */
                        rackNumber?: string;
                        /**
                         * Position of the bottle in the sample rack
                         */
                        bottlePosition?: string;
                        /**
                         * Bottle identifier read from barcode or RFID
                         */
                        bottleIdentifier?: string;
                        /**
                         * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                         */
                        validSampleFillingIndicator?: "0" | "1" | "2";
                        /**
                         * The operator that took the sample
                         */
                        operator?: string;
                    }[];
                    icarQuarterCharacteristics?: {
                        /**
                         * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                         */
                        characteristic: string;
                        /**
                         * the value of the characteristic measured
                         */
                        value: string;
                        /**
                         * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                         */
                        unit?: string;
                        /**
                         * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                         */
                        measuringDevice?: string;
                    }[];
                }[];
                /**
                 * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
                 */
                animalMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                /**
                 * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
                 */
                milkCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
                milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
            }[];
        }
        /**
         * Event for recording milking visit
         */
        export interface IcarMilkingVisitEventResource {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingStartingDateTime: string; // date-time
            /**
             * The length in time of the milking
             */
            milkingDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * The length in time of the milking
             */
            milkingVisitDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * This code allows organisations to distinguish between manual and automated milking.
             */
            milkingType?: "Manual" | "Automated";
            /**
             * A certified milking weight that complies with the ICAR guidelines.
             */
            milkingMilkWeight: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * indication whether this milking was completed normally.
             */
            milkingComplete?: boolean;
            /**
             * The milking parlour unit where the milking took place.
             */
            milkingParlourUnit?: string;
            /**
             * The milking box number where the milking took place.
             */
            milkingBoxNumber?: string;
            /**
             * The ID of the device where the milking took place.
             */
            milkingDeviceId?: string;
            /**
             * The ID of the device where the measurement of the milking took place
             */
            measureDeviceId?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingShiftLocalStartDate?: string; // date-time
            /**
             * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
             */
            milkingShiftNumber?: number;
            /**
             * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
             */
            quarterMilkings?: {
                /**
                 * the unique id of the quarter milking
                 */
                icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                /**
                 * Optional milking robot X position. Vendors may choose not to provide this.
                 */
                xposition?: number | null;
                /**
                 * Optional milking robot Y position. Vendors may choose not to provide this.
                 */
                yposition?: number | null;
                /**
                 * Optional milking robot Z position. Vendors may choose not to provide this.
                 */
                zposition?: number | null;
                /**
                 * The length in time of the milking
                 */
                quarterMilkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                quarterMilkingWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                icarQuarterMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                icarQuarterCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
            }[];
            /**
             * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
             */
            animalMilkingSample?: {
                /**
                 * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                 */
                bottleIdentifierType?: "BRC" | "RFD";
                /**
                 * Number of the sample rack
                 */
                rackNumber?: string;
                /**
                 * Position of the bottle in the sample rack
                 */
                bottlePosition?: string;
                /**
                 * Bottle identifier read from barcode or RFID
                 */
                bottleIdentifier?: string;
                /**
                 * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                 */
                validSampleFillingIndicator?: "0" | "1" | "2";
                /**
                 * The operator that took the sample
                 */
                operator?: string;
            }[];
            /**
             * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
             */
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
        }
        export type IcarTestDayArray = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier for this test day.
             */
            id: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            beginDate: string; // date-time
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            endDate: string; // date-time
        }[];
        /**
         * Represents a collection of test days. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarTestDayCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test days.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier for this test day.
                 */
                id: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                beginDate: string; // date-time
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                endDate: string; // date-time
            }[];
        }
        /**
         * Information about test day for milk sampling.
         */
        export interface IcarTestDayResource {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier for this test day.
             */
            id: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            beginDate: string; // date-time
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            endDate: string; // date-time
        }
        export type IcarTestDayResultEventArray = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The amount of milk milked
             */
            milkWeight24Hours?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * The test day code, indicating a status of the cow on the test day.
             */
            testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            /**
             * The amount of milk, fat and protein milked in a defined period of time
             */
            predictedProductionOnTestDay?: {
                /**
                 * The amount of milk milked
                 */
                milkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                fatWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                proteinWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                 */
                hours?: number;
            };
        }[];
        /**
         * Represents a collection of test day result events. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarTestDayResultEventCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test day result events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The amount of milk milked
                 */
                milkWeight24Hours?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The test day code, indicating a status of the cow on the test day.
                 */
                testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
                milkCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
                /**
                 * The amount of milk, fat and protein milked in a defined period of time
                 */
                predictedProductionOnTestDay?: {
                    /**
                     * The amount of milk milked
                     */
                    milkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    fatWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    proteinWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                     */
                    hours?: number;
                };
            }[];
        }
        /**
         * Event for representing test day result
         */
        export interface IcarTestDayResultEventResource {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The amount of milk milked
             */
            milkWeight24Hours?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * The test day code, indicating a status of the cow on the test day.
             */
            testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            /**
             * The amount of milk, fat and protein milked in a defined period of time
             */
            predictedProductionOnTestDay?: {
                /**
                 * The amount of milk milked
                 */
                milkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                fatWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                proteinWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                 */
                hours?: number;
            };
        }
        /**
         * Represents a collection of withdrawals. Based on icarResourceCollection to provide paging etc.
         */
        export interface IcarWithdrawalEventCollection {
            /**
             * Information about the current view or page of the collection
             */
            view?: {
                /**
                 * Provides the number of items in the collection, if known.
                 */
                totalItems?: number;
                /**
                 * Provides the number of pages in the collection, if known.
                 */
                totalPages?: number;
                /**
                 * If non-zero, specifies the default number of items returned per page.
                 */
                pageSize?: number;
                /**
                 * Optionally identifies the current page for display purposes, if returned.
                 */
                currentPage?: number;
                /**
                 * Link to the first page of the collection. Link relation: first.
                 */
                first?: string; // uri
                /**
                 * Link to the next page of the collection, if any. Link relation: next.
                 */
                next?: string; // uri
                /**
                 * Link to the previous page of the collection, if any. Link relation: prev.
                 */
                prev?: string; // uri
                /**
                 * Link to the last page of the collection, if any. Link relation: last.
                 */
                last?: string; // uri
            };
            /**
             * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactation status events.
             */
            member?: {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                endDateTime?: string; // date-time
                /**
                 * Product or food item affected by this withdrawal.
                 */
                productType: "Meat" | "Milk" | "Eggs" | "Honey" | "Velvet" | "Fibre" | "Other";
            }[];
        }
    }
}
declare namespace Paths {
    namespace GetDailyMilkingAverages {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of daily milking averages per animal. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test day result events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * The date on which the average has been calculated.
                     */
                    averageDate: string; // date
                    /**
                     * The average-amount of milk produced within 24h.
                     */
                    milkYieldAvg24h?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                    /**
                     * The average-amount of milk produced within 7 days.
                     */
                    milkYieldAvg7days?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetExistingMilkingWithdrawals {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of withdrawals. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactation status events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    eventDateTime: string; // date-time
                    /**
                     * If the event represents a formal trait, identifies the recording system and trait.
                     */
                    traitLabel?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                     */
                    responsible?: string;
                    /**
                     * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                     */
                    contemporaryGroup?: string;
                    /**
                     * A comment or remark field for additional user-specified information about the event.
                     */
                    remark?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    endDateTime?: string; // date-time
                    /**
                     * Product or food item affected by this withdrawal.
                     */
                    productType: "Meat" | "Milk" | "Eggs" | "Honey" | "Velvet" | "Fibre" | "Other";
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetLactationStatusObservations {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of animal lactation status observation events. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactation status events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    eventDateTime?: string; // date-time
                    /**
                     * If the event represents a formal trait, identifies the recording system and trait.
                     */
                    traitLabel?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                     */
                    responsible?: string;
                    /**
                     * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                     */
                    contemporaryGroup?: string;
                    /**
                     * A comment or remark field for additional user-specified information about the event.
                     */
                    remark?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * The lactation status at the time of observation.
                     */
                    observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetLactations {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        namespace Responses {
            /**
             * Represents a collection of lactations. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case lactations.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    beginDate?: string; // date-time
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    endDate?: string; // date-time
                    /**
                     * The parity of the animal during this lactation.
                     */
                    parity?: number;
                    /**
                     * The length of the lactation until this moment.
                     */
                    lactationLength?: number;
                    /**
                     * The amount of milk produced in this lactation.
                     */
                    milkAmount?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                    /**
                     * The amount of fat produced in this lactation.
                     */
                    fatAmount?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                    /**
                     * The amount of protein produced in this lactation.
                     */
                    proteinAmount?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                    /**
                     * The amount of lactosis produced in this lactation.
                     */
                    lactosisAmount?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM" | "LBR";
                        value: number; // double
                    };
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    lastTestDay?: string; // date-time
                    /**
                     * This type of lactation based on lactation length that is delivered.
                     */
                    lactationType?: "Normal" | "100Days" | "200Days" | "305Days" | "365Days";
                    /**
                     * milk recording method information.
                     */
                    milkRecordingMethod?: {
                        /**
                         * Protocol A: Official MRO representative, Protocol B: Herd owner or its nominee, Protocol C: Official MRO representative or herd owner or its nominee.
                         */
                        milkRecordingProtocol?: "A-OfficialMRORepresentative" | "B-HerdOwnerOrNominee" | "C-Both";
                        /**
                         * all milkings at testday, all milkings in period, one milking at testday.
                         */
                        milkRecordingScheme?: "AllMilkingsAtTestday" | "AllMilkingsInPeriod" | "OneMilkingAtTestday";
                        /**
                         * 1 per day, 2, 3, 4, Continuous Milkings (e.g. robotic milking).
                         */
                        milkingsPerDay?: "1" | "2" | "3" | "4" | "Robot";
                        /**
                         * proportional size sampling of all milkings, constant size sampling of all milkings, sampling of one milking at alternating moments (Alternative Sampling), sampling of one milking at the same moments (Corrected Sampling), sampling of one milking at changing moments (AMS), sampling of multiple milkings at changing moments (AMS).
                         */
                        milkSamplingScheme?: "ProportionalSizeSamplingOfAllMilkings" | "ConstantSizeSamplingOfAllMilkings" | "AlternateSampling" | "CorrectedSampling" | "OneMilkingSampleInAMS" | "MulitpleMilkingSampleInAMS";
                        /**
                         * A number in days of the interval between milk recordings. In case of e.g.4 weeks, use 30.
                         */
                        recordingInterval?: number;
                        /**
                         * Composite = composite sample from morning and evening, Morning, Evening.
                         */
                        milkSamplingMoment?: "Composite" | "Morning" | "Evening";
                        /**
                         * indicates whether this information is certified by ICAR
                         */
                        icarCertified?: boolean;
                        /**
                         * Official milk result supplied by milk recording organisation, Measure by ICAR approved equipment, Measure by not approved equipment
                         */
                        milkingType?: "OfficialMilkResultSuppliedByMRO" | "MeasureByICARApprovedEquipment" | "MeasureByNotApprovedEquipment";
                    };
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetMilkPredictions {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of milk predictions per animal. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case milk prediction events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    eventDateTime?: string; // date-time
                    /**
                     * If the event represents a formal trait, identifies the recording system and trait.
                     */
                    traitLabel?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                     */
                    responsible?: string;
                    /**
                     * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                     */
                    contemporaryGroup?: string;
                    /**
                     * A comment or remark field for additional user-specified information about the event.
                     */
                    remark?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * The amount of milk, fat and protein milked in a defined period of time
                     */
                    averagePredictedProduction?: {
                        /**
                         * The amount of milk milked
                         */
                        milkWeight: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        fatWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        proteinWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                         */
                        hours?: number;
                    };
                    /**
                     * The days in milk in a lactation when the peak production is expected to occur.
                     */
                    daysInMilkAtLactationPeak?: number;
                    /**
                     * The amount of milk, fat and protein milked in a defined period of time
                     */
                    lactationPeakProduction?: {
                        /**
                         * The amount of milk milked
                         */
                        milkWeight: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        fatWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        proteinWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                         */
                        hours?: number;
                    };
                    /**
                     * The amount of milk, fat and protein milked in a defined period of time
                     */
                    predictedProductionNextMR?: {
                        /**
                         * The amount of milk milked
                         */
                        milkWeight: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        fatWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        proteinWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                         */
                        hours?: number;
                    };
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetMilkingVisits {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of animal milking visit events. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case milking visit events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    eventDateTime?: string; // date-time
                    /**
                     * If the event represents a formal trait, identifies the recording system and trait.
                     */
                    traitLabel?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                     */
                    responsible?: string;
                    /**
                     * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                     */
                    contemporaryGroup?: string;
                    /**
                     * A comment or remark field for additional user-specified information about the event.
                     */
                    remark?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    milkingStartingDateTime: string; // date-time
                    /**
                     * The length in time of the milking
                     */
                    milkingDuration?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode?: "SEC" | "MIN";
                        value?: number; // double
                    };
                    /**
                     * The length in time of the milking
                     */
                    milkingVisitDuration?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode?: "SEC" | "MIN";
                        value?: number; // double
                    };
                    /**
                     * This code allows organisations to distinguish between manual and automated milking.
                     */
                    milkingType?: "Manual" | "Automated";
                    /**
                     * A certified milking weight that complies with the ICAR guidelines.
                     */
                    milkingMilkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * indication whether this milking was completed normally.
                     */
                    milkingComplete?: boolean;
                    /**
                     * The milking parlour unit where the milking took place.
                     */
                    milkingParlourUnit?: string;
                    /**
                     * The milking box number where the milking took place.
                     */
                    milkingBoxNumber?: string;
                    /**
                     * The ID of the device where the milking took place.
                     */
                    milkingDeviceId?: string;
                    /**
                     * The ID of the device where the measurement of the milking took place
                     */
                    measureDeviceId?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    milkingShiftLocalStartDate?: string; // date-time
                    /**
                     * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
                     */
                    milkingShiftNumber?: number;
                    /**
                     * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
                     */
                    quarterMilkings?: {
                        /**
                         * the unique id of the quarter milking
                         */
                        icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                        /**
                         * Optional milking robot X position. Vendors may choose not to provide this.
                         */
                        xposition?: number | null;
                        /**
                         * Optional milking robot Y position. Vendors may choose not to provide this.
                         */
                        yposition?: number | null;
                        /**
                         * Optional milking robot Z position. Vendors may choose not to provide this.
                         */
                        zposition?: number | null;
                        /**
                         * The length in time of the milking
                         */
                        quarterMilkingDuration?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode?: "SEC" | "MIN";
                            value?: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        quarterMilkingWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        icarQuarterMilkingSample?: {
                            /**
                             * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                             */
                            bottleIdentifierType?: "BRC" | "RFD";
                            /**
                             * Number of the sample rack
                             */
                            rackNumber?: string;
                            /**
                             * Position of the bottle in the sample rack
                             */
                            bottlePosition?: string;
                            /**
                             * Bottle identifier read from barcode or RFID
                             */
                            bottleIdentifier?: string;
                            /**
                             * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                             */
                            validSampleFillingIndicator?: "0" | "1" | "2";
                            /**
                             * The operator that took the sample
                             */
                            operator?: string;
                        }[];
                        icarQuarterCharacteristics?: {
                            /**
                             * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                             */
                            characteristic: string;
                            /**
                             * the value of the characteristic measured
                             */
                            value: string;
                            /**
                             * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                             */
                            unit?: string;
                            /**
                             * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                             */
                            measuringDevice?: string;
                        }[];
                    }[];
                    /**
                     * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
                     */
                    animalMilkingSample?: {
                        /**
                         * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                         */
                        bottleIdentifierType?: "BRC" | "RFD";
                        /**
                         * Number of the sample rack
                         */
                        rackNumber?: string;
                        /**
                         * Position of the bottle in the sample rack
                         */
                        bottlePosition?: string;
                        /**
                         * Bottle identifier read from barcode or RFID
                         */
                        bottleIdentifier?: string;
                        /**
                         * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                         */
                        validSampleFillingIndicator?: "0" | "1" | "2";
                        /**
                         * The operator that took the sample
                         */
                        operator?: string;
                    }[];
                    /**
                     * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
                     */
                    milkCharacteristics?: {
                        /**
                         * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                         */
                        characteristic: string;
                        /**
                         * the value of the characteristic measured
                         */
                        value: string;
                        /**
                         * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                         */
                        unit?: string;
                        /**
                         * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                         */
                        measuringDevice?: string;
                    }[];
                    milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetTestDay {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of test days. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test days.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier for this test day.
                     */
                    id: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    beginDate: string; // date-time
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    endDate: string; // date-time
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace GetTestDayResult {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
            export type MetaModifiedFrom = string; // date-time
            export type MetaModifiedTo = string; // date-time
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export interface QueryParameters {
            "meta-modified-from"?: Parameters.MetaModifiedFrom /* date-time */;
            "meta-modified-to"?: Parameters.MetaModifiedTo /* date-time */;
        }
        namespace Responses {
            /**
             * Represents a collection of test day result events. Based on icarResourceCollection to provide paging etc.
             */
            export interface $200 {
                /**
                 * Information about the current view or page of the collection
                 */
                view?: {
                    /**
                     * Provides the number of items in the collection, if known.
                     */
                    totalItems?: number;
                    /**
                     * Provides the number of pages in the collection, if known.
                     */
                    totalPages?: number;
                    /**
                     * If non-zero, specifies the default number of items returned per page.
                     */
                    pageSize?: number;
                    /**
                     * Optionally identifies the current page for display purposes, if returned.
                     */
                    currentPage?: number;
                    /**
                     * Link to the first page of the collection. Link relation: first.
                     */
                    first?: string; // uri
                    /**
                     * Link to the next page of the collection, if any. Link relation: next.
                     */
                    next?: string; // uri
                    /**
                     * Link to the previous page of the collection, if any. Link relation: prev.
                     */
                    prev?: string; // uri
                    /**
                     * Link to the last page of the collection, if any. Link relation: last.
                     */
                    last?: string; // uri
                };
                /**
                 * As per JSON-LD Hydra syntax, member provides the array of objects, in this case test day result events.
                 */
                member?: {
                    /**
                     * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                     */
                    resourceType: string;
                    /**
                     * Uniform resource identifier (URI) of the resource (rel=self).
                     */
                    "@self"?: string;
                    /**
                     * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                     *  Systems should maintain and provide meta data if at all possible.
                     * ICAR ADE working group intend meta to be required in the next major release of ADE.
                     */
                    meta?: {
                        /**
                         * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                         */
                        source: string;
                        /**
                         * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                         *  Systems should generate (if needed), store, and return sourceId if at all possible.
                         * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                         */
                        sourceId?: string;
                        /**
                         * Boolean value indicating if this resource has been deleted in the source system.
                         */
                        isDeleted?: boolean;
                        /**
                         * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        modified: string; // date-time
                        /**
                         * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        created?: string | null; // date-time
                        /**
                         * Person or organisation who created the object
                         */
                        creator?: string;
                        /**
                         * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validFrom?: string | null; // date-time
                        /**
                         * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                         */
                        validTo?: string | null; // date-time
                    };
                    /**
                     * Unique location scheme and identifier combination.
                     */
                    location?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Unique identifier in the source system for this event.
                     */
                    id?: string;
                    /**
                     * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    eventDateTime?: string; // date-time
                    /**
                     * If the event represents a formal trait, identifies the recording system and trait.
                     */
                    traitLabel?: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                     */
                    responsible?: string;
                    /**
                     * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                     */
                    contemporaryGroup?: string;
                    /**
                     * A comment or remark field for additional user-specified information about the event.
                     */
                    remark?: string;
                    /**
                     * Unique animal scheme and identifier combination.
                     */
                    animal: {
                        /**
                         * A unique identification for the resource issued under the auspices of the scheme.
                         */
                        id: string;
                        /**
                         * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                         */
                        scheme: string;
                    };
                    /**
                     * The amount of milk milked
                     */
                    milkWeight24Hours?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The test day code, indicating a status of the cow on the test day.
                     */
                    testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
                    milkCharacteristics?: {
                        /**
                         * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                         */
                        characteristic: string;
                        /**
                         * the value of the characteristic measured
                         */
                        value: string;
                        /**
                         * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                         */
                        unit?: string;
                        /**
                         * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                         */
                        measuringDevice?: string;
                    }[];
                    /**
                     * The amount of milk, fat and protein milked in a defined period of time
                     */
                    predictedProductionOnTestDay?: {
                        /**
                         * The amount of milk milked
                         */
                        milkWeight: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        fatWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The amount of milk milked
                         */
                        proteinWeight?: {
                            /**
                             * UN/CEFACT Common Code for Units of Measurement.
                             */
                            unitCode: "KGM";
                            value: number; // double
                        };
                        /**
                         * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                         */
                        hours?: number;
                    };
                }[];
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace PostBatchLactationStatusObservations {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export type RequestBody = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The lactation status at the time of observation.
             */
            observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
        }[];
        namespace Responses {
            export type $200 = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
            export interface $201 {
            }
            export interface $202 {
            }
            export type Default = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
        }
    }
    namespace PostBatchMilkingVisits {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export type RequestBody = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingStartingDateTime: string; // date-time
            /**
             * The length in time of the milking
             */
            milkingDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * The length in time of the milking
             */
            milkingVisitDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * This code allows organisations to distinguish between manual and automated milking.
             */
            milkingType?: "Manual" | "Automated";
            /**
             * A certified milking weight that complies with the ICAR guidelines.
             */
            milkingMilkWeight: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * indication whether this milking was completed normally.
             */
            milkingComplete?: boolean;
            /**
             * The milking parlour unit where the milking took place.
             */
            milkingParlourUnit?: string;
            /**
             * The milking box number where the milking took place.
             */
            milkingBoxNumber?: string;
            /**
             * The ID of the device where the milking took place.
             */
            milkingDeviceId?: string;
            /**
             * The ID of the device where the measurement of the milking took place
             */
            measureDeviceId?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingShiftLocalStartDate?: string; // date-time
            /**
             * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
             */
            milkingShiftNumber?: number;
            /**
             * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
             */
            quarterMilkings?: {
                /**
                 * the unique id of the quarter milking
                 */
                icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                /**
                 * Optional milking robot X position. Vendors may choose not to provide this.
                 */
                xposition?: number | null;
                /**
                 * Optional milking robot Y position. Vendors may choose not to provide this.
                 */
                yposition?: number | null;
                /**
                 * Optional milking robot Z position. Vendors may choose not to provide this.
                 */
                zposition?: number | null;
                /**
                 * The length in time of the milking
                 */
                quarterMilkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                quarterMilkingWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                icarQuarterMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                icarQuarterCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
            }[];
            /**
             * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
             */
            animalMilkingSample?: {
                /**
                 * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                 */
                bottleIdentifierType?: "BRC" | "RFD";
                /**
                 * Number of the sample rack
                 */
                rackNumber?: string;
                /**
                 * Position of the bottle in the sample rack
                 */
                bottlePosition?: string;
                /**
                 * Bottle identifier read from barcode or RFID
                 */
                bottleIdentifier?: string;
                /**
                 * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                 */
                validSampleFillingIndicator?: "0" | "1" | "2";
                /**
                 * The operator that took the sample
                 */
                operator?: string;
            }[];
            /**
             * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
             */
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
        }[];
        namespace Responses {
            export type $200 = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
            export interface $201 {
            }
            export interface $202 {
            }
            export type Default = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
        }
    }
    namespace PostBatchTestDayResults {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export type RequestBody = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The amount of milk milked
             */
            milkWeight24Hours?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * The test day code, indicating a status of the cow on the test day.
             */
            testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            /**
             * The amount of milk, fat and protein milked in a defined period of time
             */
            predictedProductionOnTestDay?: {
                /**
                 * The amount of milk milked
                 */
                milkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                fatWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                proteinWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                 */
                hours?: number;
            };
        }[];
        namespace Responses {
            export type $200 = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
            export interface $201 {
            }
            export interface $202 {
            }
            export type Default = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
        }
    }
    namespace PostBatchTestDays {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        export type RequestBody = {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier for this test day.
             */
            id: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            beginDate: string; // date-time
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            endDate: string; // date-time
        }[];
        namespace Responses {
            export type $200 = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
            export interface $201 {
            }
            export interface $202 {
            }
            export type Default = {
                /**
                 * Unique identifier created in the system for this event. SHOULD be a UUID.
                 */
                id?: string;
                /**
                 * Metadata for the posted resource. Allows specification of the source, source Id to synchronise data.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * An array of errors for this resource. The messages array may be unspecified OR null.
                 */
                messages?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[] | null;
            }[];
        }
    }
    namespace PostSingleLactationStatusObservation {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        /**
         * This event records an observed lactation status without necessarily a parturition, drying off, or other event.
         */
        export interface RequestBody {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The lactation status at the time of observation.
             */
            observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
        }
        namespace Responses {
            /**
             * This event records an observed lactation status without necessarily a parturition, drying off, or other event.
             */
            export interface $200 {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The lactation status at the time of observation.
                 */
                observedStatus?: "Dry" | "Lead" | "Fresh" | "Early" | "Lactating";
            }
            export interface $201 {
            }
            export interface $202 {
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace PostSingleMilkingVisits {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        /**
         * Event for recording milking visit
         */
        export interface RequestBody {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingStartingDateTime: string; // date-time
            /**
             * The length in time of the milking
             */
            milkingDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * The length in time of the milking
             */
            milkingVisitDuration?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode?: "SEC" | "MIN";
                value?: number; // double
            };
            /**
             * This code allows organisations to distinguish between manual and automated milking.
             */
            milkingType?: "Manual" | "Automated";
            /**
             * A certified milking weight that complies with the ICAR guidelines.
             */
            milkingMilkWeight: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * indication whether this milking was completed normally.
             */
            milkingComplete?: boolean;
            /**
             * The milking parlour unit where the milking took place.
             */
            milkingParlourUnit?: string;
            /**
             * The milking box number where the milking took place.
             */
            milkingBoxNumber?: string;
            /**
             * The ID of the device where the milking took place.
             */
            milkingDeviceId?: string;
            /**
             * The ID of the device where the measurement of the milking took place
             */
            measureDeviceId?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            milkingShiftLocalStartDate?: string; // date-time
            /**
             * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
             */
            milkingShiftNumber?: number;
            /**
             * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
             */
            quarterMilkings?: {
                /**
                 * the unique id of the quarter milking
                 */
                icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                /**
                 * Optional milking robot X position. Vendors may choose not to provide this.
                 */
                xposition?: number | null;
                /**
                 * Optional milking robot Y position. Vendors may choose not to provide this.
                 */
                yposition?: number | null;
                /**
                 * Optional milking robot Z position. Vendors may choose not to provide this.
                 */
                zposition?: number | null;
                /**
                 * The length in time of the milking
                 */
                quarterMilkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                quarterMilkingWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                icarQuarterMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                icarQuarterCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
            }[];
            /**
             * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
             */
            animalMilkingSample?: {
                /**
                 * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                 */
                bottleIdentifierType?: "BRC" | "RFD";
                /**
                 * Number of the sample rack
                 */
                rackNumber?: string;
                /**
                 * Position of the bottle in the sample rack
                 */
                bottlePosition?: string;
                /**
                 * Bottle identifier read from barcode or RFID
                 */
                bottleIdentifier?: string;
                /**
                 * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                 */
                validSampleFillingIndicator?: "0" | "1" | "2";
                /**
                 * The operator that took the sample
                 */
                operator?: string;
            }[];
            /**
             * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
             */
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
        }
        namespace Responses {
            /**
             * Event for recording milking visit
             */
            export interface $200 {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                milkingStartingDateTime: string; // date-time
                /**
                 * The length in time of the milking
                 */
                milkingDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * The length in time of the milking
                 */
                milkingVisitDuration?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode?: "SEC" | "MIN";
                    value?: number; // double
                };
                /**
                 * This code allows organisations to distinguish between manual and automated milking.
                 */
                milkingType?: "Manual" | "Automated";
                /**
                 * A certified milking weight that complies with the ICAR guidelines.
                 */
                milkingMilkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * indication whether this milking was completed normally.
                 */
                milkingComplete?: boolean;
                /**
                 * The milking parlour unit where the milking took place.
                 */
                milkingParlourUnit?: string;
                /**
                 * The milking box number where the milking took place.
                 */
                milkingBoxNumber?: string;
                /**
                 * The ID of the device where the milking took place.
                 */
                milkingDeviceId?: string;
                /**
                 * The ID of the device where the measurement of the milking took place
                 */
                measureDeviceId?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                milkingShiftLocalStartDate?: string; // date-time
                /**
                 * For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
                 */
                milkingShiftNumber?: number;
                /**
                 * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
                 */
                quarterMilkings?: {
                    /**
                     * the unique id of the quarter milking
                     */
                    icarQuarterId?: "LF" | "RF" | "LR" | "RR";
                    /**
                     * Optional milking robot X position. Vendors may choose not to provide this.
                     */
                    xposition?: number | null;
                    /**
                     * Optional milking robot Y position. Vendors may choose not to provide this.
                     */
                    yposition?: number | null;
                    /**
                     * Optional milking robot Z position. Vendors may choose not to provide this.
                     */
                    zposition?: number | null;
                    /**
                     * The length in time of the milking
                     */
                    quarterMilkingDuration?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode?: "SEC" | "MIN";
                        value?: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    quarterMilkingWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    icarQuarterMilkingSample?: {
                        /**
                         * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                         */
                        bottleIdentifierType?: "BRC" | "RFD";
                        /**
                         * Number of the sample rack
                         */
                        rackNumber?: string;
                        /**
                         * Position of the bottle in the sample rack
                         */
                        bottlePosition?: string;
                        /**
                         * Bottle identifier read from barcode or RFID
                         */
                        bottleIdentifier?: string;
                        /**
                         * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                         */
                        validSampleFillingIndicator?: "0" | "1" | "2";
                        /**
                         * The operator that took the sample
                         */
                        operator?: string;
                    }[];
                    icarQuarterCharacteristics?: {
                        /**
                         * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                         */
                        characteristic: string;
                        /**
                         * the value of the characteristic measured
                         */
                        value: string;
                        /**
                         * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                         */
                        unit?: string;
                        /**
                         * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                         */
                        measuringDevice?: string;
                    }[];
                }[];
                /**
                 * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
                 */
                animalMilkingSample?: {
                    /**
                     * The type of bottle identifiertype according to ICAR_BottleIdentifierCode
                     */
                    bottleIdentifierType?: "BRC" | "RFD";
                    /**
                     * Number of the sample rack
                     */
                    rackNumber?: string;
                    /**
                     * Position of the bottle in the sample rack
                     */
                    bottlePosition?: string;
                    /**
                     * Bottle identifier read from barcode or RFID
                     */
                    bottleIdentifier?: string;
                    /**
                     * Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
                     */
                    validSampleFillingIndicator?: "0" | "1" | "2";
                    /**
                     * The operator that took the sample
                     */
                    operator?: string;
                }[];
                /**
                 * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
                 */
                milkCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
                milkingRemarks?: ("AnimalSick" | "MilkingIncomplete" | "TeatSeparated" | "MilkedSeparately" | "SamplingFailed")[];
            }
            export interface $201 {
            }
            export interface $202 {
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace PostSingleTestDay {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        /**
         * Information about test day for milk sampling.
         */
        export interface RequestBody {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier for this test day.
             */
            id: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            beginDate: string; // date-time
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            endDate: string; // date-time
        }
        namespace Responses {
            /**
             * Information about test day for milk sampling.
             */
            export interface $200 {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier for this test day.
                 */
                id: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                beginDate: string; // date-time
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                endDate: string; // date-time
            }
            export interface $201 {
            }
            export interface $202 {
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
    namespace PostSingleTestDayResult {
        namespace Parameters {
            export type LocationId = string;
            export type LocationScheme = string;
        }
        export interface PathParameters {
            "location-scheme": Parameters.LocationScheme;
            "location-id": Parameters.LocationId;
        }
        /**
         * Event for representing test day result
         */
        export interface RequestBody {
            /**
             * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
             */
            resourceType: string;
            /**
             * Uniform resource identifier (URI) of the resource (rel=self).
             */
            "@self"?: string;
            /**
             * Meta-data for the resource. Mandatory if you wish to support synchronisation.
             *  Systems should maintain and provide meta data if at all possible.
             * ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            meta?: {
                /**
                 * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                 */
                source: string;
                /**
                 * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                 *  Systems should generate (if needed), store, and return sourceId if at all possible.
                 * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                 */
                sourceId?: string;
                /**
                 * Boolean value indicating if this resource has been deleted in the source system.
                 */
                isDeleted?: boolean;
                /**
                 * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                modified: string; // date-time
                /**
                 * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                created?: string | null; // date-time
                /**
                 * Person or organisation who created the object
                 */
                creator?: string;
                /**
                 * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validFrom?: string | null; // date-time
                /**
                 * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                validTo?: string | null; // date-time
            };
            /**
             * Unique location scheme and identifier combination.
             */
            location?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Unique identifier in the source system for this event.
             */
            id?: string;
            /**
             * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
             */
            eventDateTime?: string; // date-time
            /**
             * If the event represents a formal trait, identifies the recording system and trait.
             */
            traitLabel?: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
             */
            responsible?: string;
            /**
             * For manually recorded events, record any contemporary group code that would affect statistical analysis.
             */
            contemporaryGroup?: string;
            /**
             * A comment or remark field for additional user-specified information about the event.
             */
            remark?: string;
            /**
             * Unique animal scheme and identifier combination.
             */
            animal: {
                /**
                 * A unique identification for the resource issued under the auspices of the scheme.
                 */
                id: string;
                /**
                 * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                 */
                scheme: string;
            };
            /**
             * The amount of milk milked
             */
            milkWeight24Hours?: {
                /**
                 * UN/CEFACT Common Code for Units of Measurement.
                 */
                unitCode: "KGM";
                value: number; // double
            };
            /**
             * The test day code, indicating a status of the cow on the test day.
             */
            testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
            milkCharacteristics?: {
                /**
                 * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                 */
                characteristic: string;
                /**
                 * the value of the characteristic measured
                 */
                value: string;
                /**
                 * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                 */
                unit?: string;
                /**
                 * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                 */
                measuringDevice?: string;
            }[];
            /**
             * The amount of milk, fat and protein milked in a defined period of time
             */
            predictedProductionOnTestDay?: {
                /**
                 * The amount of milk milked
                 */
                milkWeight: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                fatWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The amount of milk milked
                 */
                proteinWeight?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                 */
                hours?: number;
            };
        }
        namespace Responses {
            /**
             * Event for representing test day result
             */
            export interface $200 {
                /**
                 * Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
                 */
                resourceType: string;
                /**
                 * Uniform resource identifier (URI) of the resource (rel=self).
                 */
                "@self"?: string;
                /**
                 * Meta-data for the resource. Mandatory if you wish to support synchronisation.
                 *  Systems should maintain and provide meta data if at all possible.
                 * ICAR ADE working group intend meta to be required in the next major release of ADE.
                 */
                meta?: {
                    /**
                     * Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
                     */
                    source: string;
                    /**
                     * Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
                     *  Systems should generate (if needed), store, and return sourceId if at all possible.
                     * ICAR ADE working group intend to make use of metadata, source and sourceId mandatory in the next major release (2.0).
                     */
                    sourceId?: string;
                    /**
                     * Boolean value indicating if this resource has been deleted in the source system.
                     */
                    isDeleted?: boolean;
                    /**
                     * RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    modified: string; // date-time
                    /**
                     * RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    created?: string | null; // date-time
                    /**
                     * Person or organisation who created the object
                     */
                    creator?: string;
                    /**
                     * RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validFrom?: string | null; // date-time
                    /**
                     * RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                     */
                    validTo?: string | null; // date-time
                };
                /**
                 * Unique location scheme and identifier combination.
                 */
                location?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Unique identifier in the source system for this event.
                 */
                id?: string;
                /**
                 * A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
                 */
                eventDateTime?: string; // date-time
                /**
                 * If the event represents a formal trait, identifies the recording system and trait.
                 */
                traitLabel?: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
                 */
                responsible?: string;
                /**
                 * For manually recorded events, record any contemporary group code that would affect statistical analysis.
                 */
                contemporaryGroup?: string;
                /**
                 * A comment or remark field for additional user-specified information about the event.
                 */
                remark?: string;
                /**
                 * Unique animal scheme and identifier combination.
                 */
                animal: {
                    /**
                     * A unique identification for the resource issued under the auspices of the scheme.
                     */
                    id: string;
                    /**
                     * The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
                     */
                    scheme: string;
                };
                /**
                 * The amount of milk milked
                 */
                milkWeight24Hours?: {
                    /**
                     * UN/CEFACT Common Code for Units of Measurement.
                     */
                    unitCode: "KGM";
                    value: number; // double
                };
                /**
                 * The test day code, indicating a status of the cow on the test day.
                 */
                testDayCode?: "Dry" | "SamplingImpossible" | "Sick";
                milkCharacteristics?: {
                    /**
                     * Treat this field as an enum, with the list and units in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json.
                     */
                    characteristic: string;
                    /**
                     * the value of the characteristic measured
                     */
                    value: string;
                    /**
                     * Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
                     */
                    unit?: string;
                    /**
                     * a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
                     */
                    measuringDevice?: string;
                }[];
                /**
                 * The amount of milk, fat and protein milked in a defined period of time
                 */
                predictedProductionOnTestDay?: {
                    /**
                     * The amount of milk milked
                     */
                    milkWeight: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    fatWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The amount of milk milked
                     */
                    proteinWeight?: {
                        /**
                         * UN/CEFACT Common Code for Units of Measurement.
                         */
                        unitCode: "KGM";
                        value: number; // double
                    };
                    /**
                     * The number of hours in which the mentioned milk, fat and protein were produced. Most commonly used is a 24 hours production.
                     */
                    hours?: number;
                };
            }
            export interface $201 {
            }
            export interface $202 {
            }
            /**
             * A collection of RFC7807 compliant problem responses for JSON APIs.
             */
            export interface Default {
                errors?: {
                    /**
                     * Machine readable URI or code that defines the type of error or warning.
                     */
                    type?: string;
                    /**
                     * Distinguish errors, warnings, and informational messages.
                     */
                    severity?: "Information" | "Warning" | "Error";
                    /**
                     * The HTTP status code applicable to this problem.
                     */
                    status?: number | null; // int32
                    /**
                     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
                     */
                    title?: string;
                    /**
                     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
                     */
                    detail?: string;
                    /**
                     * A URI reference or internal JSON document reference to the specific data item that caused the problem.
                     */
                    instance?: string | null;
                }[];
            }
        }
    }
}

export interface Operations {
  /**
   * GET /locations/{location-scheme}/{location-id}/milking-visits
   */
  ['get_milking_visits']: {
    requestBody: any;
    params: Paths.GetMilkingVisits.PathParameters;
    query: Paths.GetMilkingVisits.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetMilkingVisits.PathParameters, Paths.GetMilkingVisits.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetMilkingVisits.Responses.$200 | Paths.GetMilkingVisits.Responses.Default;
  }
  /**
   * POST /locations/{location-scheme}/{location-id}/milking-visits
   */
  ['post_single_milking_visits']: {
    requestBody: Paths.PostSingleMilkingVisits.RequestBody;
    params: Paths.PostSingleMilkingVisits.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostSingleMilkingVisits.RequestBody, Paths.PostSingleMilkingVisits.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostSingleMilkingVisits.Responses.$200 | Paths.PostSingleMilkingVisits.Responses.$201 | Paths.PostSingleMilkingVisits.Responses.$202 | Paths.PostSingleMilkingVisits.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/test-days
   */
  ['get_test_day']: {
    requestBody: any;
    params: Paths.GetTestDay.PathParameters;
    query: Paths.GetTestDay.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetTestDay.PathParameters, Paths.GetTestDay.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetTestDay.Responses.$200 | Paths.GetTestDay.Responses.Default;
  }
  /**
   * POST /locations/{location-scheme}/{location-id}/test-days
   */
  ['post_single_test_day']: {
    requestBody: Paths.PostSingleTestDay.RequestBody;
    params: Paths.PostSingleTestDay.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostSingleTestDay.RequestBody, Paths.PostSingleTestDay.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostSingleTestDay.Responses.$200 | Paths.PostSingleTestDay.Responses.$201 | Paths.PostSingleTestDay.Responses.$202 | Paths.PostSingleTestDay.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/test-day-results
   */
  ['get_test_day_result']: {
    requestBody: any;
    params: Paths.GetTestDayResult.PathParameters;
    query: Paths.GetTestDayResult.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetTestDayResult.PathParameters, Paths.GetTestDayResult.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetTestDayResult.Responses.$200 | Paths.GetTestDayResult.Responses.Default;
  }
  /**
   * POST /locations/{location-scheme}/{location-id}/test-day-results
   */
  ['post_single_test_day_result']: {
    requestBody: Paths.PostSingleTestDayResult.RequestBody;
    params: Paths.PostSingleTestDayResult.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostSingleTestDayResult.RequestBody, Paths.PostSingleTestDayResult.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostSingleTestDayResult.Responses.$200 | Paths.PostSingleTestDayResult.Responses.$201 | Paths.PostSingleTestDayResult.Responses.$202 | Paths.PostSingleTestDayResult.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/daily-milking-averages
   */
  ['get_daily_milking_averages']: {
    requestBody: any;
    params: Paths.GetDailyMilkingAverages.PathParameters;
    query: Paths.GetDailyMilkingAverages.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetDailyMilkingAverages.PathParameters, Paths.GetDailyMilkingAverages.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetDailyMilkingAverages.Responses.$200 | Paths.GetDailyMilkingAverages.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/milk-predictions
   */
  ['get_milk_predictions']: {
    requestBody: any;
    params: Paths.GetMilkPredictions.PathParameters;
    query: Paths.GetMilkPredictions.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetMilkPredictions.PathParameters, Paths.GetMilkPredictions.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetMilkPredictions.Responses.$200 | Paths.GetMilkPredictions.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/lactations
   */
  ['get_lactations']: {
    requestBody: any;
    params: Paths.GetLactations.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetLactations.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.GetLactations.Responses.$200 | Paths.GetLactations.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/lactation-status-observations
   */
  ['get_lactation_status_observations']: {
    requestBody: any;
    params: Paths.GetLactationStatusObservations.PathParameters;
    query: Paths.GetLactationStatusObservations.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetLactationStatusObservations.PathParameters, Paths.GetLactationStatusObservations.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetLactationStatusObservations.Responses.$200 | Paths.GetLactationStatusObservations.Responses.Default;
  }
  /**
   * POST /locations/{location-scheme}/{location-id}/lactation-status-observations
   */
  ['post_single_lactation_status_observation']: {
    requestBody: Paths.PostSingleLactationStatusObservation.RequestBody;
    params: Paths.PostSingleLactationStatusObservation.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostSingleLactationStatusObservation.RequestBody, Paths.PostSingleLactationStatusObservation.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostSingleLactationStatusObservation.Responses.$200 | Paths.PostSingleLactationStatusObservation.Responses.$201 | Paths.PostSingleLactationStatusObservation.Responses.$202 | Paths.PostSingleLactationStatusObservation.Responses.Default;
  }
  /**
   * GET /locations/{location-scheme}/{location-id}/milking-withdrawals
   */
  ['get_existing_milking_withdrawals']: {
    requestBody: any;
    params: Paths.GetExistingMilkingWithdrawals.PathParameters;
    query: Paths.GetExistingMilkingWithdrawals.QueryParameters;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<any, Paths.GetExistingMilkingWithdrawals.PathParameters, Paths.GetExistingMilkingWithdrawals.QueryParameters, UnknownParams, UnknownParams>;
    response: Paths.GetExistingMilkingWithdrawals.Responses.$200 | Paths.GetExistingMilkingWithdrawals.Responses.Default;
  }
  /**
   * POST /batches/locations/{location-scheme}/{location-id}/milking-visits
   */
  ['post_batch_milking_visits']: {
    requestBody: Paths.PostBatchMilkingVisits.RequestBody;
    params: Paths.PostBatchMilkingVisits.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostBatchMilkingVisits.RequestBody, Paths.PostBatchMilkingVisits.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostBatchMilkingVisits.Responses.$200 | Paths.PostBatchMilkingVisits.Responses.$201 | Paths.PostBatchMilkingVisits.Responses.$202 | Paths.PostBatchMilkingVisits.Responses.Default;
  }
  /**
   * POST /batches/locations/{location-scheme}/{location-id}/test-days
   */
  ['post_batch_test_days']: {
    requestBody: Paths.PostBatchTestDays.RequestBody;
    params: Paths.PostBatchTestDays.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostBatchTestDays.RequestBody, Paths.PostBatchTestDays.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostBatchTestDays.Responses.$200 | Paths.PostBatchTestDays.Responses.$201 | Paths.PostBatchTestDays.Responses.$202 | Paths.PostBatchTestDays.Responses.Default;
  }
  /**
   * POST /batches/locations/{location-scheme}/{location-id}/test-day-results
   */
  ['post_batch_test_day_results']: {
    requestBody: Paths.PostBatchTestDayResults.RequestBody;
    params: Paths.PostBatchTestDayResults.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostBatchTestDayResults.RequestBody, Paths.PostBatchTestDayResults.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostBatchTestDayResults.Responses.$200 | Paths.PostBatchTestDayResults.Responses.$201 | Paths.PostBatchTestDayResults.Responses.$202 | Paths.PostBatchTestDayResults.Responses.Default;
  }
  /**
   * POST /batches/locations/{location-scheme}/{location-id}/lactation-status-observations
   */
  ['post_batch_lactation_status_observations']: {
    requestBody: Paths.PostBatchLactationStatusObservations.RequestBody;
    params: Paths.PostBatchLactationStatusObservations.PathParameters;
    query: UnknownParams;
    headers: UnknownParams;
    cookies: UnknownParams;
    context: Context<Paths.PostBatchLactationStatusObservations.RequestBody, Paths.PostBatchLactationStatusObservations.PathParameters, UnknownParams, UnknownParams, UnknownParams>;
    response: Paths.PostBatchLactationStatusObservations.Responses.$200 | Paths.PostBatchLactationStatusObservations.Responses.$201 | Paths.PostBatchLactationStatusObservations.Responses.$202 | Paths.PostBatchLactationStatusObservations.Responses.Default;
  }
}

export type OperationContext<operationId extends keyof Operations> = Operations[operationId]["context"];
export type OperationResponse<operationId extends keyof Operations> = Operations[operationId]["response"];
export type HandlerResponse<ResponseBody, ResponseModel = Record<string, any>> = ResponseModel & { _t?: ResponseBody };
export type OperationHandlerResponse<operationId extends keyof Operations> = HandlerResponse<OperationResponse<operationId>>;
export type OperationHandler<operationId extends keyof Operations, HandlerArgs extends unknown[] = unknown[]> = (...params: [OperationContext<operationId>, ...HandlerArgs]) => Promise<OperationHandlerResponse<operationId>>;

export type batchResults = Components.Schemas.BatchResults;
export type icarDailyMilkingAveragesCollection = Components.Schemas.IcarDailyMilkingAveragesCollection;
export type icarLactationCollection = Components.Schemas.IcarLactationCollection;
export type icarLactationStatusObservedEventArray = Components.Schemas.IcarLactationStatusObservedEventArray;
export type icarLactationStatusObservedEventCollection = Components.Schemas.IcarLactationStatusObservedEventCollection;
export type icarLactationStatusObservedEventResource = Components.Schemas.IcarLactationStatusObservedEventResource;
export type icarMilkPredictionsCollection = Components.Schemas.IcarMilkPredictionsCollection;
export type icarMilkingVisitEventArray = Components.Schemas.IcarMilkingVisitEventArray;
export type icarMilkingVisitEventCollection = Components.Schemas.IcarMilkingVisitEventCollection;
export type icarMilkingVisitEventResource = Components.Schemas.IcarMilkingVisitEventResource;
export type icarTestDayArray = Components.Schemas.IcarTestDayArray;
export type icarTestDayCollection = Components.Schemas.IcarTestDayCollection;
export type icarTestDayResource = Components.Schemas.IcarTestDayResource;
export type icarTestDayResultEventArray = Components.Schemas.IcarTestDayResultEventArray;
export type icarTestDayResultEventCollection = Components.Schemas.IcarTestDayResultEventCollection;
export type icarTestDayResultEventResource = Components.Schemas.IcarTestDayResultEventResource;
export type icarWithdrawalEventCollection = Components.Schemas.IcarWithdrawalEventCollection;
