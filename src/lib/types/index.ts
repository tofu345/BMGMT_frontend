export interface Room {
    id: number;
    name: string;
    user: User | null;
    owner: User | null;
    tenancy_end_date: Date;
    options_visible: boolean;
}

export interface Location {
    id: number;
    name: string;
    address: string;
    rooms: Room[];
    admins: string[];
    fetched: boolean;
    issues: Issues[];
}

export interface User {
    email: string;
    first_name: string;
    last_name: string;
    admin_locations: Location[];
}

enum IssueType {
    Electrical = "electrical",
    Plumbing = "plumbing",
}

export interface Issues {
    issue_type: IssueType;
    info: string;
    room: Room;
    resolved: boolean;
}
