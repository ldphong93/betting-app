export enum UserRole {
	ADMIN = 'ADMIN',
	BETTOR = 'BETTOR',
}

export interface UserDetail {
	username: string;
	role: string;
	token: string;
}

export interface AppContextType {
	username: string;
	setUsername: (value: string) => void;
	role: UserRole;
	token: string;
	setToken: (value: string) => void;
}
