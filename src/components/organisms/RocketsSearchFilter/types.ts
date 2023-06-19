export interface IRocket {
    id: string;
    cost_per_launch: number;
    rocket_name: string;
    height?: {
        meters?: number;
    };
    diameter?: {
        meters?: number;
    };
    mass?: {
        kg?: number;
    };
}
