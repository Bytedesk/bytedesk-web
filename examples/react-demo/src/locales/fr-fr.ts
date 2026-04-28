import { en } from './en';

const basicDemoFieldDocs = {
  isDebug: 'Active les journaux de débogage pendant le développement.',
  forceRefresh: 'Force le rechargement de la page de chat ou de l iframe pour vérifier les problèmes de cache.',
  apiUrl: 'Adresse racine de l API utilisée pour l initialisation du visiteur, les non lus et les retours.',
  htmlUrl: 'Adresse racine du site de chat. Le type de page est séparé par des routes dédiées.',
  chatPath: 'Chemin de la page de chat texte.',
  threadPath: 'Chemin de la page d historique des conversations.',
  webrtcPath: 'Chemin de la page audio ou vidéo.',
  callPath: 'Chemin de la page du centre d appels.',
  locale: 'Langue de l interface, également envoyée au paramètre lang de l URL de chat.',
  placement: 'Position d ancrage du bouton et de la fenêtre de chat.',
  marginBottom: 'Marge par rapport au bas en px.',
  marginSide: 'Marge par rapport à la gauche ou à la droite en px.',
  autoPopup: 'Ouvre automatiquement la fenêtre de chat après l initialisation.',
  autoPopupDelay: 'Délai avant l ouverture automatique.',
  draggable: 'Permet de faire glisser le bouton d entrée.',
  tabsConfig: 'Contrôle l affichage des onglets home, messages, help et news.',
  bubbleConfig: 'Configure la bulle d information au-dessus de l entrée.',
  buttonConfig: 'Configuration pour un seul bouton d entrée.',
  buttonsConfig: 'Liste de plusieurs boutons d entrée, prioritaire sur buttonConfig.',
  inviteConfig: 'Configure la popup d invitation, son timing, ses répétitions et ses callbacks.',
  theme: 'Configuration du thème et des couleurs.',
  animation: 'Configuration de l animation lors de l affichage ou du masquage de la fenêtre de chat.',
  window: 'Taille de la fenêtre de chat sur desktop.',
  onInit: 'Callback exécuté après l initialisation du SDK.',
  onShowChat: 'Exécuté lorsque la fenêtre de chat s affiche.',
  onHideChat: 'Exécuté lorsque la fenêtre de chat se masque.',
  onMessage: 'Exécuté lors de la réception de messages depuis l iframe ou le SDK.',
  onConfigChange: 'Exécuté après une modification de configuration.',
  onVisitorInfo: 'Retourne uid et visitorUid après l initialisation du visiteur.',
  'theme.mode': 'Mode de thème : light, dark ou system.',
  'theme.textColor': 'Couleur du texte du bouton ou du module.',
  'theme.backgroundColor': 'Couleur de fond principale du bouton ou de la navigation.',
  'bubble.show': 'Indique si la bulle au-dessus de l entrée est affichée.',
  'bubble.icon': 'Icône par défaut d une bulle simple.',
  'bubble.title': 'Titre d une bulle simple.',
  'bubble.subtitle': 'Sous-titre d une bulle simple.',
  'bubble.messages': 'Liste de plusieurs bulles, prioritaire sur la configuration simple.',
  'bubble.autoRotate': 'Indique si plusieurs bulles tournent automatiquement.',
  'bubble.rotateInterval': 'Intervalle de rotation des bulles.',
  'bubble.switchMode': 'Mode de transition : fade, slide-up ou ticker.',
  'button.show': 'Indique si ce bouton est affiché.',
  'button.icon': 'Icône du bouton.',
  'button.text': 'Texte du bouton. Pour une entrée circulaire unique, il peut être omis.',
  'button.width': 'Largeur du bouton.',
  'button.height': 'Hauteur du bouton.',
  'button.action': 'Type d action intégré : chat, thread, webrtc ou call.',
  'button.previewImageUrl': 'Image affichée au survol, utile pour un QR code.',
  'button.previewImageAlt': 'Texte affiché sous l image d aperçu.',
  'button.onClick': 'Gestionnaire de clic personnalisé qui remplace l action par défaut.',
  'invite.show': 'Indique si la popup d invitation est activée.',
  'invite.text': 'Texte de l invitation.',
  'invite.icon': 'Icône de l invitation.',
  'invite.delay': 'Délai avant la première apparition.',
  'invite.loop': 'Indique si l invitation se répète.',
  'invite.loopDelay': 'Temps entre deux répétitions.',
  'invite.loopCount': 'Nombre maximal de répétitions.',
  'invite.acceptText': 'Texte du bouton accepter.',
  'invite.rejectText': 'Texte du bouton refuser.',
  'invite.onAccept': 'Exécuté lorsque l utilisateur accepte.',
  'invite.onReject': 'Exécuté lorsque l utilisateur refuse.',
  'invite.onClose': 'Exécuté lorsque la popup se ferme.',
  'invite.onOpen': 'Exécuté lorsque la popup s ouvre.',
  'chat.org': 'ID d organisation, obligatoire.',
  'chat.t': 'Type de conversation, obligatoire. t=0 signifie service client en tete-a-tete, t=1 signifie groupe de travail et t=2 signifie robot.',
  'chat.sid': 'ID cible de conversation, obligatoire.',
  'chat.uid': 'ID utilisateur interne généralement géré par le SDK.',
  'chat.visitorUid': 'Identifiant visiteur unique côté métier.',
  'chat.nickname': 'Surnom du visiteur.',
  'chat.avatar': 'URL de l avatar du visiteur.',
  'chat.mobile': 'Numéro de téléphone du visiteur.',
  'chat.email': 'Adresse e-mail du visiteur.',
  'chat.note': 'Note visible pour le support client.',
  'chat.channel': 'Canal de provenance.',
  'chat.goodsInfo': 'Informations produit.',
  'chat.orderInfo': 'Informations de commande.',
  'chat.extra': 'Champs supplémentaires, généralement au format JSON.',
  'chat.vipLevel': 'Niveau de membre.',
  'chat.debug': 'Indicateur métier pour distinguer test et production.',
  'chat.draft': 'Indicateur de diffusion progressive transmis comme draft=1 dans l URL.',
  'chat.settingsUid': 'Identifiant unique utilisé pour déboguer la configuration.',
  'chat.loadHistory': 'Indique si l historique des messages est charge. loadHistory=1 charge l historique par defaut a l ouverture de la page de chat.',
  'chat.custom': 'Des champs métier supplémentaires peuvent encore être ajoutés aux paramètres de l URL de chat.',
  'browse.referrer': 'Adresse de la page source.',
  'browse.url': 'Adresse de la page courante.',
  'browse.title': 'Titre de la page courante.',
  'browse.custom': 'Peut inclure des informations supplémentaires comme l ID de page.',
  'feedback.enabled': 'Indique si la fonction de retour documentaire est activée.',
  'feedback.trigger': 'Mode de déclenchement : selection, button ou both.',
  'feedback.showOnSelection': 'Indique si l entrée de retour apparaît lors d une sélection de texte.',
  'feedback.selectionText': 'Texte d aide lors de la sélection.',
  'feedback.buttonText': 'Libellé fixe du bouton de retour.',
  'feedback.dialogTitle': 'Titre de la boîte de dialogue de retour.',
  'feedback.placeholder': 'Placeholder du champ de saisie.',
  'feedback.submitText': 'Libellé du bouton d envoi.',
  'feedback.cancelText': 'Libellé du bouton d annulation.',
  'feedback.successMessage': 'Message affiché après un envoi réussi.',
  'feedback.categoryNames': 'Liste des catégories de problème.',
  'feedback.requiredTypes': 'Indique s il faut sélectionner au moins une catégorie.',
  'feedback.typesSectionTitle': 'Titre de la zone des catégories.',
  'feedback.typesDescription': 'Description complémentaire de la zone des catégories.',
  'feedback.submitScreenshot': 'Indique si une capture d écran est envoyée avec le retour.',
  'feedback.onSubmit': 'Flux d envoi personnalisé.',
  'feedback.onCancel': 'Exécuté lors de l annulation du retour.',
  'animation.enabled': 'Indique si l animation de la fenêtre de chat est activée.',
  'animation.duration': 'Durée de l animation.',
  'animation.type': 'Type d easing.',
  'window.width': 'Largeur de la fenêtre de chat desktop.',
  'window.height': 'Hauteur de la fenêtre de chat desktop.',
  'tabs.home': 'Indique si l onglet home est affiché.',
  'tabs.messages': 'Indique si l onglet messages est affiché.',
  'tabs.help': 'Indique si l onglet help est affiché.',
  'tabs.news': 'Indique si l onglet news est affiché.',
} as const;

