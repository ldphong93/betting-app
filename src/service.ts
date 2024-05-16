import {
	BetRequest,
	FinalizeMatchRequest,
	MatchCreationRequest,
	MatchCreationResponse,
} from 'common/DataType';
const getAllMatchesURL = 'http://localhost:8080/match';
const betURL = 'http://localhost:8080/match/bet';
const finalizeMatchURL = 'http://localhost:8080/match/finalize';
const createMatchURL = 'http://localhost:8080/match/add';

type ResponseJson = {
	successful: boolean;
	message: string;
	balance: number;
};

export const fetchData = async (url: string) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const message = 'A error has occured';
			throw new Error(message);
		}

		const resultJson = await response.json();
		return resultJson;
	} catch (error) {
		console.log('There was an error: ', error);
		return [];
	}
};

export const fetchMatchesFromServer = (setAllMatches) => {
	return async () => {
		const matches = await fetchData(getAllMatchesURL);
		setAllMatches(matches);
	};
};

export const betToServer = async (request: BetRequest) => {
	try {
		const response = await fetch(betURL, {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const message = 'A error has occured';
			throw new Error(message);
		}

		const responseJson: ResponseJson = await response.json();
		console.log(responseJson.message);
		return responseJson;
	} catch (error) {
		console.error(error);
	}
};

export const finalizeMatchToServer = async (request: FinalizeMatchRequest) => {
	try {
		const response = await fetch(finalizeMatchURL, {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const message = 'A error has occured';
			throw new Error(message);
		}

		const message = await response.text();
		return message;
	} catch (error) {
		console.error(error);
	}
};

export const createMatchToServer = async (request: MatchCreationRequest) => {
	try {
		const response = await fetch(createMatchURL, {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const message = 'A error has occured';
			throw new Error(message);
		}

		const responseJson: MatchCreationResponse = await response.json();
		console.log(responseJson.message);
		return responseJson;
	} catch (error) {
		console.error(error);
	}
};
