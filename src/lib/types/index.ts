export interface Room {
    id: number;
    name: string;
    tenant: User | null;
    owner: User | null;
    tenancy_end_date: Date;
}

export interface Location {
    id: number;
    name: string;
    address: string;
    rooms: Room[] | null;
    admins: string[];
    fetched: boolean;
}

export interface User {
    email: string;
    first_name: string;
    last_name: string;
    admin_locations: Location[];
}
