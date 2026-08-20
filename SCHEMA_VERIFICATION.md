# Vérification des Données Structurées (Schema.org / JSON-LD)

**Date de vérification :** 2026-08-20  
**Projet :** Portfolio personnel - Nicolas GOUJON (https://nicolas-goujon.com)  
**Type de contenu :** Portfolio/Site personnel avec sections d'expérience, compétences, formation, projets

---

## 📋 Résumé Exécutif

**Statut global :** ⚠️ **Partiellement implémenté**

Le site contient actuellement **1 schéma JSON-LD** (Person) mais manque plusieurs données structurées pertinentes pour optimiser le référencement et la découverte sémantique du contenu.

---

## ✅ Données Structurées Présentes

### 1. **Person** ✓ Implémenté
**Localisation :** `/public/index.html` (lignes 52-65)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nicolas GOUJON",
  "url": "https://nicolas-goujon.com/",
  "jobTitle": "Développeur Web & Product Owner",
  "email": "mailto:contact@nicolas-goujon.fr",
  "sameAs": [
    "https://www.linkedin.com/in/ngoujon/",
    "https://github.com/ngoujon"
  ]
}
```

**Qualité :** ✅ Bon - Informations de base correctes, avec profils sociaux

---

## ❌ Données Structurées Manquantes (Recommandées)

### 1. **Organization** - 🔴 Critérité : HAUTE
**Utilité :** Décrire l'entité professionnelle / micro-entreprise

**Pertinent car :**
- Le site décrit une activité professionnelle autonome
- Améliore la crédibilité professionnelle (Knowledge Panel Google)
- Combine informations personnelles et commerciales

**Schéma recommandé :**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nicolas GOUJON",
  "url": "https://nicolas-goujon.com/",
  "description": "Développeur web et Product Owner : création de sites internet, applications web sur-mesure et solutions IA",
  "logo": "https://nicolas-goujon.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "contact@nicolas-goujon.fr"
  },
  "sameAs": [
    "https://www.linkedin.com/in/ngoujon/",
    "https://github.com/ngoujon"
  ]
}
```

**Impact SEO :** ⭐⭐⭐⭐⭐ Très élevé

---

### 2. **Service** - 🟠 Critérité : MOYENNE-HAUTE
**Utilité :** Décrire les services proposés

**Pertinent car :**
- Le site mentionne clairement les services (création de sites, développement front-end/back-end, solutions IA)
- Permet aux moteurs de recherche d'indexer les services offerts
- Améliore la visibilité pour les recherches spécifiques ("création site web", "développement frontend")

**Schéma recommandé :**
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de Sites Internet",
    "description": "Développement de sites web sur-mesure avec expertise front-end et back-end",
    "provider": {
      "@type": "Person",
      "name": "Nicolas GOUJON"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solutions IA",
    "description": "Intégration de solutions IA et automatisation intelligente",
    "provider": {
      "@type": "Person",
      "name": "Nicolas GOUJON"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Développement d'Applications Web",
    "description": "Applications web sur-mesure avec technologies modernes",
    "provider": {
      "@type": "Person",
      "name": "Nicolas GOUJON"
    }
  }
]
```

**Impact SEO :** ⭐⭐⭐⭐ Élevé

---

### 3. **ContactPoint** - 🟠 Critérité : MOYENNE-HAUTE
**Utilité :** Structurer les informations de contact

**Pertinent car :**
- Le site contient une section Contact avec email et formulaire
- Facilite l'extraction automatique des coordonnées
- Amélioré de la crédibilité

**Schéma recommandé :**
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "contactType": "Customer Service",
  "email": "contact@nicolas-goujon.fr",
  "areaServed": ["FR", "BE", "CH"],
  "availableLanguage": ["fr", "en"]
}
```

**Impact SEO :** ⭐⭐⭐ Moyen

---

### 4. **BreadcrumbList** - 🟡 Critérité : BASSE-MOYENNE
**Utilité :** Structurer la navigation / fil d'Ariane

**Pertinent car :**
- Le site a une navigation par sections (Bio, Stack, Formation, Projets, Contact)
- Améliore l'apparence dans les SERP (affiche le chemin)
- Ajoute une navigationstructurée pour les moteurs

