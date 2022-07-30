export const variantMapper = ({ styles }: any) => {
  return {
    primary: {
      className: styles.variantPrimary,
    },
    secondary: {
      className: styles.variantSecondary,
    },
  }
}

export const sizeMapper = ({ styles }: any) => {
  return {
    tiny: {
      className: styles.sizeTiny,
    },
    small: {
      className: styles.sizeSmall,
    },
    medium: {
      className: styles.sizeMedium,
    },
  }
}
