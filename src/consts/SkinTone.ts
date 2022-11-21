interface ISkinToneMapping {
    [skinTone: string]: string;
}

export enum SkinTone {
    NONE = "NONE",
    DARK = "DARK",
    MEDIUM_DARK = "MEDIUM_DARK",
    MEDIUM = "MEDIUM",
    MEDIUM_LIGHT = "MEDIUM_LIGHT",
    LIGHT = "LIGHT",
}

export const SkinToneMapping: ISkinToneMapping = {
    [SkinTone.NONE]: "",
    [SkinTone.DARK]: "&#127999;",
    [SkinTone.MEDIUM_DARK]: "&#127998;",
    [SkinTone.MEDIUM]: "&#127997;",
    [SkinTone.MEDIUM_LIGHT]: "&#127996;",
    [SkinTone.LIGHT]: "&#127995;",
};
