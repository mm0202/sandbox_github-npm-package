import * as firebase from "@firebase/testing";
export declare class FirestoreEmulatorProvider {
    private projectId;
    private readonly rules;
    constructor(projectId: string, rulesFilePath?: string);
    protected getProjectID(): string;
    loadRules(): Promise<void>;
    getFirestore(): firebase.firestore.Firestore;
    getFirestoreWithAuth(uid?: string, email?: string): firebase.firestore.Firestore;
    getAdminFirestore(): firebase.firestore.Firestore;
    cleanup(): Promise<any[]>;
}
