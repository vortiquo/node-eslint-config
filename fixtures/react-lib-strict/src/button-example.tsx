// React Library Strict ESLint configuration fixture
import React, { useCallback } from 'react';

export type ButtonProps = {
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly variant?: 'primary' | 'secondary';
  readonly size?: 'small' | 'medium' | 'large';
};

const BUTTON_STYLES = {
  base: {
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  variants: {
    primary: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
  },
  sizes: {
    small: { padding: '4px 8px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '12px 24px', fontSize: '16px' },
  },
} as const;

export const Button: React.FC<ButtonProps> = React.memo(
  ({ children, onClick, variant = 'primary', size = 'medium' }) => {
    const handleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    const style = {
      ...BUTTON_STYLES.base,
      ...BUTTON_STYLES.variants[variant],
      ...BUTTON_STYLES.sizes[size],
    };

    return (
      <button onClick={handleClick} style={style} type="button">
        {children}
      </button>
    );
  }
);
