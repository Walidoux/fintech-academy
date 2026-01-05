import { Typography } from "./base-typography"

export const EBITDA = () => {
  const data = {
    headers: [
      'Ligne du P&L (Compte de résultat)',
      'Situation actuelle',
      'Situation après projet (+2% Vol)',
      'Variation',
      'Commentaire',
    ],

    rows: [
      ['Volume (Tonnes)', 500_000, 510_000, '+10k', '+2% Productivité'],
      ["Chiffre d'affaires (4k/t)", 2000, 2040, '+40', ''],
      [
        '(-) Coûts Variables (2.5k/t)',
        '(1250 MDH)',
        '1275 MDH',
        '-25 MDH',
        'Augmentent avec le volume',
      ],
      ['= Marge sur Coûts Variables', '750 MDH', '765 MDH', '+15 MDH', ''],
      [
        '(-) Coûts Fixes (Salaires, etc.)',
        '(400 MDH)',
        '(400 MDH)',
        0,
        'Ne bougent pas !',
      ],
      ['= EBITDA', '350 MDH', '365 MDH', '+15 MDH', 'Impact dur'],
      [
        'Merge EBITDA',
        '17.5%',
        '17.9%',
        '+0.4 pts',
        'Amélioration de la rentabilité globale',
      ],
    ],
  }

  return <Typography.table data={data} />
}