**Schéma recommandé :**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://nicolas-goujon.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Bio",
      "item": "https://nicolas-goujon.com/#bio"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Stack",
      "item": "https://nicolas-goujon.com/#stack"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Formation",
      "item": "https://nicolas-goujon.com/#formation"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Projets",
      "item": "https://nicolas-goujon.com/#projets"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Contact",
      "item": "https://nicolas-goujon.com/#contact"
    }
  ]
}
```

**Impact SEO :** ⭐⭐⭐ Moyen

---

### 5. **CreativeWork** ou **SoftwareApplication** - 🟡 Critérité : BASSE-MOYENNE
**Utilité :** Décrire les projets listés

**Pertinent car :**
- Le site contient une section "Projets" 
- Chaque projet pourrait avoir son propre schéma
- Améliore l'indexation des portefeuille

**Schéma recommandé (par projet) :**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Nom du projet]",
  "description": "[Description du projet]",
  "creator": {
    "@type": "Person",
    "name": "Nicolas GOUJON"
  },
  "url": "[URL du projet]",
  "image": "[Image du projet]",
  "applicationCategory": "WebApplication"
}
```

**Impact SEO :** ⭐⭐⭐ Moyen

---

### 6. **EducationalOccupationalCredential** - 🟡 Critérité : BASSE
**Utilité :** Structurer les formations/certifications

**Pertinent car :**
- Le site contient une section "Formation" avec cursus, certifications
- Améliore la crédibilité académique/professionnelle

**Schéma recommandé :**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  "name": "[Nom de la formation]",
  "credentialCategory": "Degree",
  "issuingOrganization": {
    "@type": "Organization",
    "name": "[Nom de l'école/université]"
  },
  "awardDate": "[Date de l'année]"
}
```

**Impact SEO :** ⭐⭐ Faible

---

## 📊 Tableau Récapitulatif

| Schéma | Présent | Pertinence | Impact SEO | Priorité | Localisation |
|--------|---------|-----------|-----------|----------|---|
| **Person** | ✅ | Haute | ⭐⭐⭐⭐⭐ | Existant | `/public/index.html` |
| **Organization** | ❌ | Haute | ⭐⭐⭐⭐⭐ | 🔴 HAUTE | À ajouter |
| **Service** | ❌ | Moyenne-Haute | ⭐⭐⭐⭐ | 🔴 HAUTE | À ajouter |
| **ContactPoint** | ❌ | Moyenne-Haute | ⭐⭐⭐ | 🟠 MOYENNE | À ajouter |
| **BreadcrumbList** | ❌ | Basse-Moyenne | ⭐⭐⭐ | 🟡 BASSE | À ajouter |
| **SoftwareApplication** | ❌ | Basse-Moyenne | ⭐⭐⭐ | 🟡 BASSE | À ajouter (sections Projets) |
| **EducationalOccupationalCredential** | ❌ | Basse | ⭐⭐ | 🟡 BASSE | À ajouter (section Formation) |

---

## 🎯 Recommandations (Priorités)

### Phase 1 (Impact maximum - Recommandé) 
1. ✅ Ajouter **Organization** - Lier à Person existant
2. ✅ Ajouter **Service** x3 - Services proposés
3. ✅ Enrichir **Person** - Ajouter image de profil, occupation

### Phase 2 (Amélioration supplémentaire)
4. Ajouter **ContactPoint** - Compléter les informations de contact
5. Ajouter **BreadcrumbList** - Structure de navigation

### Phase 3 (Optionnel)
6. Ajouter **SoftwareApplication** - Par projet
7. Ajouter **EducationalOccupationalCredential** - Par formation

---

## ✅ Checklist de Conformité

- [x] Person schema implémenté
- [x] Les données structurées utilisent JSON-LD (format préféré)
- [ ] Organization schema implémenté
- [ ] Service schema implémenté
- [ ] ContactPoint structuré
- [ ] BreadcrumbList pour la navigation
- [ ] Valeurs JSON-LD validées (https://schema.org/docs/index.html)
- [ ] Structure testée avec Google Rich Results Test (https://search.google.com/test/rich-results)

---

## 🔗 Ressources

- **Documentation schema.org :** https://schema.org/
- **Validateur Google :** https://search.google.com/test/rich-results
- **Guide JSON-LD :** https://json-ld.org/
- **Structured Data Testing Tool :** https://schema.org/

---

## 📝 Notes

Le projet a une bonne base avec le schéma Person, mais manque des opportunités SEO importantes en ne structurant pas les services, l'organisation et les contacts de manière sémantique. L'ajout des schémas recommandés (Organisation, Services) pourrait améliorer significativement la découverte et la visibilité du site dans les moteurs de recherche et les assistants vocaux.

