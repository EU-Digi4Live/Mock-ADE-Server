export enum Quarter {
    "LF" = "LF",
    "RF" = "RF",
    "LR" = "LR",
    "RR" = "RR"
};

export enum MilkingRemark {
    "animalsick" = "AnimalSick",
    "milkingincomplete" = "MilkingIncomplete",
    "teatseparated" = "TeatSeparated",
    "milkedseparately" = "MilkedSeparately",
    "samplingfailed" = "SamplingFailed"
};

export enum MilkCharacteristic {
    "SCC" = "SCC",
    "FAT" = "FAT",
    "PROTEIN" = "PROTEIN",
    "LAC" = "LAC",
    "UREA" = "UREA",
    "BLOOD" = "BLOOD",
    "ACETONE" = "ACETONE",
    "BHB" = "BHB",
    "LDH" = "LDH",
    "PRO" = "PRO",
    "AVGCOND" = "AVGCOND",
    "MAXCOND" = "MAXCOND",
    "AVGFLWR" = "AVGFLWR",
    "MAXFLWR" = "MAXFLWR",
    "WEIGHT" = "WEIGHT",
    "PAG" = "PAG"
}

export const MilkCharacteristicUnit: Record<keyof typeof MilkCharacteristic, string> = {
    SCC: "x1000 cells/ml",
    FAT: "%",
    PROTEIN: "%",
    LAC: "%",
    UREA: "mg/l",
    BLOOD: "",
    ACETONE: "mmol/l",
    BHB: "mmol/l",
    LDH: "IU/l",
    PRO: "mmol/l",
    AVGCOND: "mS/cm",
    MAXCOND: "mS/cm",
    AVGFLWR: "Kg/min",
    MAXFLWR: "Kg/min",
    WEIGHT: "Kg",
    PAG: "mmol/l"     
}

export enum Species {
    "Buffalo" = "Buffalo",
    "Cattle" = "Cattle",
    "Deer" = "Deer",
    "Elk" = "Elk",
    "Goat" = "Goat",
    "Horse" = "Horse",
    "Pig" = "Pig",
    "Sheep" = "Sheep"
}

export enum Gender {
    "Female" = "Female",
    "FemaleNeuter" = "FemaleNeuter",
    "Freemartin" = "Freemartin",
    "Male" = "Male",
    "MaleCryptorchid" = "MaleCryptorchid",
    "MaleNeuter" = "MaleNeuter",
    "Unknown" = "Unknown"
}