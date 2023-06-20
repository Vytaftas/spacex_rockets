import { ReactNode } from 'react';

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

export interface IRocketMapped {
    id: string;
    cost_per_launch: number;
    rocket_name: string;
    height?: ReactNode;
    diameter?: ReactNode;
    mass?: ReactNode;
}
