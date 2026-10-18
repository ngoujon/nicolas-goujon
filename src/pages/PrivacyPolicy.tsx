import React, { useState } from 'react';
import { LegalLink, LegalList, LegalPage, LegalSection, LegalText } from '../components/LegalLayout';

/** Page « Politique de confidentialité » (RGPD), avec opposition à la mesure d'audience. */
const PrivacyPolicy = () => {
  const [optedOut, setOptedOut] = useState(false);

  // Opposition à la mesure d'audience. Pas de `onclick` inline : la CSP
  // (`script-src` sans 'unsafe-inline') le bloquerait.
  const handleOptOut = () => {
    window.seoMonitor?.optOut();
    setOptedOut(true);
  };

  return (
    <LegalPage title="Politique de Confidentialité" withCopyright>
      <LegalSection title="1. Introduction">
        <LegalText>
          Cette Politique de Confidentialité explique comment le site nicolas-goujon.fr collecte, utilise, stocke et protège les données personnelles de ses visiteurs. Nous nous engageons à respecter votre vie privée et à être transparent quant à l'utilisation de vos données.
        </LegalText>
      </LegalSection>

      <LegalSection title="2. Données Collectées">
        <LegalText sx={{ mb: 2 }}>Nous collectons les types de données suivants :</LegalText>
        <LegalList
          items={[
            <><strong>Données de formulaire de contact :</strong> Nom, adresse e-mail, sujet et message fournis volontairement via le formulaire de contact. Ces données sont utilisées uniquement pour vous répondre.</>,
            <><strong>Données techniques :</strong> Adresse IP et informations de journalisation technique, traitées par notre hébergeur pour assurer le fonctionnement et la sécurité du site.</>,
            <><strong>Données de mesure d'audience :</strong> Statistiques de fréquentation anonymes collectées par l'outil auto-hébergé SEO Monitor (voir la section « Mesure d'audience » ci-dessous).</>,
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Utilisation des Données">
        <LegalText sx={{ mb: 2 }}>Les données collectées sont utilisées pour :</LegalText>
        <LegalList
          items={[
            'Répondre à vos demandes via le formulaire de contact',
            "Établir des statistiques de fréquentation anonymes (mesure d'audience)",
            'Assurer le fonctionnement technique, la sécurité et la conformité légale du site',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Partage des Données">
        <LegalText>Nous ne partageons pas vos données personnelles avec des tiers, sauf :</LegalText>
        <LegalList
          items={[
            <><strong>Hébergeur du site :</strong> Traite les données techniques (adresse IP) nécessaires au fonctionnement du serveur</>,
            <><strong>Service d'envoi d'e-mails :</strong> Adresse e-mail utilisée pour vous répondre si vous contactez le site</>,
            <><strong>Obligations légales :</strong> Si légalement requises par les autorités compétentes</>,
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Sécurité des Données">
        <LegalText>
          Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
        </LegalText>
      </LegalSection>

      <LegalSection title="6. Vos Droits">
        <LegalText sx={{ mb: 2 }}>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </LegalText>
        <LegalList
          items={[
            <><strong>Droit d'accès :</strong> Demander l'accès aux données personnelles que nous détenons à votre sujet</>,
            <><strong>Droit de rectification :</strong> Corriger les données inexactes ou incomplètes</>,
            <><strong>Droit à l'oubli :</strong> Demander la suppression de vos données personnelles</>,
            <><strong>Droit à la limitation du traitement :</strong> Limiter le traitement de vos données</>,
            <><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et transférable</>,
            <><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</>,
          ]}
        />
        <LegalText sx={{ mt: 2 }}>Pour exercer ces droits, veuillez contacter nicolas.goujon18@gmail.com.</LegalText>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <LegalText>
          Ce site n'utilise aucun cookie de suivi publicitaire ni outil d'analyse tiers (pas de Google Analytics ni d'outil similaire). Seuls des traceurs exemptés de consentement peuvent être déposés : ceux strictement nécessaires au fonctionnement technique du site (par exemple la mémorisation du thème clair / sombre), et l'identifiant <strong>sm_vid</strong> (stockage local du navigateur, first-party ; finalité : mesure d'audience SEO Monitor ; durée : 13 mois maximum ; exempté de consentement, voir la section « Mesure d'audience »). Si un outil soumis à consentement venait à être ajouté, un bandeau vous permettrait de l'accepter ou de le refuser avant tout dépôt.
        </LegalText>
      </LegalSection>

      <LegalSection title="8. Mesure d'audience" id="mesure-audience">
        <LegalText sx={{ mb: 2 }}>
          Ce site utilise SEO Monitor, un outil de mesure d'audience auto-hébergé, afin d'établir des statistiques de fréquentation anonymes (pages consultées, provenance des visites, durée de consultation, type d'appareil). Ces données servent uniquement au bon fonctionnement et à l'amélioration du site.
        </LegalText>
        <LegalText sx={{ mb: 2 }}>
          Un identifiant aléatoire est conservé dans votre navigateur pendant 13 mois au maximum. Votre adresse IP n'est jamais enregistrée : elle sert uniquement, de manière éphémère, à déduire un pays et une ville approximatifs. Les données ne sont ni recoupées avec d'autres traitements, ni transmises à des tiers, et sont conservées 25 mois au maximum.
        </LegalText>
        <LegalList
          sx={{ mb: 2 }}
          items={[
            <><strong>Responsable du traitement :</strong> Nicolas GOUJON, éditeur du site (contact@nicolas-goujon.fr).</>,
            <><strong>Finalité :</strong> mesure d'audience du site.</>,
            <><strong>Base légale :</strong> intérêt légitime de l'éditeur ; traitement exempté de consentement au titre de l'article 82 de la loi Informatique et Libertés et des lignes directrices de la CNIL relatives aux traceurs.</>,
            <><strong>Données collectées :</strong> pages vues, provenance des visites, durée de consultation, profondeur de défilement, type d'appareil, navigateur, langue, pays et ville approximatifs. L'adresse IP n'est pas conservée.</>,
            <><strong>Durée de conservation :</strong> 25 mois maximum pour les statistiques ; 13 mois maximum pour l'identifiant navigateur (sm_vid).</>,
            <><strong>Destinataires :</strong> aucun tiers. Les données sont hébergées sur un serveur OVH situé en France.</>,
            <>
              <strong>Vos droits :</strong> accès, rectification, effacement, opposition et limitation, à exercer à l'adresse contact@nicolas-goujon.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (<LegalLink href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</LegalLink>).
            </>,
          ]}
        />
        <LegalText>
          Conformément aux lignes directrices de la CNIL, ce traitement est exempté de consentement. Vous pouvez néanmoins vous y opposer à tout moment :{' '}
          {optedOut ? (
            <strong role="status">Vos visites ne sont plus mesurées.</strong>
          ) : (
            <LegalLink component="button" type="button" onClick={handleOptOut} sx={{ fontSize: 'inherit', verticalAlign: 'baseline' }}>
              ne plus être mesuré
            </LegalLink>
          )}
          .
        </LegalText>
      </LegalSection>

      <LegalSection title="9. Liens Externes">
        <LegalText>
          Ce site peut contenir des liens vers des sites externes. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites. Nous vous recommandons de consulter leur politique de confidentialité avant de partager vos données personnelles.
        </LegalText>
      </LegalSection>

      <LegalSection title="10. Modifications de cette Politique">
        <LegalText>
          Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront publiées sur cette page avec la date de mise à jour. Votre utilisation continue du site après les modifications constitue votre acceptation de la politique mise à jour.
        </LegalText>
      </LegalSection>

      <LegalSection title="11. Contact">
        <LegalText>
          Pour toute question concernant cette Politique de Confidentialité ou pour exercer vos droits liés aux données personnelles, veuillez nous contacter à : <strong>nicolas.goujon18@gmail.com</strong>
        </LegalText>
      </LegalSection>
    </LegalPage>
  );
};

export default PrivacyPolicy;
