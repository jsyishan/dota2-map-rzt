export default interface IEvent<TName extends keyof GameEventDeclarations> {
    [x: string]: any;
    onCall(event: GameEventProvidedProperties & GameEventDeclarations[TName]): void
}