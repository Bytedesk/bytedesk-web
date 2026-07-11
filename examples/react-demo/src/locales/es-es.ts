import { en } from './en';

const basicDemoFieldDocs = {
  isDebug: 'Activa los registros de depuración durante el desarrollo.',
  forceRefresh: 'Fuerza la recarga de la página de chat o del iframe para comprobar problemas de caché.',
  apiUrl: 'Dirección raíz de la API usada para inicializar visitantes, no leídos y comentarios.',
  htmlUrl: 'Dirección raíz del sitio de chat. El tipo de página se separa con rutas específicas.',
  chatPath: 'Ruta de la página de chat de texto.',
  threadPath: 'Ruta de la página de historial de conversación.',
  webrtcPath: 'Ruta de la página de audio o video.',
  callPath: 'Ruta de la página del centro de llamadas.',
  locale: 'Idioma de la interfaz y también se envía al parámetro lang de la URL de chat.',
  placement: 'Posición fija del botón y de la ventana de chat.',
  marginBottom: 'Separación respecto al borde inferior en px.',
  marginSide: 'Separación respecto al borde izquierdo o derecho en px.',
  autoPopup: 'Abre automáticamente la ventana de chat después de inicializar.',
  autoPopupDelay: 'Retraso antes de la apertura automática.',
  draggable: 'Permite arrastrar el botón de entrada.',
  tabsConfig: 'Controla la visibilidad de las pestañas messages, thread y help.',
  bubbleConfig: 'Configura la burbuja de aviso sobre la entrada.',
  buttonConfig: 'Configuración para un único botón de entrada.',
  buttonsConfig: 'Lista de múltiples botones de entrada con prioridad sobre buttonConfig.',
  inviteConfig: 'Configura la invitación emergente, sus tiempos y callbacks.',
  theme: 'Configuración de tema y colores.',
  animation: 'Configuración de animación al mostrar u ocultar la ventana de chat.',
  window: 'Tamaño de la ventana de chat en escritorio.',
  onInit: 'Callback que se ejecuta tras completar la inicialización del SDK.',
  onShowChat: 'Se ejecuta cuando se muestra la ventana de chat.',
  onHideChat: 'Se ejecuta cuando se oculta la ventana de chat.',
  onMessage: 'Se ejecuta al recibir mensajes del iframe o del SDK.',
  onConfigChange: 'Se ejecuta después de un cambio de configuración.',
  onVisitorInfo: 'Devuelve uid y visitorUid tras inicializar al visitante.',
  'theme.mode': 'Modo de tema: light, dark o system.',
  'theme.textColor': 'Color del texto del botón o del módulo.',
  'theme.backgroundColor': 'Color principal de fondo del botón o la navegación.',
  'bubble.show': 'Indica si se muestra la burbuja sobre la entrada.',
  'bubble.icon': 'Icono predeterminado de una burbuja simple.',
  'bubble.title': 'Título de una burbuja simple.',
  'bubble.subtitle': 'Subtítulo de una burbuja simple.',
  'bubble.messages': 'Lista de varias burbujas; tiene prioridad sobre la configuración simple.',
  'bubble.autoRotate': 'Indica si rota automáticamente varias burbujas.',
  'bubble.rotateInterval': 'Intervalo de rotación de las burbujas.',
  'bubble.switchMode': 'Modo de cambio: fade, slide-up o ticker.',
  'button.show': 'Indica si se muestra este botón.',
  'button.icon': 'Icono del botón.',
  'button.text': 'Texto del botón. En una entrada circular única puede omitirse.',
  'button.width': 'Ancho del botón.',
  'button.height': 'Alto del botón.',
  'button.action': 'Tipo de acción integrada: chat, thread, webrtc o call.',
  'button.previewImageUrl': 'Imagen mostrada al pasar el cursor, útil para códigos QR.',
  'button.previewImageAlt': 'Texto mostrado debajo de la imagen de vista previa.',
  'button.onClick': 'Manejo personalizado del clic que sustituye la acción predeterminada.',
  'invite.show': 'Indica si se activa la invitación emergente.',
  'invite.text': 'Texto de la invitación.',
  'invite.icon': 'Icono de la invitación.',
  'invite.delay': 'Retraso antes de la primera aparición.',
  'invite.loop': 'Indica si la invitación se repite.',
  'invite.loopDelay': 'Tiempo entre repeticiones.',
  'invite.loopCount': 'Número máximo de repeticiones.',
  'invite.acceptText': 'Texto del botón de aceptar.',
  'invite.rejectText': 'Texto del botón de rechazar.',
  'invite.onAccept': 'Se ejecuta cuando el usuario acepta.',
  'invite.onReject': 'Se ejecuta cuando el usuario rechaza.',
  'invite.onClose': 'Se ejecuta cuando la invitación se cierra.',
  'invite.onOpen': 'Se ejecuta cuando la invitación se abre.',
  'chat.org': 'ID de la organización, obligatorio.',
  'chat.t': 'Tipo de conversación, obligatorio. t=0 significa atención uno a uno, t=1 significa grupo de trabajo y t=2 significa robot.',
  'chat.sid': 'ID de destino de la conversación, obligatorio.',
  'chat.uid': 'ID interno de usuario normalmente gestionado por el SDK.',
  'chat.visitorUid': 'Identificador único del visitante del lado del negocio.',
  'chat.nickname': 'Apodo del visitante.',
  'chat.avatar': 'URL del avatar del visitante.',
  'chat.mobile': 'Teléfono móvil del visitante.',
  'chat.email': 'Correo electrónico del visitante.',
  'chat.note': 'Nota visible para el equipo de soporte.',
  'chat.channel': 'Canal de procedencia.',
  'chat.goodsInfo': 'Información del producto.',
  'chat.orderInfo': 'Información del pedido.',
  'chat.extra': 'Campos extra, normalmente en JSON.',
  'chat.vipLevel': 'Nivel de miembro.',
  'chat.debug': 'Bandera de negocio para diferenciar pruebas y producción.',
  'chat.draft': 'Bandera de despliegue gradual transmitida como draft=1 en la URL.',
  'chat.settingsUid': 'ID único usado para depurar configuración.',
  'chat.loadHistory': 'Indica si se carga el historial de mensajes. loadHistory=1 carga el historial de chat de forma predeterminada al abrir la pagina.',
  'chat.threadDetail': 'Indica si se muestra el boton de detalle de la conversacion. threadDetail=1 lo muestra; por defecto esta oculto.',
  'chat.visitorProfile': 'Indica si se muestra el boton de perfil del visitante. visitorProfile=1 lo muestra; por defecto esta oculto.',
  'chat.custom': 'Se pueden seguir añadiendo campos de negocio al URL de chat.',
  'browse.referrer': 'Dirección de la página de origen.',
  'browse.url': 'Dirección de la página actual.',
  'browse.title': 'Título de la página actual.',
  'browse.custom': 'Puede incluir información adicional como el ID de página.',
  'feedback.enabled': 'Indica si se habilita la función de comentarios del documento.',
  'feedback.trigger': 'Modo de activación: selection, button o both.',
  'feedback.showOnSelection': 'Indica si se muestra el acceso al seleccionar texto.',
  'feedback.selectionText': 'Texto de ayuda al seleccionar contenido.',
  'feedback.buttonText': 'Etiqueta fija del botón de comentarios.',
  'feedback.dialogTitle': 'Título del cuadro de comentarios.',
  'feedback.placeholder': 'Placeholder del campo de comentarios.',
  'feedback.submitText': 'Etiqueta del botón de envío.',
  'feedback.cancelText': 'Etiqueta del botón de cancelar.',
  'feedback.successMessage': 'Mensaje mostrado tras un envío correcto.',
  'feedback.categoryNames': 'Lista de categorías de problema.',
  'feedback.requiredTypes': 'Indica si se exige seleccionar al menos una categoría.',
  'feedback.typesSectionTitle': 'Título del área de categorías.',
  'feedback.typesDescription': 'Descripción adicional del área de categorías.',
  'feedback.submitScreenshot': 'Indica si se envía también una captura de pantalla.',
  'feedback.onSubmit': 'Flujo personalizado de envío.',
  'feedback.onCancel': 'Se ejecuta al cancelar el comentario.',
  'animation.enabled': 'Indica si se activa la animación de la ventana de chat.',
  'animation.duration': 'Duración de la animación.',
  'animation.type': 'Tipo de easing.',
  'window.width': 'Ancho de la ventana de chat en escritorio.',
  'window.height': 'Alto de la ventana de chat en escritorio.',
  'tabs.messages': 'Indica si se muestra la pestaña messages.',
  'tabs.thread': 'Indica si se muestra la pestaña de historial thread.',
  'tabs.help': 'Indica si se muestra la pestaña help.',
} as const;

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
      'th-th': 'ไทย'
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
    proactiveDemo: {
      ...en.pages.proactiveDemo,
      title: 'Demo de captacion proactiva',
      description: 'Esta pagina conecta el flujo de trabajo predeterminado y, al abrir el chat, entra directamente en el filtrado educativo, la confirmacion de necesidad y la recopilacion de contacto.',
      tags: {
        mobileValidation: 'Validacion de movil',
        multiTurnQa: 'Dialogo multinivel'
      },
      alertTitle: 'Ruta de validacion',
      alertDescription: 'Al entrar en la conversacion, el flujo recopila primero nivel educativo e intencion y despues solicita ciudad, escenario de consulta y movil. El formulario no se enviara si el numero no coincide con un movil continental chino de 11 digitos. Cada apertura fuerza un nuevo hilo de workflow.',
      workflowCardTitle: 'Flujo proactivo predeterminado',
      workflowCardTag: 'Filtro educativo + confirmacion de necesidad + recopilacion de contacto',
      bubbleTitle: 'Captacion proactiva',
      bubbleSubtitle: 'Demo de captacion del workflow predeterminado',
      buttons: {
        openWorkflowChat: 'Abrir chat del workflow',
        closeChat: 'Cerrar ventana de chat'
      },
      urlParamsTitle: 'Parametros URL del workflow',
      urlDescription: 'La URL completa de la ventana independiente cambia segun locale, modo de tema e identidad del visitante. forceNewThread se conserva en el ejemplo del SDK porque solo se usa al abrir el workflow desde el SDK para garantizar un hilo nuevo.',
      urlParams: [
        'org: identificador unico de la organizacion propietaria del workflow',
        't: tipo de sesion; 17 indica una sesion de workflow',
        'sid: identificador unico del workflow que decide cual abrir por defecto',
        'lang: idioma de la conversacion segun el locale actual de la demo',
        'mode: modo de tema segun la configuracion clara u oscura actual',
        'navbar: control de visibilidad de la barra superior; 1 significa visible',
        'visitorUid: identificador unico del visitante para vincular historial en modo identificado',
        'nickname: apodo del visitante enviado a la pagina de chat en modo identificado',
        'avatar: URL del avatar usada para mostrarlo en modo identificado'
      ],
      embedCodeTitle: 'Codigo de integracion actual',
      embedCodeDescription: 'El codigo de integracion siguiente coincide con la configuracion real de esta pagina y puede copiarse directamente como entrada fija de captacion.'
    },
    voiceAgentDemo: {
      ...en.pages.voiceAgentDemo,
      title: 'Demo del asistente de voz'
    },
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
      draggableLabel: 'Botón/barra arrastrable',
      navbarHidden: 'ACTIVADO',
      navbarShown: 'DESACTIVADO',
      navbarParamPurpose: 'Indica si se oculta la barra de navegacion superior. navbar=0 oculta la navegacion.',
      qrCodeParamLabel: 'Mostrar boton QR',
      threadDetailParamLabel: 'Mostrar boton de detalle',
      visitorProfileParamLabel: 'Mostrar boton de perfil',
      loadHistoryLabel: 'Cargar historial',
      loadHistoryEnabled: 'ACTIVADO',
      loadHistoryDisabled: 'DESACTIVADO',
      defaultColorLabel: 'Predeterminado',
      defaultTextColorLabel: 'Predeterminado',
      currentConfigTitle: 'Configuracion actual',
      copyConfig: 'Copiar JSON de configuracion',
      fieldDocs: basicDemoFieldDocs
    },
    userInfoDemo: {
      ...en.pages.userInfoDemo,
      title: 'Demo de integracion de usuarios del sistema de negocio de terceros',
      description: 'Pasa los datos del usuario desde tu sistema de negocio de terceros, incluidos visitorUid, nickname, avatar y otros campos, para que los agentes identifiquen al visitante actual al instante y mantengan el contexto del negocio.',
      switchUser: 'Cambiar usuario',
      switchAnonymousUserLabel: 'Cambiar a usuario anonimo',
      anonymousUserLabel: 'Usuario anonimo',
      anonymousUserHint: 'Modo de prueba anonimo: se omiten visitorUid, nickname, avatar y otros datos del usuario.',
      currentUserTitle: 'Usuario actual del sistema de negocio',
      currentUserIdLabel: 'ID de usuario',
      currentUidLabel: 'uid',
      currentVisitorUidLabel: 'visitorUid',
      currentUserNicknameLabel: 'Apodo',
      contactSupport: 'Contactar soporte',
      inviteText: 'Hola, en que podemos ayudarte?',
      docLinks: {
        ...en.pages.userInfoDemo.docLinks,
        userInfoDoc: 'Ver documentacion de integracion de usuarios del sistema de negocio de terceros',
        reactExample: 'Ejemplo React de usuarios del sistema de negocio de terceros',
        vueExample: 'Ejemplo Vue de usuarios del sistema de negocio de terceros'
      },
      controlPanel: {
        title: 'Panel de control Bytedesk',
        chatWindow: 'Controles de ventana de chat',
        button: 'Controles del boton',
        bubble: 'Controles de la burbuja',
        invite: 'Controles de invitacion'
      },
      urlGuideTitle: 'URL completa actual de la ventana independiente + uso de parametros',
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
        user1: 'Usuario Xiao Ming',
        user2: 'Usuario Xiao Hong',
        user3: 'Usuario Xiao Mei'
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
        ...en.pages.unreadCountDemo.buttons,
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
    ticketDemo: {
      ...en.pages.ticketDemo,
      title: 'Demo de tickets del visitante',
      description: 'Muestra como dirigir la entrada del SDK Web de Bytedesk a las rutas de historial, creacion, estado, detalle y notificaciones de visitorTicket para escenarios embebidos con iframe.',
      bubbleTitle: 'Centro de tickets',
      bubbleSubtitle: 'Abrir rutas de tickets del visitante',
      currentPathLabel: 'Ruta de entrada actual',
      currentPathHint: 'La entrada flotante cambia entre rutas /ticket y conserva org, sid, visitante, idioma y tema en la query.',
      selectedScenarioTitle: 'Escenarios de ticket',
      detailTicketIdLabel: 'ID del ticket para la ruta de detalle',
      detailTicketIdPlaceholder: 'Introduce un UID real para abrir automaticamente el panel de detalle',
      usageTitle: 'Notas del demo',
      buttons: {
        closeTicket: 'Cerrar ventana de tickets'
      },
      docLinks: {
        ...en.pages.ticketDemo.docLinks,
        visitorTicketRef: 'Ver implementacion de rutas de visitorTicket',
        reactExample: 'Codigo fuente del demo React de tickets'
      }
    },
    ratingDemo: {
      ...en.pages.ratingDemo,
      title: 'Demo de valoracion del visitante',
      description: 'Muestra como entrar en el flujo de valoracion desde el historial de conversaciones. Tanto la valoracion pendiente como la valoracion de seguimiento reutilizan /chat/thread.',
      bubbleTitle: 'Valoracion del servicio',
      bubbleSubtitle: 'Abrir historiales relacionados con la valoracion'
    },
    platformDemo: {
      ...en.pages.platformDemo,
      title: 'Demo de soporte de plataforma',
      description: 'Explica como usar orgUid=df_org_uid como atencion al cliente de plataforma y tratar los demas orgUid como tiendas. Cada organizacion puede tener varias entradas, como preventa y postventa.',
      bubbleTitle: 'Soporte de plataforma',
      bubbleSubtitle: 'Cambiar entre entradas de plataforma y tienda'
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