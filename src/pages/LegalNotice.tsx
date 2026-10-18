import React from 'react';
import { LegalLink, LegalPage, LegalSection, LegalText } from '../components/LegalLayout';
import { OWNER } from '../data/content';

// Paragraphe au interligne plus aéré, propre à cette page.
const Text = ({ children }: { children: React.ReactNode }) => <LegalText lineHeight={1.8}>{children}</LegalText>;

const EmailLink = () => <LegalLink href={`mailto:${OWNER.email}`}>{OWNER.email}</LegalLink>;

/** Page « Mentions légales » (obligation LCEN : éditeur, hébergeur, responsable de publication). */
const LegalNotice = () => (
  <LegalPage title="Mentions Légales">
    <LegalSection title="Éditeur du site">
      <Text>
        <strong>Nom :</strong> Nicolas GOUJON<br />
        <strong>Statut :</strong> Développeur indépendant<br />
        <strong>Adresse :</strong> France<br />
        <strong>Email :</strong> <EmailLink />
      </Text>
    </LegalSection>

    <LegalSection title="Hébergeur">
      <Text>
        Le site est hébergé sur une infrastructure moderne utilisant Docker et Nginx.
        L'infrastructure technique est basée sur :<br />
        <strong>Frontend :</strong> React (Create React App)<br />
        <strong>Backend :</strong> API Laravel<br />
        <strong>Serveur web :</strong> Nginx<br />
        Pour toute question concernant l'hébergement, veuillez contacter l'éditeur du site.
      </Text>
    </LegalSection>

    <LegalSection title="Responsable de publication">
      <Text>
        <strong>Nom :</strong> Nicolas GOUJON<br />
        Le responsable de publication est le même que l'éditeur du site. Pour toute question ou réclamation, veuillez nous contacter à l'adresse email ci-dessus.
      </Text>
    </LegalSection>

    <LegalSection title="Contact">
      <Text>
        Pour toute demande d'information, correction, ou réclamation, vous pouvez nous contacter via :<br />
        <strong>Email :</strong> <EmailLink />
        <br />
        <strong>Formulaire de contact :</strong> Disponible via la section <LegalLink href="/#contact">Contact</LegalLink> du site
      </Text>
    </LegalSection>

    <LegalSection title="Propriété intellectuelle">
      <Text>
        L'ensemble des contenus présents sur ce site (textes, images, logos, etc.) sont la propriété de Nicolas GOUJON ou de tiers ayant autorisé leur utilisation.<br />
        <br />
        La reproduction, modification, distribution, transmission ou utilisation de ces contenus, en totalité ou en partie, sans autorisation préalable est interdite.
      </Text>
    </LegalSection>

    <LegalSection title="Liens externes">
      <Text>
        Ce site peut contenir des liens vers d'autres sites externes. Nicolas GOUJON n'est pas responsable du contenu de ces sites externes et décline toute responsabilité quant à leur disponibilité et leur contenu.
      </Text>
    </LegalSection>

    <LegalSection title="Limitation de responsabilité">
      <Text>
        Ce site est fourni "tel quel" sans garantie d'aucune sorte. Nicolas GOUJON décline toute responsabilité en cas de dysfonctionnement, d'indisponibilité du site ou de dommages résultant de son utilisation.
      </Text>
    </LegalSection>

    <LegalSection title="Données personnelles">
      <Text>
        Pour toute information concernant le traitement de vos données personnelles, veuillez consulter notre <LegalLink href="/politique-confidentialite">Politique de Confidentialité</LegalLink>. La mesure d'audience du site (SEO Monitor) y est décrite dans la section « Mesure d'audience », qui vous permet également de vous y opposer.
      </Text>
    </LegalSection>

    <LegalSection title="Réseaux sociaux">
      <Text>
        Ce site dispose de liens vers les profils LinkedIn et GitHub de Nicolas GOUJON. Ces plateformes externes sont régies par leurs propres conditions d'utilisation.
      </Text>
    </LegalSection>
  </LegalPage>
);

export default LegalNotice;
