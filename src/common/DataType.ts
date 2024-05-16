export interface AppContextType {
	username: string;
	setUsername: (value: string) => void;
	role: UserRole;
	token: string;
	setToken: (value: string) => void;
}

export enum UserRole {
	ADMIN = 'ADMIN',
	BETTOR = 'BETTOR',
}

export interface UserDetail {
	id: string;
	username: string;
	role: string;
	token: string;
	balance;
}

export const EmptyUser = {
	username: '',
	role: null,
	token: null,
	balance: null,
};

export type MatchType = {
	id: number;
	title: string;
	matchDate: string;
	creationDate: string;
	description: string;
	betRatio: string;
	createdBy: string;
};

export type BetRequest = {
	matchId: string;
	userId: string;
	result: string;
	amount: number;
};

export type FinalizeMatchRequest = {
	matchId: string;
	result: string;
};

export type MatchCreationRequest = {
	title: string;
	description: string;
	matchDate: string;
	createdBy: string;
};

export type MatchCreationResponse = {
	successful: boolean;
	message: string;
	match: MatchType;
};
