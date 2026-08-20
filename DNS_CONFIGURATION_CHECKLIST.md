# Vérification DNS et Configuration Emails

## Statut du Site
✅ **Le site envoie des emails** via Laravel (formulaire de contact)

## Domaine Utilisé
- **Domaine principal** : `nicolas-goujon.fr`
- **Adresse d'envoi** : `noreply@nicolas-goujon.fr`
- **Service d'envoi configuré** : SMTP (Hostinger)

---

## Vérification des Enregistrements DNS

### 1. SPF (Sender Policy Framework)
**Statut** : ✅ **CONFIGURÉ**

**Enregistrement trouvé** :
```
v=spf1 include:_spf.mail.hostinger.com ~all
```

**Vérification** : 
- L'enregistrement SPF autorise les serveurs mail de Hostinger à envoyer des emails depuis ce domaine
- Syntaxe correcte avec softfail (~all)

---

### 2. DKIM (DomainKeys Identified Mail)
**Statut** : ⚠️ **NON DÉTECTÉ**

**Vérification effectuée** :
- `default._domainkey.nicolas-goujon.fr` : ❌ Non trouvé
- `mail._domainkey.nicolas-goujon.fr` : ❌ Non trouvé
- `hostinger._domainkey.nicolas-goujon.fr` : ❌ Non trouvé
- `postmark._domainkey.nicolas-goujon.fr` : ❌ Non trouvé

**Recommandations** :
- ⚠️ DKIM n'est pas actuellement configuré
- DKIM améliore la délivrabilité et l'authentification des emails
- **Action recommandée** : Ajouter un enregistrement DKIM via le panneau Hostinger
- Contactez le support Hostinger pour activer et configurer DKIM pour `nicolas-goujon.fr`
- Le sélecteur DKIM par défaut chez Hostinger est généralement `default` ou `mail`

---

### 3. DMARC (Domain-based Message Authentication, Reporting and Conformance)
**Statut** : ✅ **CONFIGURÉ**

**Enregistrement trouvé** :
```
v=DMARC1; p=none
```

**Vérification** :
- L'enregistrement DMARC existe et est bien formé
- Politique actuelle : `p=none` (monitoring sans rejet)

**Recommandations** :
- Pour une sécurité renforcée, envisager de passer à `p=quarantine` ou `p=reject` après validation
- Configuration actuelle permet le monitoring du non-authentification sans impact sur la délivrabilité

---

## Résumé de la Configuration

| Authentification | Statut | Action Nécessaire |
|---|---|---|
| SPF | ✅ Configuré | Aucune |
| DKIM | ⚠️ Non détecté | Configurer via Hostinger |
| DMARC | ✅ Configuré | Optionnel : renforcer la politique |

---

## Comment Vérifier Ces Enregistrements

### Via Ligne de Commande
```bash
# SPF
dig +short TXT nicolas-goujon.fr

# DKIM (remplacer 'default' par le sélecteur approprié)
dig +short TXT default._domainkey.nicolas-goujon.fr

# DMARC
dig +short TXT _dmarc.nicolas-goujon.fr
```

### Via Outils En Ligne
- [MXToolbox](https://mxtoolbox.com/spf.aspx)
- [DMARCian](https://dmarcian.com/)
- [Google Admin Toolbox](https://toolbox.googleapps.com/apps/checkmx/)

---

## Informations de Configuration

### Fichier de Configuration
- Fichier de config mail : `/api/config/mail.php`
- Fichier .env : Variables d'environnement mail configurées

### Variables d'Environnement
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com (à adapter selon le fournisseur)
MAIL_PORT=587
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@nicolas-goujon.fr"
MAIL_FROM_NAME="Site Nicolas Goujon"
CONTACT_EMAIL_TO=contact@nicolas-goujon.fr
```

---

## Prochaines Étapes

1. ✅ SPF est configuré - Aucune action immédiate
2. ⚠️ **Priorité** : Configurer DKIM pour améliorer la délivrabilité
   - Accédez au panneau Hostinger
   - Cherchez la section "Email" ou "DNS"
   - Activez DKIM pour le domaine `nicolas-goujon.fr`
3. ✅ DMARC est configuré - Optionnel : renforcer la politique après test

---

**Dernière vérification** : 2026-08-20
**Vérificateur** : DNS lookup via dig
