export interface Device {
	_id: string;
	name: string;
	type: string;
	host: string;
	status: string;
	disc_time: number;
	editing?: boolean;
}

export interface User {
	id: string;
	username: string;
}