export const frFr = {
  ...en,
  common: {
    ...en.common,
    languageLabel: 'Langue',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Chinois simplifie',
      'zh-tw': 'Chinois traditionnel',
      'ja-jp': 'Japonais',
      'ko-kr': 'Coreen',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Espagnol',
      'fr-fr': 'Français',
      'th-th': 'ไทย'
    },
    themeLabel: 'Mode de theme',
    themeOptions: {
      light: 'Clair',
      dark: 'Sombre',
      system: 'Systeme'
    },
    officialSiteLabel: 'Site officiel Bytedesk',
    resetAnonymousVisitorLabel: 'Reinitialiser le visiteur anonyme',
    resetAnonymousVisitorSuccess: 'Visiteur anonyme reinitialise',
    docLinks: {
      ...en.common.docLinks,
      react: 'Voir la documentation d integration React',
      vue: 'Voir la documentation d integration Vue',
      reactExample: 'Exemple de base React',
      vueExample: 'Exemple de base Vue',
      userInfo: 'Voir la documentation des informations utilisateur',
      goodsInfo: 'Voir la documentation des informations produit',
      orderInfo: 'Voir la documentation des informations de commande',
      vipLevel: 'Voir la documentation de personnalisation',
      unreadCount: 'Exemple React de messages non lus',
      documentFeedback: 'Guide de retour sur document'
    },
    buttons: {
      ...en.common.buttons,
      openChat: 'Ouvrir le chat',
      openChatWithParams: 'Ouvrir le chat avec parametres',
      closeChat: 'Fermer le chat',
      showButton: 'Afficher le bouton',
      hideButton: 'Masquer le bouton',
      showBubble: 'Afficher la bulle',
      hideBubble: 'Masquer la bulle',
      showInvite: 'Afficher l invitation',
      hideInvite: 'Masquer l invitation',
      togglePlacement: 'Changer la position',
      toggleThemeColor: 'Changer la couleur du theme',
      reset: 'Reinitialiser',
      copy: 'Copier',
      submit: 'Envoyer',
      cancel: 'Annuler',
      openInNewWindow: 'Ouvrir dans une fenetre popup',
      openInNewTab: 'Ouvrir dans un nouvel onglet'
    },
    apiHintPrefix: 'Appels API :'
  },
  nav: {
    ...en.nav,
    more: 'Plus',
    basicDemo: '⚙️ Configuration de base',
    userInfoDemo: '👤 Informations utilisateur',
    goodsInfoDemo: '🛒 Informations produit',
    orderInfoDemo: '📦 Informations commande',
    vipLevelDemo: '👑 Personnalisation',
    unreadCountDemo: '🔔 Non lus',
    threadHistoryDemo: '🧵 Historique des conversations',
    webrtcDemo: '📹 Demo WebRTC',
    callCenterDemo: '📞 Centre d appels',
    proactiveDemo: '🎯 Acquisition proactive',
    videoConferenceDemo: '🎬 Visioconference',
    documentFeedbackDemo: '📝 Retour sur document',
    flightBookingDemo: '✈️ Reservation de vol'
  },
  pages: {
    ...en.pages,
    voiceAgentDemo: {
      ...en.pages.voiceAgentDemo,
      title: 'Demo de l assistant vocal'
    },
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'Configuration de base Bytedesk',
      intro: 'Utilisez les actions rapides ci-dessous pour tester les fonctions courantes du SDK Web Bytedesk.',
      themeButtonLabel: 'Changer la couleur de navigation',
      themeTextButtonLabel: 'Changer la couleur du texte de navigation',
      bubbleTitle: 'Besoin d aide ?',
      bubbleSubtitle: 'Cliquez pour commencer la conversation',
      placement: {
        bottomLeft: 'En bas a gauche',
        bottomRight: 'En bas a droite'
      },
      navbarLabel: 'Masquer la navigation haute',
      navbarHidden: 'ACTIVE',
      navbarShown: 'DESACTIVE',
      navbarParamPurpose: 'Indique si la barre de navigation superieure est masquee. navbar=0 masque la navigation.',
      loadHistoryLabel: 'Charger l historique',
      loadHistoryEnabled: 'ACTIVE',
      loadHistoryDisabled: 'DESACTIVE',
      defaultColorLabel: 'Par defaut',
      defaultTextColorLabel: 'Par defaut',
      currentConfigTitle: 'Configuration actuelle',
      copyConfig: 'Copier le JSON de configuration',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'Demo d integration des utilisateurs d un systeme metier tiers',
      description: 'Transmettez les donnees utilisateur depuis votre systeme metier tiers, notamment visitorUid, nickname, avatar et d autres champs, afin que les agents identifient immediatement le visiteur courant et conservent le contexte metier.',
      switchUser: 'Changer d utilisateur',
      switchAnonymousUserLabel: 'Passer a l utilisateur anonyme',
      anonymousUserLabel: 'Utilisateur anonyme',
      anonymousUserHint: 'Mode de test anonyme : visitorUid, nickname, avatar et les autres champs utilisateur sont omis.',
      currentUserTitle: 'Utilisateur actuel du systeme metier',
      currentUserIdLabel: 'ID utilisateur',
      currentUserNicknameLabel: 'Pseudo',
      contactSupport: 'Contacter le support',
      inviteText: 'Bonjour, comment pouvons-nous vous aider ?',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: 'Voir la documentation d integration des utilisateurs d un systeme metier tiers',
        reactExample: 'Exemple React des utilisateurs d un systeme metier tiers',
        vueExample: 'Exemple Vue des utilisateurs d un systeme metier tiers'
      },
      controlPanel: {
        title: 'Panneau de controle Bytedesk',
        chatWindow: 'Controles de la fenetre de chat',
        button: 'Controles du bouton',
        bubble: 'Controles de la bulle',
        invite: 'Controles de l invitation'
      },
      urlGuideTitle: 'URL complete actuelle de la fenetre independante + usage des parametres',
      urlTemplateLabel: 'Modele URL generique',
      urlParamsTitle: 'Reference des parametres (pour /chat)',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail, 2 : bot)',
        'sid: ID du fil cible (groupe de travail/bot/agent)',
        'visitorUid: ID visiteur personnalise (recommande)',
        'nickname/avatar: profil du visiteur (optionnel)',
        'mobile/email/note: informations supplementaires du visiteur (optionnel)',
        'extra: champ d extension personnalise, passer une chaine JSON (optionnel)',
        'lang/mode: langue et mode de theme (optionnel)'
      ],
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      apiHintPrefix: 'Appels API :',
      users: {
        user1: 'Visiteur Xiao Ming',
        user2: 'Visiteur Xiao Hong',
        user3: 'Visiteur Xiao Li'
      }
    },
    goodsInfoDemo: {
      ...en.pages.goodsInfoDemo,
      title: 'Demo d integration des informations produit',
      description: 'Ajoutez les metadonnees produit a la session de chat afin que les agents puissent consulter le contexte sans quitter la console.',
      infoCardTitle: 'Details du produit',
      tagsLabel: 'Etiquettes',
      descriptionLabel: 'Description',
      priceLabel: 'Prix',
      contactSupport: 'Contacter le support',
      docLinks: {
        ...en.pages.goodsInfoDemo.docLinks,
        goodsDoc: 'Voir le guide des informations produit',
        reactExample: 'Exemple React des informations produit',
        vueExample: 'Exemple Vue des informations produit'
      },
      controlPanel: {
        title: 'Panneau de controle Bytedesk',
        chatWindow: 'Controles de la fenetre de chat'
      },
      urlGuideTitle: 'Usage URL + parametres',
      urlTemplateLabel: 'Modele URL generique',
      urlParamsTitle: 'Reference des parametres (pour /chat)',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail, 2 : bot)',
        'sid: ID du fil cible (groupe de travail/bot/agent)',
        'visitorUid: ID visiteur personnalise (optionnel)',
        'nickname/avatar: profil du visiteur (optionnel)',
        'goodsInfo: donnees produit sous forme de chaine JSON (recommande)',
        'extra: donnees d extension sous forme de chaine JSON (optionnel)',
        'lang/mode: langue et mode de theme (optionnel)'
      ],
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      payloadGuideTitle: 'Composition et conversion de goodsInfo',
      payloadObjectLabel: 'Etape 1 : objet metier',
      payloadJsonLabel: 'Etape 2 : chaine JSON (JSON.stringify)',
      payloadEncodedLabel: 'Etape 3 : valeur encodee pour URL (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Construisez d abord goodsInfo comme objet, puis serialisez-le avec JSON.stringify avant de le passer a chatConfig.',
        'Pour une integration URL directe, passez goodsInfo encode ; URLSearchParams dans le flux SDK l encode automatiquement.',
        'goodsInfo.extra est generalement une chaine JSON pour des champs supplementaires comme SKU et stock.',
        'Conservez les champs cles (uid/title/image/price) lorsque la charge utile est grande afin d eviter des URLs trop longues.'
      ],
      shopGoodsCardTitle: 'Boutique & Produits (liste compacte)',
      currentShopLabel: 'Boutique actuelle',
      consultGoodsBtn: 'Consulter ce produit',
      consultParamsLabel: 'Params de consultation',
      goodsPayloadCardTitle: 'Payload produit actuel',
      goodsStringifyHint: 'Comment convertir l objet produit en chaine et le passer a la config :',
      urlParamsCardTitle: 'Parametres URL actuels',
      standaloneUrlLabel: 'URL fenetre seule / nouvel onglet',
      paramNameCol: 'Nom du parametre',
      paramValueCol: 'Valeur actuelle',
      paramPurposeCol: 'Description',
      requiredLabel: 'Obligatoire',
      optionalLabel: 'Optionnel',
      goodsUrlHint: 'Comment ajouter les parametres produit a l URL :',
      urlParamPurposes: {
        org: 'Identifiant locataire (Org UID)',
        t: 'Type de session : t=0 un-a-un, t=1 groupe, t=2 bot',
        sid: 'UID agent / groupe / bot',
        visitorUid: 'Identifiant unique visiteur',
        nickname: 'Pseudo visiteur',
        avatar: 'URL avatar visiteur',
        goodsInfo: 'Infos produit (chaine JSON), inclut titre, image, prix, lien. Utiliser JSON.stringify avant de transmettre',
        extra: 'Params d extension personnalises (JSON)',
        lang: 'Langue de l interface',
        mode: 'Mode theme de couleur (light / dark / auto)',
      },
      product: {
        ...en.pages.goodsInfoDemo.product,
        title: 'BYD Yangwang U7 EV de luxe',
        description: 'Le Yangwang U7 utilise la derniere plateforme batterie Blade de BYD, avec jusqu a 1 000 km d autonomie, assistance L3 et interieur premium avec toit panoramique.',
        tags: ['Nouvelle energie', 'Berline de luxe', 'Conduite intelligente', 'Longue autonomie']
      }
    },
    orderInfoDemo: {
      ...en.pages.orderInfoDemo,
      title: 'Demo d integration des informations de commande',
      description: 'Integrez les details de commande dans chaque conversation afin d accelerer le support apres-vente et le diagnostic.',
      docLinks: {
        ...en.pages.orderInfoDemo.docLinks,
        orderDoc: 'Voir le guide des informations de commande',
        reactExample: 'Exemple React des informations de commande',
        vueExample: 'Exemple Vue des informations de commande'
      },
      sections: {
        statusTimeline: 'Statut de la commande',
        orderInfo: 'Details de la commande',
        goodsInfo: 'Resume du produit',
        shippingInfo: 'Informations de livraison'
      },
      labels: {
        ...en.pages.orderInfoDemo.labels,
        orderId: 'ID de commande',
        orderTime: 'Cree le',
        orderStatus: 'Statut',
        paymentMethod: 'Mode de paiement',
        totalAmount: 'Montant total',
        unitPrice: 'Prix unitaire',
        quantity: 'Quantite',
        receiver: 'Destinataire',
        phone: 'Telephone',
        address: 'Adresse'
      },
      statusText: {
        pending: 'Paiement en attente',
        paid: 'Payee',
        shipped: 'Expediee',
        delivered: 'Livree'
      },
      urlGuideTitle: 'Usage URL + parametres',
      urlTemplateLabel: 'Modele URL generique',
      urlParamsTitle: 'Reference des parametres (pour /chat)',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail, 2 : bot)',
        'sid: ID du fil cible (groupe de travail/bot/agent)',
        'visitorUid: ID visiteur personnalise (optionnel)',
        'nickname/avatar: profil du visiteur (optionnel)',
        'orderInfo: donnees de commande sous forme de chaine JSON (recommande)',
        'extra: donnees d extension sous forme de chaine JSON (optionnel)',
        'lang/mode: langue et mode de theme (optionnel)'
      ],
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      payloadGuideTitle: 'Composition et conversion de orderInfo',
      payloadObjectLabel: 'Etape 1 : objet metier',
      payloadJsonLabel: 'Etape 2 : chaine JSON (JSON.stringify)',
      payloadEncodedLabel: 'Etape 3 : valeur encodee pour URL (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Construisez d abord un objet commande complet, puis serialisez-le avec JSON.stringify avant de le passer a chatConfig.',
        'Pour une integration URL directe, passez orderInfo encode ; URLSearchParams dans le flux SDK l encode automatiquement.',
        'Conservez les champs essentiels dans orderInfo.goods et orderInfo.shippingAddress pour un contexte agent plus rapide.',
        'Utilisez des valeurs d enum stables pour status (par ex. paid/shipped) et gardez statusText pour le texte d affichage.'
      ]
    },
    vipLevelDemo: {
      ...en.pages.vipLevelDemo,
      title: 'Demo de personnalisation',
      description: 'Fournissez vipLevel et d autres champs personnalises pour afficher des profils client plus riches et offrir une assistance personnalisee.',
      vipLabel: 'Niveau VIP',
      normalLabel: 'Utilisateur standard',
      vipPrefix: 'VIP',
      docLinks: {
        ...en.pages.vipLevelDemo.docLinks,
        vipDoc: 'Voir le guide de personnalisation',
        reactExample: 'Source React du demo VIP',
        vueExample: 'Source Vue du demo VIP'
      },
      urlGuideTitle: 'Usage URL + parametres',
      urlTemplateLabel: 'Modele URL generique',
      urlParamsTitle: 'Reference des parametres',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail, 2 : bot)',
        'sid: ID du fil cible (groupe de travail/bot/agent)',
        'visitorUid: ID visiteur personnalise (recommande)',
        'nickname/avatar: profil du visiteur (optionnel)',
        'vipLevel: niveau VIP du visiteur (entier 0-10 recommande)',
        'extra: chaine JSON pour champs personnalises (optionnel)',
        'lang/mode: langue et mode de theme (optionnel)'
      ],
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      payloadGuideTitle: 'Composition et conversion de vipLevel',
      payloadObjectLabel: 'Etape 1 : objet metier',
      payloadJsonLabel: 'Etape 2 : chaine JSON (JSON.stringify)',
      payloadEncodedLabel: 'Etape 3 : valeur encodee pour URL (encodeURIComponent)',
      payloadNotesTitle: 'Notes',
      payloadNotes: [
        'Utilisez des niveaux entiers stables pour vipLevel (par ex. 0-10) afin de rester coherents avec la strategie de segmentation.',
        'Construisez extra comme objet, puis serialisez-le avec JSON.stringify avant de le passer a chatConfig.',
        'Pour une integration URL directe, passez extra encode ; URLSearchParams dans le flux SDK l encode automatiquement.',
        'Quand le niveau change, reinitialisez le widget ou actualisez les parametres du fil afin d appliquer le nouveau profil.'
      ]
    },
    unreadCountDemo: {
      ...en.pages.unreadCountDemo,
      title: 'Demo du compteur de non lus',
      description: 'Appelez getUnreadMessageCount et clearUnreadMessages pour rester synchronise avec l etat actuel de l utilisateur.',
      currentCount: 'Nombre actuel de non lus',
      docLinks: {
        ...en.pages.unreadCountDemo.docLinks,
        unreadDoc: 'Voir le guide d integration des non lus',
        reactExample: 'Exemple React du compteur de non lus',
        vueExample: 'Exemple Vue du compteur de non lus'
      },
      buttons: {
        ...en.pages.unreadCountDemo.buttons,
        markAllRead: 'Marquer tout comme lu',
        refresh: 'Actualiser le compteur de non lus'
      },
      usageNotesTitle: 'Conseils',
      usageNotes: [
        'Utilisez getUnreadMessageCount() chaque fois que vous avez besoin d un total a jour.',
        'Appelez clearUnreadMessages() une fois que le client a lu les messages.'
      ],
      urlGuideTitle: 'Usage URL API + parametres',
      countApiLabel: 'Endpoint du compteur de non lus (GET)',
      clearApiLabel: 'Endpoint de remise a zero (POST)',
      urlParamsTitle: 'Parametres partages (identiques au SDK)',
      urlParams: [
        'uid: UID visiteur systeme (depuis BYTEDESK_UID en local)',
        'visitorUid: UID visiteur personnalise depuis le frontend (optionnel, recommande)',
        'orgUid: ID de l organisation (depuis chatConfig.org)',
        'client: type de client (le SDK ajoute WEB_FLOAT automatiquement)'
      ],
      sampleUrlLabel: 'URL d exemple pour la requete de non lus',
      sampleBodyLabel: 'Exemple de corps POST pour effacer les non lus',
      apiNotesTitle: 'Notes d implementation',
      apiNotes: [
        'getUnreadMessageCount() correspond a GET /visitor/api/v1/message/unread/count.',
        'clearUnreadMessages() correspond a POST /visitor/api/v1/message/unread/clear.',
        'Le SDK lit BYTEDESK_UID depuis localStorage et le combine avec chatConfig.visitorUid/chatConfig.org.',
        'Quand uid est vide, getUnreadMessageCount() renvoie directement 0 sans envoyer de requete.'
      ]
    },
    threadHistoryDemo: {
      ...en.pages.threadHistoryDemo,
      title: 'Demo de l historique des conversations visiteur',
      description: 'Base sur la page ThreadList visiteur, ce demo ouvre /chat/thread depuis l icone du SDK pour charger les conversations historiques.',
      bubbleTitle: 'Historique des conversations',
      bubbleSubtitle: 'Cliquez pour ouvrir la liste de l historique',
      anonymousUserLabel: 'Utilisateur anonyme',
      anonymousUserHint: 'Mode de test anonyme : visitorUid, nickname et avatar sont omis.',
      pathAlert: 'Cette page active chatPath=/chat/thread. Cliquer sur l icone ouvre l historique au lieu de /chat.',
      currentPathLabel: 'Chemin d entree actuel',
      currentPathHint: 'Les autres parametres sont identiques a /chat',
      usageTitle: 'Notes du demo',
      usageNotes: [
        '1. Definissez chatPath sur /chat/thread afin que le clic sur l icone et showChat() ouvrent tous deux l historique.',
        '2. /chat/thread accepte les memes parametres que /chat, comme org, t, sid, visitorUid, nickname et avatar.',
        '3. Vous pouvez aussi integrer directement via URL + query params sans appel SDK supplementaire.'
      ],
      buttons: {
        openHistoryPage: 'Ouvrir la page d historique',
        switchAnonymousUser: 'Passer a l utilisateur anonyme'
      },
      urlGuideTitle: 'Usage URL + parametres',
      urlTemplateLabel: 'Modele URL generique',
      urlParamsTitle: 'Reference des parametres (identiques a /chat)',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail, 2 : bot)',
        'sid: ID du fil cible (groupe de travail/bot/agent)',
        'visitorUid: ID visiteur personnalise (recommande)',
        'nickname/avatar: profil du visiteur (optionnel)',
        'lang/mode: langue et mode de theme (optionnel)'
      ],
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      docLinks: {
        ...en.pages.threadHistoryDemo.docLinks,
        threadDoc: 'Voir le guide d integration de l historique',
        visitorRef: 'Reference Visitor ThreadList',
        reactExample: 'Source React de l historique'
      }
    },
    callCenterDemo: {
      ...en.pages.callCenterDemo,
      title: 'Demo du centre d appels',
      description: 'Demontre comment router les utilisateurs vers un groupe centre d appels en changeant sid tout en gardant le chemin de chat standard.',
      bubbleTitle: 'Centre d appels',
      bubbleSubtitle: 'File d attente et transfert prets',
      anonymousUserHint: 'Mode de test anonyme : visitorUid, nickname et avatar sont omis.',
      pathAlert: 'Cette page conserve chatPath=/chat et cible un sid de centre d appels pour simuler l acces a la file depuis l entree web.',
      currentPathLabel: 'Chemin d entree actuel',
      currentPathHint: 'Le chemin reste /call ; la file depend de chatConfig.sid.',
      usageTitle: 'Notes du demo',
      usageNotes: [
        '1. Configurez sid avec l ID de votre groupe centre d appels afin que toutes les sessions entrent dans la meme file.',
        '2. Utilisez differentes valeurs de visitorUid pour simuler plusieurs utilisateurs en file d attente.',
        '3. En production, liez sid a la ligne metier (ventes, support, apres-vente) afin d ameliorer le routage.'
      ],
      buttons: {
        openCallCenter: 'Ouvrir le centre d appels',
        switchAnonymousUser: 'Passer a l utilisateur anonyme'
      },
      urlGuideTitle: 'Usage URL + parametres',
      sampleUrlLabel: 'URL d exemple generee depuis la configuration actuelle',
      docLinks: {
        ...en.pages.callCenterDemo.docLinks,
        reactDoc: 'Voir la documentation React',
        vueDoc: 'Voir la documentation Vue',
        reactExample: 'Source React du centre d appels'
      },
      runtime: {
        ...en.pages.callCenterDemo.runtime,
        title: 'Panneau runtime',
        description: 'Simulez les etats de connexion, file, attribution et cloture pour valider rapidement le flux d entree du centre d appels.',
        statusLabels: {
          sdkReady: 'Etat du SDK',
          queueState: 'Etat de la file',
          activeSessionCount: 'Sessions actives',
          lastActionAt: 'Derniere action'
        },
        statusValues: {
          ready: 'Pret',
          notReady: 'Non pret'
        },
        queueState: {
          idle: 'Inactif',
          queueing: 'En file',
          serving: 'En cours de service'
        },
        buttons: {
          openQueue: 'Ouvrir l entree de file',
          simulateAssign: 'Simuler l attribution d un agent',
          completeSession: 'Terminer la session en cours',
          clearLogs: 'Effacer les journaux'
        },
        logTitle: 'Journal d activite',
        emptyLogs: 'Aucune activite pour le moment. Essayez les actions rapides ci-dessus.',
        logTemplates: {
          switchedAnonymous: 'Passage en mode anonyme.',
          switchedUser: 'Visiteur change : {{name}}.',
          openQueue: 'Entree centre d appels ouverte, passage en file d attente.',
          closeQueue: 'Panneau de chat ferme.',
          assignSession: 'Attribution simulee. La session est maintenant en service.',
          completeSession: 'Service termine et session fermee.'
        }
      }
    },
    webrtcDemo: {
      ...en.pages.webrtcDemo,
      title: 'Demo agent audio / video',
      description: 'Utilisez le bouton flottant en bas a droite pour tester le service client audio ou video temps reel avec WebRTC.',
      modeLimitNotice: 'Le mode robot n est pas encore pris en charge. Seuls l agent audio humain et l agent video humain sont disponibles.',
      pathAlert: 'Le bouton flottant utilise par defaut le mode audio (audio=1&video=0). Utilisez les boutons ci-dessous pour passer en mode video.',
      currentPathLabel: 'Chemin d entree',
      currentPathHint: 'Le chemin est toujours /webrtc ; le type d appel est controle par les parametres audio et video.',
      anonymousUserHint: 'Mode de test anonyme : visitorUid, nickname et avatar sont omis.',
      callMode: 'Mode d appel actuel',
      callModeAudio: '🎙️ Agent audio (audio=1, video=0)',
      callModeVideo: '📹 Agent video (audio=1, video=1)',
      bubbleTitleAudio: 'Agent audio',
      bubbleTitleVideo: 'Agent video',
      bubbleSubtitleAudio: 'Cliquez pour demarrer un appel audio',
      bubbleSubtitleVideo: 'Cliquez pour demarrer un appel video',
      docLinks: {
        ...en.pages.webrtcDemo.docLinks,
        reactDoc: 'Voir la documentation React WebRTC',
        vueDoc: 'Voir la documentation Vue WebRTC',
        reactExample: 'Source React du demo WebRTC'
      },
      usageTitle: 'Notes du demo',
      usageNotes: [
        '1. Le bouton ou la bulle flottante en bas a droite constitue l entree WebRTC ; cliquer dessus ouvre /webrtc dans une fenetre integree.',
        '2. Agent audio (audio=1&video=0) : micro et haut-parleur uniquement, sans camera.',
        '3. Agent video (audio=1&video=1) : camera et micro actives.',
        '4. En production, l URL CDN https://cdn.weiyuai.cn/webrtc est utilisee par defaut ; en local cela pointe vers http://127.0.0.1:9018/webrtc.',
        '5. org, t et sid utilisent les memes valeurs que l integration chat ; aucune configuration supplementaire n est requise.'
      ],
      buttons: {
        audioMode: '🎙️ Passer a l agent audio',
        videoMode: '📹 Passer a l agent video',
        switchAnonymousUser: 'Passer a l utilisateur anonyme'
      },
      urlGuideTitle: 'Reference URL + parametres',
      sampleUrlLabel: 'URL d exemple pour la configuration actuelle',
      urlParamsTitle: 'Reference des parametres',
      urlParams: [
        'org: ID de l organisation (obligatoire)',
        't: type de session (0 : un a un, 1 : groupe de travail)',
        'sid: ID agent / groupe de travail (obligatoire)',
        'audio: activer l audio (1 = actif, 0 = inactif)',
        'video: activer la video (1 = actif, 0 = inactif)',
        'lang: langue (zh-cn, en, etc.)',
        'visitorUid: ID visiteur personnalise (optionnel)',
        'nickname / avatar: profil du visiteur (optionnel)'
      ]
    },
    documentFeedbackDemo: {
      ...en.pages.documentFeedbackDemo,
      title: 'Demo de retour sur document',
      subtitle: 'Invitez les lecteurs a surligner du texte, capturer automatiquement des captures d ecran et envoyer un retour structure sans quitter la page.',
      setupStepsTitle: 'Checklist de demarrage rapide',
      docLinks: {
        ...en.pages.documentFeedbackDemo.docLinks,
        reactDoc: 'Voir le guide d integration React',
        vueDoc: 'Voir le guide d integration Vue',
        reactExample: 'Voir le code source de ce demo React'
      },
      setupSteps: [
        'Installez le SDK et preparez un objet BytedeskConfig.',
        'Activez la fonction de retour sur document via feedbackConfig.',
        'Rendez <BytedeskReact {...config} /> dans votre application.',
        'Selectionnez n importe quel paragraphe ci-dessous pour ouvrir le tooltip flottant de feedback.'
      ],
      highlightsTitle: 'Fonctionnement du retour sur document',
      highlights: [
        'Selectionnez du texte pour faire apparaitre un bouton flottant de “Retour sur document” qui conserve la selection.',
        'Le SDK capture automatiquement une capture d ecran afin que les agents voient le meme contexte que l utilisateur.',
        'Les categories et placeholders aident l utilisateur a fournir des details exploitables.'
      ],
      controlPanel: {
        ...en.pages.documentFeedbackDemo.controlPanel,
        title: 'Panneau de depannage',
        buttons: {
          forceInit: 'Forcer l initialisation du feedback',
          manualTrigger: 'Declencher le feedback manuellement',
          testSelection: 'Tester le tooltip de selection',
          statusCheck: 'Executer la verification d etat',
          clearLogs: 'Effacer les journaux de feedback',
          inspectState: 'Inspecter l etat runtime'
        },
        statusLabel: 'Statut d initialisation',
        initialized: 'Pret',
        initializing: 'En attente du SDK...'
      },
      exampleSection: {
        ...en.pages.documentFeedbackDemo.exampleSection,
        title: 'Article de demonstration',
        paragraphs: [
          'BytedeskWeb regroupe chat en direct, bots et retour sur document dans un widget leger. Les utilisateurs peuvent surligner des phrases precises, envoyer des captures et continuer leur lecture sans rechargement.',
          'Le tooltip flottant respecte les themes clair/sombre et prend en charge icones, textes et modes de declenchement personnalises. Il convient parfaitement aux portails documentaires, bases de connaissances et longues pages marketing.',
          'Chaque envoi comprend le texte selectionne, les coordonnees, les categories et des captures optionnelles afin que les equipes support et documentation resolvent les problemes plus vite.'
        ],
        tip: 'Essayez de surligner n importe quel passage ci-dessus pour voir le tooltip en action.'
      },
      logs: {
        ...en.pages.documentFeedbackDemo.logs,
        title: 'Journaux de feedback',
        empty: 'Aucun feedback pour le moment. Surlignez le contenu ou utilisez le bouton de declenchement manuel pour generer un exemple.',
        selectedText: 'Texte selectionne',
        categories: 'Categories',
        feedback: 'Feedback'
      },
      feedbackConfigText: {
        selectionText: 'Retour sur document',
        dialogTitle: 'Retour sur document',
        placeholder: 'Decrivez en detail le probleme ou l idee d amelioration.',
        submitText: 'Envoyer le feedback',
        cancelText: 'Annuler',
        successMessage: 'Merci. Nous examinerons votre retour rapidement.',
        categoryNames: [
          'Faute de frappe ou probleme de traduction',
          'Lien casse',
          'La documentation ne correspond pas au produit',
          'Difficile a comprendre',
          'Autres suggestions'
        ],
        typesSectionTitle: 'Types de probleme',
        typesDescription: '(choix multiple)'
      },
      manualTriggerMessage: 'Ce feedback a ete declenche manuellement pour verifier le flux.',
      testSelectionText: 'Texte exemple selectionne',
      tooltipFallbackText: 'Tooltip de feedback de test',
      alerts: {
        missingInstance: 'Instance BytedeskWeb introuvable. Veuillez d abord initialiser le widget.',
        showFeedbackMissing: 'showDocumentFeedback est indisponible sur l instance actuelle.',
        retryTimeout: 'Delai depasse en attendant l initialisation de BytedeskWeb. Rechargez la page puis reessayez.',
        forceInitSuccess: 'La fonction feedback a ete initialisee. Vous pouvez commencer les tests.',
        forceInitFailed: 'L initialisation forcee a echoue. Consultez la console pour plus de details.',
        statusReportTitle: 'Etat de la fonctionnalite',
        statusReportFooter: 'Ouvrez la console du navigateur pour un journal detaille.',
        available: 'Disponible',
        missing: 'Manquant',
        statusLabels: {
          bytedeskInstance: 'Instance BytedeskWeb',
          html2canvas: 'Bibliotheque html2canvas',
          feedbackFunction: 'API de retour sur document',
          feedbackEnabled: 'FeedbackConfig active',
          tooltipElement: 'Element tooltip',
          dialogElement: 'Element dialogue',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: 'Visibilite du tooltip',
          currentSelection: 'Selection actuelle'
        }
      }
    },
    onlineDemo: {
      ...en.pages.onlineDemo,
      title: 'Demo SDK en ligne',
      description: 'Cet exemple charge le package npm publie, active l invitation, les bulles et le feedback, et expose des boutons de controle rapide.',
      docLinksTitle: 'Liens de documentation',
      feedbackSectionTitle: 'Parcours du retour sur document',
      usageTitle: 'Comment l essayer',
      usageSteps: [
        'Surlignez n importe quelle phrase ci-dessous.',
        'Un tooltip flottant intitule “Retour sur document” apparait pres du curseur.',
        'Cliquez sur le tooltip pour ouvrir la boite de dialogue, verifier le texte selectionne et envoyer votre note.'
      ],
      exampleParagraphs: [
        'BytedeskWeb associe chat en direct, bots et retour sur document contextuel pour fermer la boucle entre documentation et support.',
        'Les selections capturent automatiquement des captures d ecran afin que l equipe support voie exactement le contexte utilisateur.',
        'Utilisez les boutons ci-dessous pour afficher ou masquer les elements de l interface de chat ou declencher manuellement le retour sur document.'
      ],
      manualTriggerButton: 'Declencher le retour sur document',
      manualTriggerMessage: 'Charge utile de feedback exemple declenchee depuis le demo en ligne.',
      controlPanelTitle: 'Panneau de controle',
      controlPanelDescription: 'Appelez les utilitaires SDK courants pour afficher ou masquer les elements de l interface de chat et verifier le comportement du theme.'
    }
  },
  components: {
    ...en.components,
    installGuide: {
      ...en.components.installGuide,
      title: 'Guide d installation',
      sections: {
        ...en.components.installGuide.sections,
        installDeps: {
          ...en.components.installGuide.sections.installDeps,
          title: '1. Installer les dependances'
        },
        importComponent: {
          ...en.components.installGuide.sections.importComponent,
          title: '2. Importer le composant'
        },
        config: {
          ...en.components.installGuide.sections.config,
          title: '3. Configurer les parametres',
          minimalTitle: 'Configuration minimale (obligatoire)',
          minimalNote: 'org, t et sid sont obligatoires. Remplacez-les par vos propres identifiants d organisation et de routage.',
          fullTitle: 'Configuration complete (optionnelle)'
        },
        usage: {
          ...en.components.installGuide.sections.usage,
          title: '4. Utiliser le composant'
        },
        methods: {
          ...en.components.installGuide.sections.methods,
          title: '5. Methodes disponibles',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: 'Afficher le bouton flottant' },
            { code: '(window as any).bytedesk?.hideButton()', description: 'Masquer le bouton flottant' },
            { code: '(window as any).bytedesk?.showBubble()', description: 'Afficher le message bulle' },
            { code: '(window as any).bytedesk?.hideBubble()', description: 'Masquer le message bulle' },
            { code: '(window as any).bytedesk?.showChat()', description: 'Ouvrir la fenetre de chat' },
            { code: '(window as any).bytedesk?.hideChat()', description: 'Fermer la fenetre de chat' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: 'Afficher la boite d invitation' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: 'Masquer la boite d invitation' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: 'Ouvrir la boite de retour sur document (nouveau)' }
          ]
        },
        feedback: {
          ...en.components.installGuide.sections.feedback,
          title: '6. Apercu du retour sur document',
          intro: 'Le retour sur document permet aux utilisateurs de surligner des extraits sur n importe quelle page, de capturer automatiquement une capture d ecran et d envoyer une demande contextualisee.',
          bullets: [
            'Detecte automatiquement les selections de texte et affiche un tooltip “Retour sur document”.',
            'Capture l ecran courant avec html2canvas afin d apporter un contexte visuel.',
            'Enregistre la selection exacte afin que les developpeurs aillent directement au probleme.',
            'Prend en charge le declenchement par selection, boutons manuels ou les deux.',
            'Expose des hooks onSubmit/onCancel afin de transmettre les donnees a votre propre backend.'
          ],
          tip: 'Installez html2canvas pour activer les captures d ecran automatiques :'
        }
      }
    }
  }
};