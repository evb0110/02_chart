import React from 'react';

export default function Chart({
  serie,
  serieIndex,
  compareNumbers,
  labels,
  colors,
  max,
  classType,
  sum,
  right,
  height,
  horizontal,
  series,
}) {
  const sortedSerie = serie.slice(0);
  sortedSerie.sort(compareNumbers);

  const labelSource = horizontal ? series : labels;
  const rightSize = item => (right ? right(item, sortedSerie) : null);
  const width = size => (horizontal ? size + '%' : null);
  const heightSize = size => (horizontal ? undefined : size + '%');
  const sizeFunc = item => (item / (sum ? sum : max)) * 100;

  return (
    <div
      className={`Charts--serie ${classType}`}
      key={serieIndex}
      style={{ height: height ? height : 250 }}
    >
      <label>{labelSource[serieIndex]}</label>
      {serie.map((item, itemIndex) => {
        const color = colors[itemIndex];
        const size = sizeFunc(item);
        const style = {
          backgroundColor: color,
          opacity: item / max + 0.05,
          zIndex: item,
          height: heightSize(size),
          right: rightSize,
          width: width(size),
        };

        return (
          <div
            className={`Charts--item ${classType}`}
            style={style}
            key={itemIndex}
          >
            <b style={{ color: color }}>{item}</b>
          </div>
        );
      })}
    </div>
  );
}
