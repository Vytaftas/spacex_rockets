import { useRef, useState, useEffect } from 'react';
import { IRocket } from '../../organisms/RocketsSearchFilter/types';
import { StyledHeadingWrapper, StyledTableHeadingsWrapper, StyledTableRow, StyledTableWrapper } from './styles';

interface IRocketData {
    data: IRocket[];
}

const Table = ({ data, headingSortAction }: IRocketData) => {
    const [activeHeading, setActiveHeading] = useState(null);

    const handleClick = (e) => {
        const currentHeading = e.target.closest('.table-heading');
        const currentIcon = currentHeading.querySelector('i');

        const headings = document.querySelectorAll('.table-heading');
        headings.forEach((heading) => {
            const icon = heading?.querySelector('i');

            icon.classList.remove('fa-caret-up');
            icon.classList.add('fa-caret-down');
        });
        // const targetColumn = currentHeading.getAttribute('data-target');
        const order = currentHeading.getAttribute('data-order');
        order === 'ASC' ? currentHeading.setAttribute('data-order', 'DESC') : currentHeading.setAttribute('data-order', 'ASC');

        if (order === 'ASC') {
            currentIcon.classList.add('fa-caret-up');
            currentIcon.classList.remove('fa-caret-down');
        } else {
            currentIcon.classList.remove('fa-caret-up');
            currentIcon.classList.add('fa-caret-down');
        }
        // order === 'ASC' ? currentIcon.classList.add('data-order', 'DESC') : currentHeading.setAttribute('data-order', 'ASC');
        // console.log(currentHeading);

        // const icon = currentHeading?.querySelector('i');
        // console.log(icon);

        // icon?.classList.remove('fa-caret-down');
        // icon?.classList.add('fa-caret-up');

        // setActiveHeading(currentHeading);

        // headingSortAction(activeHeading);
        // setActiveHeading(e.target.closest('.table-heading'));
    };

    // useEffect(() => {
    //     console.log(activeHeading);
    // }, [activeHeading]);

    // console.log(activeHeading);
    return (
        <StyledTableWrapper>
            <StyledTableHeadingsWrapper className='table-heading-wrapper'>
                <StyledHeadingWrapper className='table-heading' data-target={'rocket_name'} data-order={'ASC'} onClick={(e) => handleClick(e)}>
                    <i className='fa-solid fa-caret-up'></i>
                    <p>Rocket name</p>
                </StyledHeadingWrapper>
                <StyledHeadingWrapper className='table-heading' data-target={'diameter'} data-order={'ASC'} onClick={(e) => handleClick(e)}>
                    <i className='fa-solid fa-caret-down'></i>
                    <p>Diameter</p>
                </StyledHeadingWrapper>

                <StyledHeadingWrapper className='table-heading' data-target={'height'} data-order={'ASC'} onClick={(e) => handleClick(e)}>
                    <i className='fa-solid fa-caret-down'></i>
                    <p>Height</p>
                </StyledHeadingWrapper>

                <StyledHeadingWrapper className='table-heading' data-target={'mass'} data-order={'ASC'} onClick={(e) => handleClick(e)}>
                    <i className='fa-solid fa-caret-down'></i>
                    <p>Mass</p>
                </StyledHeadingWrapper>

                <StyledHeadingWrapper className='table-heading' data-target={'cost_per_launch'} data-order={'ASC'} onClick={(e) => handleClick(e)}>
                    <i className='fa-solid fa-caret-down'></i>
                    <p>Cost per launch</p>
                </StyledHeadingWrapper>
            </StyledTableHeadingsWrapper>

            {data?.map((rocket) => {
                return (
                    <StyledTableRow key={rocket.id}>
                        <li>{rocket.rocket_name}</li>
                        <li>{rocket.diameter}m</li>
                        <li>{rocket.height}m</li>
                        <li>{rocket.mass}kg</li>
                        <li>${rocket.cost_per_launch}</li>
                    </StyledTableRow>
                );
            })}
        </StyledTableWrapper>
    );
};

export default Table;
