import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { StyledHeadingWrapper, StyledTableHeadingsWrapper, StyledTableRow, StyledTableWrapper } from './styles';

interface ITableProps {
    filterData: [any[], Dispatch<SetStateAction<any[]>>];
}

const Table = ({ filterData }: ITableProps) => {
    const [headings, setHeadings] = useState<string[]>([]);

    const [filteredData, setFilteredData] = filterData;

    const handleFilterClick = (e: React.MouseEvent<HTMLElement> | undefined) => {
        const currentHeading = e
            ? ((e?.target as HTMLElement).closest('.table-heading') as HTMLDivElement)
            : (document.querySelector('.table-heading.active') as HTMLDivElement);

        const targetColumn = currentHeading.getAttribute('data-target') as keyof any;
        const order = currentHeading.getAttribute('data-order');

        const currentIcon = currentHeading.querySelector('i') as HTMLElement;

        if (order === 'ASC') {
            currentIcon.classList.add('fa-caret-up');
            currentIcon.classList.remove('fa-caret-down');
        } else {
            currentIcon.classList.remove('fa-caret-up');
            currentIcon.classList.add('fa-caret-down');
        }

        order === 'ASC' ? currentHeading.setAttribute('data-order', 'DESC') : currentHeading.setAttribute('data-order', 'ASC');

        const headings = document.querySelectorAll('.table-heading');

        headings.forEach((heading) => heading.classList.remove('active'));

        currentHeading.classList.add('active');

        if (targetColumn !== null) {
            const isStringArray = filteredData.every((item) => typeof item[targetColumn] === 'string');

            switch (true) {
                case isStringArray: {
                    const filtered = filteredData?.sort((a, b) => {
                        return order === 'DESC' ? b[targetColumn].localeCompare(a[targetColumn]) : a[targetColumn].localeCompare(b[targetColumn]);
                    });

                    setFilteredData([...(filtered as any[])]);
                    break;
                }
                default: {
                    const filtered = filteredData?.sort((a, b) => {
                        return order === 'DESC'
                            ? Number(b[targetColumn]) - Number(a[targetColumn])
                            : Number(a[targetColumn]) - Number(b[targetColumn]);
                    });

                    setFilteredData([...(filtered as any[])]);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        if (filteredData) handleFilterClick(undefined);
    }, []);

    useEffect(() => {
        if (filteredData && filteredData.length) {
            const headingsKeys = Array.from(Object.keys(filteredData[0]));

            const arrayContainsIdIndex = headingsKeys.findIndex((item) => item.indexOf('id') !== -1);

            if (arrayContainsIdIndex !== -1) {
                headingsKeys.splice(arrayContainsIdIndex, 1);
                setHeadings(() => headingsKeys);
            } else {
                setHeadings(() => headingsKeys);
            }
        }
    }, [filteredData]);

    return (
        <StyledTableWrapper>
            <StyledTableHeadingsWrapper className='table-heading-wrapper'>
                {headings?.map((heading, index) => {
                    const fixedHeading = heading.charAt(0).toUpperCase() + heading.split('_').join(' ').slice(1);

                    return (
                        <StyledHeadingWrapper
                            key={index}
                            className={`table-heading ${index === 0 ? 'active' : ''} ${
                                index === 0 ? 'align-left' : index === headings.length - 1 ? 'align-right' : 'align-center'
                            }`}
                            data-target={heading}
                            data-order={`DESC`}
                            onClick={(e) => handleFilterClick(e)}
                        >
                            <p>
                                {fixedHeading}
                                <i className={`fa-solid ${index === 0 ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                            </p>
                        </StyledHeadingWrapper>
                    );
                })}
            </StyledTableHeadingsWrapper>

            {filteredData?.map((item) => {
                const mappedItemValues = headings.map((element, index) => {
                    const fixedHeading = element.charAt(0).toUpperCase() + element.split('_').join(' ').slice(1);
                    const weightVariables = ['weight', 'kg', 'mass'];
                    const heightVariables = ['height', 'meter'];
                    const priceVariables = ['price', 'cost'];

                    const isWeight = weightVariables.some((variable) => element.includes(variable) && item[element]);

                    const isHeight = heightVariables.some((variable) => element.includes(variable) && item[element]);
                    const isPrice = priceVariables.some((variable) => element.includes(variable) && item[element]);

                    const formattedNumber =
                        isPrice && new Intl.NumberFormat('en', { notation: 'standard' }).format(item[element]).split(',').join(' ');

                    return (
                        <li key={index} className={`${index === 0 ? 'align-left' : index === headings.length - 1 ? 'align-right' : 'align-center'}`}>
                            <div className='mobile-heading'>{fixedHeading}:</div>

                            <div>
                                {isPrice && '$'}
                                {formattedNumber ? formattedNumber : item[element as keyof any]}
                                {isWeight && 'kg'}
                                {isHeight && 'm'}
                            </div>
                        </li>
                    );
                });

                return <StyledTableRow key={item.id}>{mappedItemValues}</StyledTableRow>;
            })}
        </StyledTableWrapper>
    );
};

export default Table;
