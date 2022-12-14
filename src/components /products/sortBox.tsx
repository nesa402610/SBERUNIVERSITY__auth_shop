import React, {FC} from 'react';

interface SortBoxProps {
  sort: string
  setSort: any
}

const SortBox:FC<SortBoxProps> = ({sort, setSort}) => {
  return (
    <div className={'rounded-lg bg-neutral-800 p-4 flex justify-center text-lg'}>
      <div className={'flex gap-4'}>
            <span className={(sort === 'popular' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
                  data-sort={'popular'}
                  onClick={() => setSort('popular')}>Популярные</span>
        <span className={(sort === 'new' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
              data-sort={'new'}
              onClick={() => setSort('new')}>Новинки</span>
        <span className={(sort === 'lowPrice' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
              data-sort={'lowPrice'}
              onClick={() => setSort('lowPrice')}>Сначала дешевые</span>
        <span className={(sort === 'highPrice' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
              data-sort={'highPrice'}
              onClick={() => setSort('highPrice')}>Сначала дорогие</span>
        <span className={(sort === 'mostRated' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
              data-sort={'mostRated'}
              onClick={() => setSort('mostRated')}>По рейтингу</span>
        <span className={(sort === 'sales' ? 'text-white underline cursor-default' : 'text-neutral-300 cursor-pointer')}
              data-sort={'sales'}
              onClick={() => setSort('sales')}>По скидке</span>
      </div>
    </div>
  );
};

export default SortBox;