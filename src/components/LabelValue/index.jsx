import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default function LabelValue({
    display, label, value, labelColor, valueColor, className, fontSize, noWrap,
}) {
    return (
        <div className={`label-value-layout ${className}`} style={{ fontSize, display }}>
            <span style={{ color: labelColor }}>{label}：</span>
            <span title={value} className={`${noWrap ? 'no-wrap' : ''}`} style={{ color: valueColor }}>{value}</span>
        </div>
    );
}

LabelValue.propTypes = {
    display: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.elementType,
    labelColor: PropTypes.string,
    valueColor: PropTypes.string,
    className: PropTypes.string,
    fontSize: PropTypes.number,
    noWrap: PropTypes.bool,
};

LabelValue.defaultProps = {
    label: '',
    value: '-',
    labelColor: 'var(--text-light)',
    valueColor: 'var(--text-dark)',
    className: '',
    fontSize: 14,
    noWrap: false,
    display: 'block',
};
