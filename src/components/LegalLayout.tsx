// Briques de mise en page partagées par les pages légales (mentions légales,
// politique de confidentialité) : page, section titrée, paragraphe, liste et lien.
import React from 'react';
import { Box, Container, Divider, Link, LinkProps, Typography, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { FONTS, getModeColors } from '../utils/theme';

const useLegalColors = () => getModeColors(useTheme().palette.mode);

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
  /** Affiche un pied de page « © année - Tous droits réservés ». */
  withCopyright?: boolean;
}

/** Page légale : titre (h1), date de mise à jour, puis sections espacées verticalement. */
export const LegalPage = ({ title, children, withCopyright = false }: LegalPageProps) => {
  const { bg, fg, fgSecondary, fgAlpha, fgSecondaryAlpha } = useLegalColors();
  const divider = <Divider sx={{ my: 4, borderColor: fgAlpha(0.1) }} />;

  return (
    <Box sx={{ background: bg, color: fgSecondary, minHeight: '100vh', py: 5, px: 2 }}>
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ color: fg, mb: 4, fontSize: '2.5rem', fontWeight: 'bold', fontFamily: FONTS.comforta }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: fgSecondaryAlpha(0.7), mb: 4, fontSize: '0.95rem' }}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
        {divider}

        <Box sx={{ '& > * + *': { mt: 4 } }}>{children}</Box>

        {withCopyright && (
          <>
            {divider}
            <Typography variant="body2" sx={{ color: fgSecondaryAlpha(0.7), textAlign: 'center', mt: 4 }}>
              © {new Date().getFullYear()} Nicolas GOUJON - Tous droits réservés.
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
};

/** Section d'une page légale, introduite par un titre h2. */
export const LegalSection = ({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) => {
  const { fg } = useLegalColors();
  return (
    <Box id={id}>
      <Typography variant="h2" sx={{ color: fg, fontSize: '1.8rem', fontWeight: 'bold', mb: 2, fontFamily: FONTS.garet }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

/** Paragraphe de texte courant (interligne ajustable, 1.6 par défaut). */
export const LegalText = ({ children, lineHeight = 1.6, sx }: { children: React.ReactNode; lineHeight?: number; sx?: SxProps<Theme> }) => {
  const { fgSecondary } = useLegalColors();
  return (
    <Typography variant="body1" sx={[{ color: fgSecondary, fontSize: '1rem', lineHeight }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </Typography>
  );
};

/** Liste à puces ; chaque élément est espacé du suivant. */
export const LegalList = ({ items, sx }: { items: React.ReactNode[]; sx?: SxProps<Theme> }) => {
  const { fgSecondary } = useLegalColors();
  return (
    <Box component="ul" sx={[{ pl: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {items.map((item, index) => (
        <Typography component="li" key={index} sx={{ color: fgSecondary, mb: index < items.length - 1 ? 1 : 0 }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
};

/** Lien souligné aux couleurs des pages légales. */
export const LegalLink = ({ sx, ...props }: LinkProps) => {
  const { fgSecondary, fgSecondaryAlpha } = useLegalColors();
  return (
    <Link
      {...props}
      sx={[
        { color: fgSecondaryAlpha(0.92), textDecoration: 'underline', '&:hover': { color: fgSecondary } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};
