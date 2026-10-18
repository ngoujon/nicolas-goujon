import React from 'react';
import type { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  /** Taille CSS de l'icône (hérite de la taille de police du parent par défaut). */
  size?: string;
  color?: string;
}

/**
 * Icône SVG (react-icons) alignée comme un glyphe de texte. Remplace la police
 * `bootstrap-icons`, qui chargeait ~85 Ko de CSS et une police complète pour une vingtaine d'icônes.
 */
const Icon = ({ icon: SvgIcon, size = '1em', color }: IconProps) => (
  <span style={{ fontSize: size, color }} aria-hidden="true">
    <SvgIcon style={{ verticalAlign: '-0.125em' }} />
  </span>
);

export default Icon;
