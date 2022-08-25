declare interface CustomGameEventDeclarations {
    c2s_test_event: {};

    OnGachaEnter: { itemTypes: Array<number>, itemNames: Array<string>, itemTexts: Array<string> };
    OnGachaExit: {};

    OnClickGachaItem: { itemType: number, itemName: string };
}