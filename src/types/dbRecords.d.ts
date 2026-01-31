import { Quarter, MilkCharacteristic, MilkingRemark } from "../enums/enums.ts";

const quarter: Quarter;

export interface DBRecords {
    /*_
        * JSON object type that must be returned by sql query 'get-animals' defined in config/sqlQueries.yaml.
    */
    ['get-animals']: {
        queryResult: {
            "totalitems": number;
            /**
             * Meta-data for the resource. ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            "meta.source"?: string;     // Source where data is retrieved from. URI or reverse DNS that identifies the source system.
            "meta.sourceid"?: string;  // Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
            "meta.isdeleted"?: boolean;    // Boolean value indicating if this resource has been deleted in the source system.
            "meta.modified": string; // date-time  // RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.created"?: string | null; // date-time   // RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.creator"?: string;   // Person or organisation who created the object
            "meta.validfrom"?: string | null; // date-time // RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.validto"?: string | null; // date-time   // RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            id?: string;    // Unique identifier in the source system for this event.
            "animal.identifier.id": string;    // A unique identification for the animal issued under the auspices of the scheme.
            "animal.identifier.scheme": string;    // The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
            "animal.specie": string;   // The species of the animal.
            "animal.gender": string;  // The gender of the animal.
            "animal.name"?: string;    // The name of the animal.
            "animal.breed.id"?: string;   // The breed of the animal, see Well-known Breed Identifier Schemes https://github.com/adewg/ICAR/blob/dda5aaba6925d49a9783b18e58c421785bc45c61/well-known/icarBreedIdentifierType.md
            "animal.breed.scheme"?: string;   // The scheme of the breed identifier.
            "animal.birthdate"?: string | null; // date-time   // RFC3339 UTC date/time of birth of the animal (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "animal.exitdate"?: string | null; // date-time   // RFC3339 UTC date/time of exit of the animal from the herd (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "location.id"?: string;
            "location.scheme"?: string;
        }
    },
    /*_
        * JSON object type that must be returned by sql query 'get-milking-visits' defined in config/sqlQueries.yaml.
    */
    ['get-milking-visits']: {
        queryResult: {
            "totalitems": number;
            /**
             * Meta-data for the resource. ICAR ADE working group intend meta to be required in the next major release of ADE.
             */
            "meta.source"?: string;     // Source where data is retrieved from. URI  or reverse DNS that identifies the source system.
            "meta.sourceid"?: string;  // Unique Id within Source (e.g. UUID, IRI, URI, or composite ID if needed) for the resource in the original source system.
            "meta.isdeleted"?: boolean;    // Boolean value indicating if this resource has been deleted in the source system.
            "meta.modified": string; // date-time  // RFC3339 UTC date/time of last modification (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.created"?: string | null; // date-time   // RFC3339 UTC date/time of creation (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.creator"?: string;   // Person or organisation who created the object
            "meta.validfrom"?: string | null; // date-time // RFC3339 UTC start of period when the resource is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "meta.validto"?: string | null; // date-time   // RFC3339 UTC end of the period when the resoure is valid (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            id?: string;    // Unique identifier in the source system for this event.
            eventdatetime?: string; // date-time    // A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "traitlabel.id"?: string;   // If the event represents a formal trait, A unique identification for the resource issued under the auspices of the scheme.
            "traitlabel.scheme"?: string;   // If the event represents a formal trait, The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
            responsible?: string;   // Use if an observation is manually recorded, or an event is carried out or authorised by a person. SHOULD be a person object.
            contemporarygroup?: string; // For manually recorded events, record any contemporary group code that would affect statistical analysis.
            remark?: string;    // A comment or remark field for additional user-specified information about the event.
            "animal.id": string;    // A unique identification for the resource issued under the auspices of the scheme.
            "animal.scheme": string;    // The identifier (in reverse domain format) of an official scheme that manages unique identifiers.
            milkingstartingdatetime: string; // date-time   // A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            "milkingduration.unitcode"?: "SEC" | "MIN"; // UN/CEFACT Common Code for Units of Measurement.
            "milkingduration.value"?: number; // double // The length in time of the milking
            "milkingvisitduration.unitcode"?: "SEC" | "MIN";    // UN/CEFACT Common Code for Units of Measurement.
            "milkingvisitduration.value"?: number; // double    // The length in time of the milking
            milkingtype?: "Manual" | "Automated";   // This code allows organisations to distinguish between manual and automated milking.
            "milkingmilkweight.unitcode": "KGM";    // UN/CEFACT Common Code for Units of Measurement.
            "milkingmilkweight.value": number; // double    // A certified milking weight that complies with the ICAR guidelines.
            milkingcomplete?: "true" | "false";   // indication whether this milking was completed normally.
            milkingparlourunit?: string;    // The milking parlour unit where the milking took place.
            milkingboxnumber?: string;  // The milking box number where the milking took place.
            milkingdeviceid?: string;   // The ID of the device where the milking took place.
            measuredeviceid?: string;   // The ID of the device where the measurement of the milking took place
            milkingshiftlocalstartdate?: string; // date-time   // A particular point in the progression of time. Shall be UTC format with Z, specified in RFC3339 (see https://ijmacd.github.io/rfc3339-iso8601/ for format guidance).
            milkingshiftnumber?: number;    // For milkings supervised by humans, this number represents the shift within a local date in which this milking visit occurred.
            /**
             * An array of zero or more sample/bottle details if the animal is milk tested at this milking.
             */
            "animalmilkingsample.bottleidentifiertype"?: "BRC" | "RFD"; // The type of bottle identifiertype according to ICAR_BottleIdentifierCode
            "animalmilkingsample.racknumber"?: string;  // Number of the sample rack
            "animalmilkingsample.bottleposition"?: string;  // Position of the bottle in the sample rack
            "animalmilkingsample.bottleidentifier"?: string;  // Bottle identifier read from barcode or RFID
            "animalmilkingsample.validsamplefillingindicator"?: "0" | "1" | "2";    // Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
            "animalmilkingsample.operator"?: string;  // The operator that took the sample
            /**
             * An array of milk characteristics other than certified milk weight. See icarMilkCharacteristicsType for documentation.
             */
            }&{ [k in `milkcharacteristics.characteristic.${MilkCharacteristic}.value`]?: string;   // the value of the characteristic measured
            }&{ [k in `milkcharacteristics.characteristic.${MilkCharacteristic}.unit`]?: string;    // Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
            }&{ [k in `milkcharacteristics.characteristic.${MilkCharacteristic}.measuringdevice`]?: string; // a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
            }&{ [k in `milkingremarks.${keyof MilkingRemark}`]?: "true" | "false";
            }& QuarterMilkingDB;
    }
}
/**
 * A set of milking results for up to four quarters in dairy cows, or two teats for sheep or goats.
 */
export type QuarterMilkingDB = {
    [k in `quartermilkings.${Quarter}.xposition`]?: number | null;  // Optional milking robot X position. Vendors may choose not to provide this.
    }&{ [k in `quartermilkings.${Quarter}.yposition`]?: number | null;  // Optional milking robot Y position. Vendors may choose not to provide this.
    }&{ [k in `quartermilkings.${Quarter}.zposition`]?: number | null;  // Optional milking robot Z position. Vendors may choose not to provide this.
    }&{ [k in `quartermilkings.${Quarter}.quartermilkingduration.unitcode`]?: "SEC" | "MIN";
    }&{ [k in `quartermilkings.${Quarter}.quartermilkingduration.value`]?: number; // double
    }&{ [k in `quartermilkings.${Quarter}.quartermilkingweight.unitcode`]?: "KGM";
    }&{ [k in `quartermilkings.${Quarter}.quartermilkingweight.value`]?: number; // double
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.bottleidentifiertype`]?: "BRC" | "RFD"; // The type of bottle identifiertype according to ICAR_BottleIdentifierCode
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.racknumber`]?: string;  // Number of the sample rack
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.bottleposition`]?: string;  // Position of the bottle in the sample rack
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.bottleidentifier`]?: string;  // Bottle identifier read from barcode or RFID
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.validsamplefillingindicator`]?: "0" | "1" | "2";    // Indicator of valid sample filling according to ICAR_ValidSampleFillingIndicatorCode list
    }&{ [k in `quartermilkings.${Quarter}.icarquartermilkingsample.operator`]?: string;    // The operator that took the sample
    }&{ [k in `quartermilkings.${Quarter}.icarquartercharacteristics.${MilkCharacteristic}.value`]?: string;    // the value of the characteristic measured
    }&{ [k in `quartermilkings.${Quarter}.icarquartercharacteristics.${MilkCharacteristic}.unit`]?: string; // Use the units for characteristics in https://github.com/adewg/ICAR/blob/ADE-1/enums/icarMilkCharacteristicCodeType.json. Only override when your units for a characteristic are different. Use UN/CEFACT codes.
    }&{ [k in `quartermilkings.${Quarter}.icarquartercharacteristics.${MilkCharacteristic}.measuringdevice`]?: string;  // a more readable device class ID that contains manufacturer, device, hardware and software versions in a way that is similar to the USB specification. This will need more investigation.
}

export type DBQueryResult<operationId extends keyof DBRecords> = DBRecords[operationId]["queryResult"];
export type DBQueryKey = keyof DBRecords;
