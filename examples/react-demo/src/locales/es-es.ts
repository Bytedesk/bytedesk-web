import { en } from './en';

export const esEs = {
  ...en,
  common: {
    ...en.common,
    languageLabel: 'Idioma',
    languageOptions: {
      en: 'English',
      'zh-cn': 'Chino simplificado',
      'zh-tw': 'Chino tradicional',
      'ja-jp': 'Japones',
      'ko-kr': 'Coreano',
      'vi-vn': 'Tiếng Việt',
      'ms-my': 'Bahasa Melayu',
      'es-es': 'Español',
      'fr-fr': 'Francés',
      'th-th': 'Tailandés (Tailandia)'
    },
    themeLabel: 'Modo de tema',
    themeOptions: {
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema'
    },
    officialSiteLabel: 'Sitio oficial de Bytedesk',
    resetAnonymousVisitorLabel: 'Restablecer visitante anonimo',
    resetAnonymousVisitorSuccess: 'Visitante anonimo restablecido',
    docLinks: {
      ...en.common.docLinks,
      react: 'Ver documentacion de integracion React',
      vue: 'Ver documentacion de integracion Vue',
      reactExample: 'Ejemplo base de React',
      vueExample: 'Ejemplo base de Vue',
      userInfo: 'Ver documentacion de integracion de usuario',
      goodsInfo: 'Ver documentacion de integracion de producto',
      orderInfo: 'Ver documentacion de integracion de pedido',
      vipLevel: 'Ver documentacion de personalizacion',
      unreadCount: 'Ejemplo React de mensajes no leidos',
      documentFeedback: 'Guia de comentarios de documentos'
    },
    buttons: {
      ...en.common.buttons,
      openChat: 'Abrir chat',
      openChatWithParams: 'Abrir chat con parametros',
      closeChat: 'Cerrar chat',
      showButton: 'Mostrar boton',
      hideButton: 'Ocultar boton',
      showBubble: 'Mostrar burbuja',
      hideBubble: 'Ocultar burbuja',
      showInvite: 'Mostrar invitacion',
      hideInvite: 'Ocultar invitacion',
      togglePlacement: 'Cambiar posicion',
      toggleThemeColor: 'Cambiar color del tema',
      reset: 'Restablecer',
      copy: 'Copiar',
      submit: 'Enviar',
      cancel: 'Cancelar',
      openInNewWindow: 'Abrir en ventana emergente',
      openInNewTab: 'Abrir en nueva pestaña'
    },
    apiHintPrefix: 'Llamadas API:'
  },
  nav: {
    ...en.nav,
    more: 'Mas',
    basicDemo: '⚙️ Configuracion basica',
    userInfoDemo: '👤 Informacion del usuario',
    goodsInfoDemo: '🛒 Informacion del producto',
    orderInfoDemo: '📦 Informacion del pedido',
    vipLevelDemo: '👑 Personalizacion',
    unreadCountDemo: '🔔 No leidos',
    threadHistoryDemo: '🧵 Historial de conversaciones',
    webrtcDemo: '📹 Demo WebRTC',
    callCenterDemo: '📞 Centro de llamadas',
    proactiveDemo: '🎯 Captacion proactiva',
    videoConferenceDemo: '🎬 Videoconferencia',
    documentFeedbackDemo: '📝 Comentarios del documento',
    flightBookingDemo: '✈️ Reserva de vuelos'
  },
  pages: {
    ...en.pages,
    basicDemo: {
      ...en.pages.basicDemo,
      title: 'Configuracion basica de Bytedesk',
      intro: 'Usa las acciones rapidas de abajo para probar las funciones comunes del SDK Web de Bytedesk.',
      themeButtonLabel: 'Cambiar color de navegacion',
      themeTextButtonLabel: 'Cambiar color del texto de navegacion',
      bubbleTitle: 'Necesitas ayuda?',
      bubbleSubtitle: 'Haz clic para iniciar el chat',
      placement: {
        bottomLeft: 'Abajo a la izquierda',
        bottomRight: 'Abajo a la derecha'
      },
      navbarLabel: 'Ocultar navegacion superior',
      navbarHidden: 'ACTIVADO',
      navbarShown: 'DESACTIVADO',
      navbarParamPurpose: 'Indica si se oculta la barra de navegacion superior. navbar=0 oculta la navegacion.',
      loadHistoryLabel: 'Cargar historial',
      loadHistoryEnabled: 'ACTIVADO',
      loadHistoryDisabled: 'DESACTIVADO',
      defaultColorLabel: 'Predeterminado',
      defaultTextColorLabel: 'Predeterminado',
      currentConfigTitle: 'Configuracion actual',
      copyConfig: 'Copiar JSON de configuracion'
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'Demo de integracion de informacion del usuario',
      description: 'Pasa visitorUid, nickname, avatar y otros datos por config para que los agentes reconozcan al usuario al instante.',
      switchUser: 'Cambiar usuario',
      switchAnonymousUserLabel: 'Cambiar a usuario anonimo',
      anonymousUserLabel: 'Usuario anonimo',
      anonymousUserHint: 'Modo de prueba anonimo: se omiten visitorUid, nickname, avatar y otros datos del usuario.',
      currentUserTitle: 'Usuario actual',
      currentUserIdLabel: 'ID de usuario',
      currentUserNicknameLabel: 'Apodo',
      contactSupport: 'Contactar soporte',
      inviteText: 'Hola, en que podemos ayudarte?',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: 'Ver documentacion de integracion de usuario',
        reactExample: 'Ejemplo React de informacion de usuario',
        vueExample: 'Ejemplo Vue de informacion de usuario'
      },
      controlPanel: {
        title: 'Panel de control Bytedesk',
        chatWindow: 'Controles de ventana de chat',
        button: 'Controles del boton',
        bubble: 'Controles de la burbuja',
        invite: 'Controles de invitacion'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      urlTemplateLabel: 'Plantilla generica de URL',
      urlParamsTitle: 'Referencia de parametros (para /chat)',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo, 2: bot)',
        'sid: ID del hilo objetivo (grupo de trabajo/bot/agente)',
        'visitorUid: ID personalizado del visitante (recomendado)',
        'nickname/avatar: perfil del visitante (opcional)',
        'mobile/email/note: informacion adicional del visitante (opcional)',
        'extra: campo de extension personalizado, pasar cadena JSON (opcional)',
        'lang/mode: idioma y modo de tema (opcional)'
      ],
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      apiHintPrefix: 'Llamadas API:',
      users: {
        user1: 'Visitante Xiao Ming',
        user2: 'Visitante Xiao Hong',
        user3: 'Visitante Xiao Li'
      }
    },
    goodsInfoDemo: {
      ...en.pages.goodsInfoDemo,
      title: 'Demo de integracion de informacion del producto',
      description: 'Adjunta metadatos del producto a la sesion de chat para que los agentes revisen el contexto sin salir de la consola.',
      infoCardTitle: 'Detalles del producto',
      tagsLabel: 'Etiquetas',
      descriptionLabel: 'Descripcion',
      priceLabel: 'Precio',
      contactSupport: 'Contactar soporte',
      docLinks: {
        ...en.pages.goodsInfoDemo.docLinks,
        goodsDoc: 'Ver guia de informacion del producto',
        reactExample: 'Ejemplo React de informacion del producto',
        vueExample: 'Ejemplo Vue de informacion del producto'
      },
      controlPanel: {
        title: 'Panel de control Bytedesk',
        chatWindow: 'Controles de ventana de chat'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      urlTemplateLabel: 'Plantilla generica de URL',
      urlParamsTitle: 'Referencia de parametros (para /chat)',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo, 2: bot)',
        'sid: ID del hilo objetivo (grupo de trabajo/bot/agente)',
        'visitorUid: ID personalizado del visitante (opcional)',
        'nickname/avatar: perfil del visitante (opcional)',
        'goodsInfo: datos del producto como cadena JSON (recomendado)',
        'extra: datos de extension como cadena JSON (opcional)',
        'lang/mode: idioma y modo de tema (opcional)'
      ],
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      payloadGuideTitle: 'Composicion y conversion de goodsInfo',
      payloadObjectLabel: 'Paso 1: objeto de negocio',
      payloadJsonLabel: 'Paso 2: cadena JSON (JSON.stringify)',
      payloadEncodedLabel: 'Paso 3: valor codificado para URL (encodeURIComponent)',
      payloadNotesTitle: 'Notas',
      payloadNotes: [
        'Construye goodsInfo primero como objeto y luego serializalo con JSON.stringify antes de pasarlo a chatConfig.',
        'Para integracion directa por URL, pasa goodsInfo codificado; URLSearchParams en el flujo del SDK lo codifica automaticamente.',
        'goodsInfo.extra suele ser una cadena JSON para campos adicionales como SKU y stock.',
        'Conserva los campos clave (uid/title/image/price) cuando el payload sea grande para evitar URLs demasiado largas.'
      ],
      product: {
        ...en.pages.goodsInfoDemo.product,
        title: 'BYD Yangwang U7 EV de lujo',
        description: 'El Yangwang U7 usa la ultima plataforma de bateria blade de BYD, con hasta 1.000 km de autonomia, asistencia L3 y un interior premium con techo panoramico.',
        tags: ['Nueva energia', 'Sedan de lujo', 'Conduccion inteligente', 'Largo alcance']
      }
    },
    orderInfoDemo: {
      ...en.pages.orderInfoDemo,
      title: 'Demo de integracion de informacion del pedido',
      description: 'Inserta los detalles del pedido en cada conversacion para acelerar el soporte posventa y el diagnostico.',
      docLinks: {
        ...en.pages.orderInfoDemo.docLinks,
        orderDoc: 'Ver guia de informacion del pedido',
        reactExample: 'Ejemplo React de informacion del pedido',
        vueExample: 'Ejemplo Vue de informacion del pedido'
      },
      sections: {
        statusTimeline: 'Estado del pedido',
        orderInfo: 'Detalles del pedido',
        goodsInfo: 'Resumen del producto',
        shippingInfo: 'Informacion de envio'
      },
      labels: {
        ...en.pages.orderInfoDemo.labels,
        orderId: 'ID del pedido',
        orderTime: 'Creado el',
        orderStatus: 'Estado',
        paymentMethod: 'Metodo de pago',
        totalAmount: 'Importe total',
        unitPrice: 'Precio unitario',
        quantity: 'Cantidad',
        receiver: 'Destinatario',
        phone: 'Telefono',
        address: 'Direccion'
      },
      statusText: {
        pending: 'Pago pendiente',
        paid: 'Pagado',
        shipped: 'Enviado',
        delivered: 'Entregado'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      urlTemplateLabel: 'Plantilla generica de URL',
      urlParamsTitle: 'Referencia de parametros (para /chat)',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo, 2: bot)',
        'sid: ID del hilo objetivo (grupo de trabajo/bot/agente)',
        'visitorUid: ID personalizado del visitante (opcional)',
        'nickname/avatar: perfil del visitante (opcional)',
        'orderInfo: datos del pedido como cadena JSON (recomendado)',
        'extra: datos de extension como cadena JSON (opcional)',
        'lang/mode: idioma y modo de tema (opcional)'
      ],
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      payloadGuideTitle: 'Composicion y conversion de orderInfo',
      payloadObjectLabel: 'Paso 1: objeto de negocio',
      payloadJsonLabel: 'Paso 2: cadena JSON (JSON.stringify)',
      payloadEncodedLabel: 'Paso 3: valor codificado para URL (encodeURIComponent)',
      payloadNotesTitle: 'Notas',
      payloadNotes: [
        'Construye primero un objeto de pedido completo y luego serializalo con JSON.stringify antes de pasarlo a chatConfig.',
        'Para integracion directa por URL, pasa orderInfo codificado; URLSearchParams en el flujo del SDK lo codifica automaticamente.',
        'Conserva los campos esenciales en orderInfo.goods y orderInfo.shippingAddress para dar contexto rapido al agente.',
        'Usa valores de enum estables para status (por ejemplo paid/shipped) y reserva statusText para mostrar el texto.'
      ]
    },
    vipLevelDemo: {
      ...en.pages.vipLevelDemo,
      title: 'Demo de personalizacion',
      description: 'Proporciona vipLevel y otros campos personalizados para mostrar perfiles mas ricos y experiencias de soporte personalizadas.',
      vipLabel: 'Nivel VIP',
      normalLabel: 'Usuario estandar',
      vipPrefix: 'VIP',
      docLinks: {
        ...en.pages.vipLevelDemo.docLinks,
        vipDoc: 'Ver guia de personalizacion',
        reactExample: 'Codigo fuente React del demo VIP',
        vueExample: 'Codigo fuente Vue del demo VIP'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      urlTemplateLabel: 'Plantilla generica de URL',
      urlParamsTitle: 'Referencia de parametros',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo, 2: bot)',
        'sid: ID del hilo objetivo (grupo de trabajo/bot/agente)',
        'visitorUid: ID personalizado del visitante (recomendado)',
        'nickname/avatar: perfil del visitante (opcional)',
        'vipLevel: nivel VIP del visitante (se recomienda entero 0-10)',
        'extra: cadena JSON para campos personalizados (opcional)',
        'lang/mode: idioma y modo de tema (opcional)'
      ],
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      payloadGuideTitle: 'Composicion y conversion de vipLevel',
      payloadObjectLabel: 'Paso 1: objeto de negocio',
      payloadJsonLabel: 'Paso 2: cadena JSON (JSON.stringify)',
      payloadEncodedLabel: 'Paso 3: valor codificado para URL (encodeURIComponent)',
      payloadNotesTitle: 'Notas',
      payloadNotes: [
        'Usa niveles enteros estables para vipLevel (como 0-10) para alinearlo con la estrategia de segmentacion.',
        'Construye extra como objeto y luego serializalo con JSON.stringify antes de pasarlo a chatConfig.',
        'Para integracion directa por URL, pasa extra codificado; URLSearchParams en el flujo del SDK lo codifica automaticamente.',
        'Cuando cambie el nivel, vuelve a inicializar el widget o refresca los parametros del hilo para aplicar el nuevo perfil.'
      ]
    },
    unreadCountDemo: {
      ...en.pages.unreadCountDemo,
      title: 'Demo de contador de no leidos',
      description: 'Llama a getUnreadMessageCount y clearUnreadMessages para mantenerte sincronizado con el estado actual del usuario.',
      currentCount: 'Cantidad actual no leida',
      docLinks: {
        ...en.pages.unreadCountDemo.docLinks,
        unreadDoc: 'Ver guia de integracion de no leidos',
        reactExample: 'Ejemplo React de contador de no leidos',
        vueExample: 'Ejemplo Vue de contador de no leidos'
      },
      buttons: {
        markAllRead: 'Marcar todo como leido',
        refresh: 'Actualizar cantidad no leida'
      },
      usageNotesTitle: 'Consejos',
      usageNotes: [
        'Usa getUnreadMessageCount() siempre que necesites un total actualizado.',
        'Llama a clearUnreadMessages() despues de que el cliente lea los mensajes.'
      ],
      urlGuideTitle: 'Uso de URL API + parametros',
      countApiLabel: 'Endpoint de cantidad no leida (GET)',
      clearApiLabel: 'Endpoint para limpiar no leidos (POST)',
      urlParamsTitle: 'Parametros compartidos (igual que en el SDK)',
      urlParams: [
        'uid: UID del visitante del sistema (desde BYTEDESK_UID local)',
        'visitorUid: UID personalizado del visitante desde el frontend (opcional, recomendado)',
        'orgUid: ID de la organizacion (desde chatConfig.org)',
        'client: tipo de cliente (el SDK agrega WEB_FLOAT automaticamente)'
      ],
      sampleUrlLabel: 'URL de ejemplo para la consulta de no leidos',
      sampleBodyLabel: 'Cuerpo POST de ejemplo para limpiar no leidos',
      apiNotesTitle: 'Notas de implementacion',
      apiNotes: [
        'getUnreadMessageCount() corresponde a GET /visitor/api/v1/message/unread/count.',
        'clearUnreadMessages() corresponde a POST /visitor/api/v1/message/unread/clear.',
        'El SDK lee BYTEDESK_UID de localStorage y lo combina con chatConfig.visitorUid/chatConfig.org.',
        'Cuando uid esta vacio, getUnreadMessageCount() devuelve 0 directamente sin enviar solicitud.'
      ]
    },
    threadHistoryDemo: {
      ...en.pages.threadHistoryDemo,
      title: 'Demo de historial de conversaciones del visitante',
      description: 'Basado en la pagina ThreadList del visitante, este demo abre /chat/thread desde el icono del SDK para cargar conversaciones historicas.',
      bubbleTitle: 'Historial de conversaciones',
      bubbleSubtitle: 'Haz clic para abrir la lista del historial',
      anonymousUserLabel: 'Usuario anonimo',
      anonymousUserHint: 'Modo de prueba anonimo: se omiten visitorUid, nickname y avatar.',
      pathAlert: 'Esta pagina habilita chatPath=/chat/thread. Al hacer clic en el icono se abre el historial en lugar de /chat.',
      currentPathLabel: 'Ruta de entrada actual',
      currentPathHint: 'Los demas parametros son iguales que en /chat',
      usageTitle: 'Notas del demo',
      usageNotes: [
        '1. Configura chatPath en /chat/thread para que al hacer clic en el icono y en showChat() se abra el historial.',
        '2. /chat/thread acepta los mismos parametros que /chat, como org, t, sid, visitorUid, nickname y avatar.',
        '3. Tambien puedes integrar directamente con URL + query params sin llamadas extra al SDK.'
      ],
      buttons: {
        openHistoryPage: 'Abrir pagina del historial',
        switchAnonymousUser: 'Cambiar a usuario anonimo'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      urlTemplateLabel: 'Plantilla generica de URL',
      urlParamsTitle: 'Referencia de parametros (igual que /chat)',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo, 2: bot)',
        'sid: ID del hilo objetivo (grupo de trabajo/bot/agente)',
        'visitorUid: ID personalizado del visitante (recomendado)',
        'nickname/avatar: perfil del visitante (opcional)',
        'lang/mode: idioma y modo de tema (opcional)'
      ],
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      docLinks: {
        ...en.pages.threadHistoryDemo.docLinks,
        threadDoc: 'Ver guia de integracion del historial',
        visitorRef: 'Referencia Visitor ThreadList',
        reactExample: 'Codigo fuente React del historial'
      }
    },
    callCenterDemo: {
      ...en.pages.callCenterDemo,
      title: 'Demo de centro de llamadas',
      description: 'Demuestra como enrutar usuarios a un grupo de trabajo de call center cambiando sid y manteniendo la ruta de chat estandar.',
      bubbleTitle: 'Centro de llamadas',
      bubbleSubtitle: 'Cola y transferencia listas',
      anonymousUserHint: 'Modo de prueba anonimo: se omiten visitorUid, nickname y avatar.',
      pathAlert: 'Esta pagina mantiene chatPath=/chat y apunta a un sid de call center para simular el acceso a la cola desde la entrada web.',
      currentPathLabel: 'Ruta de entrada actual',
      currentPathHint: 'La ruta sigue siendo /call; la cola la determina chatConfig.sid.',
      usageTitle: 'Notas del demo',
      usageNotes: [
        '1. Configura sid con el ID de tu grupo de call center para que todas las sesiones entren en la misma cola.',
        '2. Usa distintos visitorUid para simular varios usuarios concurrentes en cola.',
        '3. En produccion, vincula sid por linea de negocio (ventas, soporte, posventa) para mejorar el enrutamiento.'
      ],
      buttons: {
        openCallCenter: 'Abrir centro de llamadas',
        switchAnonymousUser: 'Cambiar a usuario anonimo'
      },
      urlGuideTitle: 'Uso de URL + parametros',
      sampleUrlLabel: 'URL de ejemplo generada desde la configuracion actual',
      docLinks: {
        ...en.pages.callCenterDemo.docLinks,
        reactDoc: 'Ver documentacion React',
        vueDoc: 'Ver documentacion Vue',
        reactExample: 'Codigo fuente React del centro de llamadas'
      },
      runtime: {
        ...en.pages.callCenterDemo.runtime,
        title: 'Panel de ejecucion',
        description: 'Simula estados de conexion, cola, asignacion y cierre para validar rapidamente el flujo de entrada del call center.',
        statusLabels: {
          sdkReady: 'Estado del SDK',
          queueState: 'Estado de la cola',
          activeSessionCount: 'Sesiones activas',
          lastActionAt: 'Ultima accion'
        },
        statusValues: {
          ready: 'Listo',
          notReady: 'No listo'
        },
        queueState: {
          idle: 'Inactivo',
          queueing: 'En cola',
          serving: 'Atendiendo'
        },
        buttons: {
          openQueue: 'Abrir entrada de cola',
          simulateAssign: 'Simular asignacion de agente',
          completeSession: 'Completar sesion actual',
          clearLogs: 'Limpiar registros'
        },
        logTitle: 'Registros de actividad',
        emptyLogs: 'Sin actividad todavia. Prueba las acciones rapidas de arriba.',
        logTemplates: {
          switchedAnonymous: 'Se cambio al modo anonimo.',
          switchedUser: 'Se cambio el visitante: {{name}}.',
          openQueue: 'Se abrio la entrada del call center y el estado paso a en cola.',
          closeQueue: 'Se cerro el panel de chat.',
          assignSession: 'Se simulo la asignacion. La sesion esta en atencion.',
          completeSession: 'Servicio completado y sesion cerrada.'
        }
      }
    },
    webrtcDemo: {
      ...en.pages.webrtcDemo,
      title: 'Demo de agente de audio / video',
      description: 'Usa el boton flotante en la esquina inferior derecha para probar el servicio de audio o video en tiempo real con WebRTC.',
      modeLimitNotice: 'El modo robot aun no es compatible. Solo se admiten agente humano de audio y agente humano de video.',
      pathAlert: 'El boton flotante usa por defecto el modo audio (audio=1&video=0). Usa los botones inferiores para cambiar al modo video.',
      currentPathLabel: 'Ruta de entrada',
      currentPathHint: 'La ruta siempre es /webrtc; el tipo de llamada lo controlan los parametros audio y video.',
      anonymousUserHint: 'Modo de prueba anonimo: se omiten visitorUid, nickname y avatar.',
      callMode: 'Modo de llamada actual',
      callModeAudio: '🎙️ Agente de audio (audio=1, video=0)',
      callModeVideo: '📹 Agente de video (audio=1, video=1)',
      bubbleTitleAudio: 'Agente de audio',
      bubbleTitleVideo: 'Agente de video',
      bubbleSubtitleAudio: 'Haz clic para iniciar llamada de audio',
      bubbleSubtitleVideo: 'Haz clic para iniciar llamada de video',
      docLinks: {
        ...en.pages.webrtcDemo.docLinks,
        reactDoc: 'Ver documentacion React de WebRTC',
        vueDoc: 'Ver documentacion Vue de WebRTC',
        reactExample: 'Codigo fuente React del demo WebRTC'
      },
      usageTitle: 'Notas del demo',
      usageNotes: [
        '1. El boton flotante o burbuja en la esquina inferior derecha es la entrada de WebRTC; al pulsarlo se abre /webrtc en una ventana embebida.',
        '2. Agente de audio (audio=1&video=0): solo microfono y altavoz, sin camara.',
        '3. Agente de video (audio=1&video=1): camara y microfono habilitados.',
        '4. En produccion se usa por defecto https://cdn.weiyuai.cn/webrtc; en local apunta a http://127.0.0.1:9018/webrtc.',
        '5. org, t y sid comparten los mismos valores que la integracion de chat; no hace falta configuracion extra.'
      ],
      buttons: {
        audioMode: '🎙️ Cambiar a agente de audio',
        videoMode: '📹 Cambiar a agente de video',
        switchAnonymousUser: 'Cambiar a usuario anonimo'
      },
      urlGuideTitle: 'Referencia de URL + parametros',
      sampleUrlLabel: 'URL de ejemplo para la configuracion actual',
      urlParamsTitle: 'Referencia de parametros',
      urlParams: [
        'org: ID de la organizacion (obligatorio)',
        't: tipo de sesion (0: uno a uno, 1: grupo de trabajo)',
        'sid: ID del agente o grupo de trabajo (obligatorio)',
        'audio: activar audio (1 = activo, 0 = inactivo)',
        'video: activar video (1 = activo, 0 = inactivo)',
        'lang: idioma (zh-cn, en, etc.)',
        'visitorUid: ID personalizado del visitante (opcional)',
        'nickname / avatar: perfil del visitante (opcional)'
      ]
    },
    documentFeedbackDemo: {
      ...en.pages.documentFeedbackDemo,
      title: 'Demo de comentarios del documento',
      subtitle: 'Invita a los lectores a resaltar texto, capturar pantallas automaticamente y enviar comentarios estructurados sin salir de la pagina.',
      setupStepsTitle: 'Lista rapida de inicio',
      docLinks: {
        ...en.pages.documentFeedbackDemo.docLinks,
        reactDoc: 'Ver guia de integracion React',
        vueDoc: 'Ver guia de integracion Vue',
        reactExample: 'Ver el codigo fuente de este demo React'
      },
      setupSteps: [
        'Instala el SDK y prepara un objeto BytedeskConfig.',
        'Activa la funcion de feedback documental mediante feedbackConfig.',
        'Renderiza <BytedeskReact {...config} /> dentro de tu aplicacion.',
        'Selecciona cualquier parrafo de abajo para abrir el tooltip flotante de feedback.'
      ],
      highlightsTitle: 'Como funciona el feedback del documento',
      highlights: [
        'Selecciona texto para mostrar un boton flotante de “Feedback del documento” que conserva la seleccion.',
        'El SDK captura automaticamente una imagen para que los agentes vean el mismo contexto que el usuario.',
        'Las categorias y placeholders ayudan al usuario a dejar detalles accionables.'
      ],
      controlPanel: {
        ...en.pages.documentFeedbackDemo.controlPanel,
        title: 'Panel de solucion de problemas',
        buttons: {
          forceInit: 'Forzar inicializacion del feedback',
          manualTrigger: 'Disparar feedback manualmente',
          testSelection: 'Probar tooltip de seleccion',
          statusCheck: 'Ejecutar comprobacion de estado',
          clearLogs: 'Limpiar registros de feedback',
          inspectState: 'Inspeccionar estado en tiempo real'
        },
        statusLabel: 'Estado de inicializacion',
        initialized: 'Listo',
        initializing: 'Esperando al SDK...'
      },
      exampleSection: {
        ...en.pages.documentFeedbackDemo.exampleSection,
        title: 'Articulo de demostracion',
        paragraphs: [
          'BytedeskWeb integra chat en vivo, bots y feedback documental en un widget ligero. Los usuarios pueden resaltar frases concretas, enviar capturas y seguir leyendo sin recargar.',
          'El tooltip flotante respeta los temas claro/oscuro y admite iconos, textos y modos de disparo personalizados. Es ideal para portales de documentacion, bases de conocimiento y paginas largas.',
          'Cada envio incluye el texto seleccionado, coordenadas, categorias y capturas opcionales para que soporte y documentacion resuelvan incidencias mas rapido.'
        ],
        tip: 'Prueba a resaltar cualquier pasaje de arriba para ver el tooltip en accion.'
      },
      logs: {
        ...en.pages.documentFeedbackDemo.logs,
        title: 'Registros de feedback',
        empty: 'Aun no hay feedback. Resalta contenido o usa el boton de activacion manual para generar datos de ejemplo.',
        selectedText: 'Texto seleccionado',
        categories: 'Categorias',
        feedback: 'Feedback'
      },
      feedbackConfigText: {
        selectionText: 'Feedback del documento',
        dialogTitle: 'Feedback del documento',
        placeholder: 'Describe con detalle el problema o la mejora sugerida.',
        submitText: 'Enviar feedback',
        cancelText: 'Cancelar',
        successMessage: 'Gracias. Revisaremos tu feedback en breve.',
        categoryNames: [
          'Error tipografico o de traduccion',
          'Enlace roto',
          'La documentacion no coincide con el producto',
          'Dificil de entender',
          'Otras sugerencias'
        ],
        typesSectionTitle: 'Tipos de incidencia',
        typesDescription: '(seleccion multiple)'
      },
      manualTriggerMessage: 'Este feedback se disparo manualmente para verificar el flujo.',
      testSelectionText: 'Texto de prueba seleccionado',
      tooltipFallbackText: 'Tooltip de feedback de prueba',
      alerts: {
        missingInstance: 'No se encontro la instancia de BytedeskWeb. Inicializa primero el widget.',
        showFeedbackMissing: 'showDocumentFeedback no esta disponible en la instancia actual.',
        retryTimeout: 'Se agoto el tiempo esperando a que BytedeskWeb se inicializara. Recarga la pagina y vuelve a intentarlo.',
        forceInitSuccess: 'La funcion de feedback se inicializo correctamente. Ya puedes probarla.',
        forceInitFailed: 'La inicializacion forzada fallo. Revisa la consola para mas detalles.',
        statusReportTitle: 'Estado de la funcion',
        statusReportFooter: 'Abre la consola del navegador para ver el log detallado.',
        available: 'Disponible',
        missing: 'No disponible',
        statusLabels: {
          bytedeskInstance: 'Instancia de BytedeskWeb',
          html2canvas: 'Libreria html2canvas',
          feedbackFunction: 'API de feedback documental',
          feedbackEnabled: 'FeedbackConfig habilitado',
          tooltipElement: 'Elemento tooltip',
          dialogElement: 'Elemento dialogo',
          selectedText: 'selectedText',
          lastSelection: 'lastSelectionText',
          tooltipVisible: 'Visibilidad del tooltip',
          currentSelection: 'Seleccion actual'
        }
      }
    },
    onlineDemo: {
      ...en.pages.onlineDemo,
      title: 'Demo SDK en linea',
      description: 'Este ejemplo carga el paquete npm publicado, habilita invitaciones, burbujas y feedback, y expone botones de control rapido.',
      docLinksTitle: 'Enlaces de documentacion',
      feedbackSectionTitle: 'Recorrido de feedback del documento',
      usageTitle: 'Como probarlo',
      usageSteps: [
        'Resalta cualquier frase de abajo.',
        'Cerca del cursor aparecera un tooltip flotante llamado “Feedback del documento”.',
        'Haz clic en el tooltip para abrir el dialogo, revisar el texto seleccionado y enviar tu nota.'
      ],
      exampleParagraphs: [
        'BytedeskWeb combina chat en vivo, bots y feedback documental contextual para cerrar el ciclo entre documentacion y soporte.',
        'Las selecciones capturan automaticamente una imagen para que el equipo de soporte vea el contexto exacto.',
        'Usa los botones de abajo para alternar elementos de la interfaz del chat o activar manualmente el feedback.'
      ],
      manualTriggerButton: 'Activar feedback del documento',
      manualTriggerMessage: 'Carga de feedback de ejemplo activada desde el demo en linea.',
      controlPanelTitle: 'Panel de control',
      controlPanelDescription: 'Llama a las utilidades comunes del SDK para alternar elementos de la interfaz de chat y verificar el comportamiento del tema.'
    }
  },
  components: {
    ...en.components,
    installGuide: {
      ...en.components.installGuide,
      title: 'Guia de instalacion',
      sections: {
        ...en.components.installGuide.sections,
        installDeps: {
          ...en.components.installGuide.sections.installDeps,
          title: '1. Instalar dependencias'
        },
        importComponent: {
          ...en.components.installGuide.sections.importComponent,
          title: '2. Importar el componente'
        },
        config: {
          ...en.components.installGuide.sections.config,
          title: '3. Configurar parametros',
          minimalTitle: 'Configuracion minima (obligatoria)',
          minimalNote: 'org, t y sid son obligatorios. Sustituyelos por tus propios IDs de organizacion y enrutamiento.',
          fullTitle: 'Configuracion completa (opcional)'
        },
        usage: {
          ...en.components.installGuide.sections.usage,
          title: '4. Usar el componente'
        },
        methods: {
          ...en.components.installGuide.sections.methods,
          title: '5. Metodos disponibles',
          list: [
            { code: '(window as any).bytedesk?.showButton()', description: 'Mostrar el boton flotante' },
            { code: '(window as any).bytedesk?.hideButton()', description: 'Ocultar el boton flotante' },
            { code: '(window as any).bytedesk?.showBubble()', description: 'Mostrar el mensaje de burbuja' },
            { code: '(window as any).bytedesk?.hideBubble()', description: 'Ocultar el mensaje de burbuja' },
            { code: '(window as any).bytedesk?.showChat()', description: 'Abrir la ventana de chat' },
            { code: '(window as any).bytedesk?.hideChat()', description: 'Cerrar la ventana de chat' },
            { code: '(window as any).bytedesk?.showInviteDialog()', description: 'Mostrar el cuadro de invitacion' },
            { code: '(window as any).bytedesk?.hideInviteDialog()', description: 'Ocultar el cuadro de invitacion' },
            { code: '(window as any).bytedesk?.showDocumentFeedback(selectedText?)', description: 'Abrir el cuadro de feedback del documento (nuevo)' }
          ]
        },
        feedback: {
          ...en.components.installGuide.sections.feedback,
          title: '6. Resumen de feedback del documento',
          intro: 'El feedback del documento permite a los usuarios resaltar fragmentos en cualquier pagina, capturar una pantalla automaticamente y enviar solicitudes con contexto.',
          bullets: [
            'Detecta automaticamente la seleccion de texto y muestra un tooltip de “Feedback del documento”.',
            'Captura la pantalla actual con html2canvas para proporcionar contexto visual.',
            'Registra la seleccion exacta para que los desarrolladores vayan directo al problema.',
            'Admite disparo por seleccion de texto, botones manuales o ambos.',
            'Expone hooks onSubmit/onCancel para que puedas reenviar los datos a tu propio backend.'
          ],
          tip: 'Instala html2canvas para habilitar capturas automaticas:'
        }
      }
    }
  }
};