type FilterRowsType = (data: object[], columnName: string, filterBy: FilterBy | string) => object[];

export enum FilterBy {
    ascending = 'ASC',
    descending = 'DESC',
}

export const filterRows: FilterRowsType = (data, columnName, filterBy?) => {
    const isStringArray = data?.every((item) => typeof item[columnName as keyof object] === 'string');

    switch (true) {
        case isStringArray: {
            const filtered = data?.sort((a, b) => {
                return filterBy === FilterBy.ascending
                    ? b[columnName as keyof object].localeCompare(a[columnName as keyof object])
                    : a[columnName as keyof object].localeCompare(b[columnName as keyof object]);
            });
            return filtered;
        }
        default: {
            const filtered = data?.sort((a, b) => {
                return filterBy === FilterBy.ascending
                    ? Number(b[columnName as keyof object]) - Number(a[columnName as keyof object])
                    : Number(a[columnName as keyof object]) - Number(b[columnName as keyof object]);
            });

            return filtered;
        }
    }
};
