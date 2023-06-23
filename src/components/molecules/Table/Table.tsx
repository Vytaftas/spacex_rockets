import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { StyledHeadingWrapper, StyledTableHeadingsWrapper, StyledTableRow, StyledTableWrapper } from './styles';
import Message from '../../atoms/Message';
import { FilterBy, filterRows } from '../../../shared/helpers/filterRows';

interface ITableProps {
    filterData: [object[], Dispatch<SetStateAction<object[]>>];
    tableID: string;
    showIdColumn?: boolean;
    activeFilter: string;
}

const Table = ({ filterData, tableID, showIdColumn, activeFilter }: ITableProps) => {
    const [headings, setHeadings] = useState<string[]>([]);

    const [filteredData, setFilteredData] = filterData;

    const handleFilterClick = (e: React.MouseEvent<HTMLElement> | undefined) => {
        const currentHeading = e
            ? ((e?.target as HTMLElement).closest('.table-heading') as HTMLDivElement)
            : (document.querySelector(`#${tableID} .table-heading.active`) as HTMLDivElement);

        console.log(currentHeading);
        if (!currentHeading) return;

        const targetColumn = currentHeading.getAttribute('data-target') as keyof object;
        const order = currentHeading.getAttribute('data-order');

        const currentIcon = currentHeading.querySelector('i') as HTMLElement;

        if (order === FilterBy.ascending) {
            currentIcon.classList.add('fa-caret-up');
            currentIcon.classList.remove('fa-caret-down');
        } else {
            currentIcon.classList.remove('fa-caret-up');
            currentIcon.classList.add('fa-caret-down');
        }

        const headings = document.querySelectorAll(`#${tableID} .table-heading`);

        headings.forEach((heading) => heading.classList.remove('active'));

        currentHeading.classList.add('active');

        if (targetColumn !== null) {
            const filtered = filterRows(filteredData, targetColumn, order as FilterBy);

            if (filtered) setFilteredData([...(filtered as object[])]);
        }

        order === 'ASC' ? currentHeading.setAttribute('data-order', 'DESC') : currentHeading.setAttribute('data-order', 'ASC');
    };

    useEffect(() => {
        if (filteredData && filteredData.length) {
            const headingsKeys = Array.from(Object.keys(filteredData[0]));

            const arrayContainsIdIndex = headingsKeys.findIndex((item) => item.indexOf('id') !== -1);

            if (arrayContainsIdIndex !== -1 && !showIdColumn) {
                headingsKeys.splice(arrayContainsIdIndex, 1);
                setHeadings(() => headingsKeys);
            } else {
                setHeadings(() => headingsKeys);
            }
        }
    }, [filteredData, showIdColumn]);

    useEffect(() => {
        if (filteredData && filteredData.length) handleFilterClick(undefined);
    }, []);

    return (
        <StyledTableWrapper>
            <StyledTableHeadingsWrapper className='table-heading-wrapper'>
                {headings?.map((heading, index) => {
                    const fixedHeading = heading.charAt(0).toUpperCase() + heading.split('_').join(' ').slice(1);
                    const filterActive = activeFilter === heading ? 'active' : '';
                    const textAlign = index === 0 ? 'align-left' : 'align-right';

                    return (
                        <StyledHeadingWrapper
                            key={index}
                            className={`table-heading ${filterActive} ${textAlign}`}
                            data-target={heading}
                            data-order={`ASC`}
                            onClick={(e) => handleFilterClick(e)}
                        >
                            <p>
                                {fixedHeading}
                                <i className={`fa-solid fa-caret-down`}></i>
                            </p>
                        </StyledHeadingWrapper>
                    );
                })}
            </StyledTableHeadingsWrapper>

            {!filteredData.length ? (
                <Message message='No matches found!' fontSize='14px' />
            ) : (
                filteredData?.map((item) => {
                    const mappedItemValues = headings.map((element, index) => {
                        const fixedHeading = element.charAt(0).toUpperCase() + element.split('_').join(' ').slice(1);

                        const weightVariables = ['weight', 'kg', 'mass'];
                        const heightVariables = ['height', 'meter'];
                        const priceVariables = ['price', 'cost'];

                        const isWeight = weightVariables.some((variable) => element.includes(variable) && item[element as keyof object]);
                        const isHeight = heightVariables.some((variable) => element.includes(variable) && item[element as keyof object]);
                        const isPrice = priceVariables.some((variable) => element.includes(variable) && item[element as keyof object]);

                        const formattedNumber =
                            isPrice &&
                            new Intl.NumberFormat('en', { notation: 'standard' })
                                .format(item[element as keyof object])
                                .split(',')
                                .join(' ');

                        return (
                            <li key={index} className={`${index === 0 ? 'align-left' : 'align-right'}`}>
                                <div className='mobile-heading'>{fixedHeading}:</div>

                                <div>
                                    {isPrice && '$'}
                                    {formattedNumber ? formattedNumber : item[element as keyof object] ? item[element as keyof object] : '-'}
                                    {isWeight && 'kg'}
                                    {isHeight && 'm'}
                                </div>
                            </li>
                        );
                    });

                    return <StyledTableRow key={item.id}>{mappedItemValues}</StyledTableRow>;
                })
            )}
        </StyledTableWrapper>
    );
};

export default Table;
