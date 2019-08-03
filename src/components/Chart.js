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
  series=[]
}) {
  var sortedSerie = serie.slice(0);

  sortedSerie.sort(compareNumbers);

  return (
    <div
      className={`Charts--serie ${classType}`}
      key={serieIndex}
      style={{ height: height ? height : 250 }}
    >
      <label>{horizontal ? series[serieIndex] : labels[serieIndex]}</label>
      {serie.map((item, itemIndex) => {
        var color = colors[itemIndex],
          style,
          size = (item / (sum ? sum : max)) * 100;

        style = {
          backgroundColor: color,
          opacity: item / max + 0.05,
          zIndex: item,
          height: height ? null : size + '%',
          right: right ? right(item, sortedSerie) : null,
          width: horizontal ? size + '%' : null,
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
