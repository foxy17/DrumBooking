export abstract class DatabaseAdapter {
  abstract connect(): Promise<void>;

  abstract disconnect(): Promise<void>;
  abstract getHistoryForUser(userId: string): Promise<any[]>;
  abstract searchUsers(query: string): Promise<any[]>;
  abstract getUser(userId: string): Promise<any>;
  abstract createUser(user: any): Promise<any>;
  abstract removeUser(user: any): Promise<any>;

  abstract query<T>(query: string): Promise<T>; // Note: Generic endpoint ideally should not be used
}
