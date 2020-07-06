export class AddSection {
    sec: SectionData;
    visasec: Visasec;
}

export class SectionData {
    id = 0;
    name: string;
    description: string;
    isform: number;
    isactive: boolean;
    issubsection: number;
    subsectionparentidf: number;
}

export class Visasec {
    visatypesectionmapid: number;
    productidf: number;
    isform: number;
    sequence: number;
}
