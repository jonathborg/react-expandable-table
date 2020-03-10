import React, { useRef, Fragment, useState, useEffect, useMemo } from 'react';
import { DateTime } from 'luxon';
import { Table as sTable, TableRow, TableCell, TableHeader, TableBody, TableHeaderCell } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.scss';

function checkType(value) {
    if (Object.prototype.toString.call(value) === '[object String]') {
        const possibleDate = DateTime.fromJSDate(new Date(value));
        if (possibleDate.isValid) {
            return 'date';
        } else if (!isNaN(value)) {
            return 'number';
        } else {
            return 'string';
        }
    } else if (Object.prototype.toString.call(value) === '[object Number]') {
        return 'number';
    } else {
        return 'other';
    }
}

function createNativeElComponent(tag) {
    return ({ children, ref, ...innerProps }) => React.createElement(tag, innerProps, children);
}

const defaultTheme = {
    TABLE: createNativeElComponent('table'),
    TR: createNativeElComponent('tr'),
    TD: createNativeElComponent('td'),
    TH: createNativeElComponent('th'),
    TBODY: createNativeElComponent('tbody'),
    THEAD: createNativeElComponent('thead'),
};

const semanticUITheme = {
    TABLE: sTable,
    TR: TableRow,
    TD: TableCell,
    TH: TableHeaderCell,
    TBODY: TableBody,
    THEAD: TableHeader,
};

export default function Table({ data, columns, config, ...innerProps }) {

    const [state, setState] = useState([]);
    const tableRef = useRef();
    const [sorted, setSorted] = useState({
        column: null,
        direction: null
    });

    const T = useMemo(() => {
        const theme = config ? config.theme : undefined
        return theme === 'semantic-ui' ? semanticUITheme : defaultTheme;
    }, [config]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setState(data);
        }
    }, [data]);

    function handleClick(ev) {
        const expandableContentTR = ev.currentTarget.nextElementSibling;

        if (tableRef.current) {
            const actives = tableRef.current.querySelectorAll('.expandable-row.row-active');
            if (actives.length) {
                for (let a of actives) {
                    a.classList.remove('row-active');
                }
            }
        }

        if (expandableContentTR) {
            if (expandableContentTR.classList.contains('expandable-row')) {
                expandableContentTR.classList.toggle('row-active');
            }
        }
    }

    function handleSort(column) {
        return () => {
            const type = checkType(state[0][column]);
            const newData = state.slice(0);
            if (sorted.column === column) {
                setState(newData.reverse());
                setSorted({
                    column: column,
                    direction: sorted.direction === 'ascending' ? 'descending' : 'ascending',
                });
            } else {
                setState(
                    type === 'date' ? newData.sort((a, b) => new Date(a[column]) - new Date(b[column])) :
                    type === 'number' ? newData.sort((a, b) => a[column] - b[column]) : newData.sort()
                );
                setSorted({
                    column: column,
                    direction: sorted.direction === 'ascending' ? 'descending' : 'ascending',
                });
            }
        }
    }

    if (T) {
        return (
            <T.TABLE sortable className='expandable-rows-table' {...innerProps}>
                <T.THEAD>
                    <T.TR>
                        {columns.map((c, i) => (
                            <T.TH
                                onClick={handleSort(c.name)}
                                sorted={sorted.column === c.name ? sorted.direction : null}
                                key={i}
                            >{c.title}</T.TH>
                        ))}
                    </T.TR>
                </T.THEAD>
                <T.TBODY>
                    {state.map((d, i) => (
                        <Fragment key={i}>
                            <T.TR onClick={handleClick}>
                                {columns.map((c, j) => <T.TD key={j}>{'render' in c ? c.render(d[c.name]) : d[c.name]}</T.TD>)}
                            </T.TR>
                            {d._content && (
                                <T.TR className='expandable-row'>
                                    <T.TD colSpan={columns.length}>
                                        <div className='expandable-content'>{d._content()}</div>
                                    </T.TD>
                                </T.TR>
                            )}
                        </Fragment>
                    ))}
                </T.TBODY>
            </T.TABLE>
        )
    }
}
