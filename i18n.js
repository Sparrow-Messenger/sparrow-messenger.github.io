export const TRANSLATIONS = {
  en: {
    pageTitle: "Sparrow — Your messages stay private",
    metaDescription:
      "A private messenger for Android. Messages are protected on your phone and delivered by servers run by different communities.",
    nav: {
      features: "What Sparrow does",
      transport: "How it works",
      docs: "Documentation",
      home: "Sparrow Home",
      mainNavigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      languageSwitch: "Language switch",
      toggleNavigation: "Toggle navigation",
      howItWorks: "How it works",
      preview: "Introduction",
      contribute: "Contribute",
      github: "GitHub"
    },
    hero: {
      title: "Your messages stay private.",
      logoAria: "Sparrow logo",
      subtitle:
        "Sparrow protects your messages on your phone before they’re sent. Independent communities can help deliver them, so one company doesn’t have to run the whole service.",
      ctaBeta: "Request beta access",
      ctaHowItWorks: "See how messages travel",
      ctaGithub: "View on GitHub",
      ctaVideo: "Watch product video",
      replayBtn: "Replay flight",
      sendHint: "Click the Sparrow logo",
      pillCrypto: "Messages protected on your phone",
      pillOnion: "Several stops along the way",
      pillFederated: "Run by different communities",
      stack: {
        crypto: "Protected on your phone",
        onion: "Passed through several stops",
        mailboxes: "Waits in the recipient’s inbox",
        kotlin: "Android app"
      }
    },
    about: {
      eyebrow: "What is Sparrow?",
      title: "Encrypted messaging without one mandatory server",
      lead:
        "Mainstream encrypted messengers pair strong encryption with a single provider-operated backend. Sparrow keeps encryption strictly on your device and splits the infrastructure into independent Control Planes and community-run nodes.",
      statusTitle: "Honest Beta Status",
      statusText:
        "Sparrow 1.0.0-beta.1 is an experimental public beta for Android (API 29+). iOS source sets exist in Kotlin Multiplatform, but iOS is not a usable target yet. Sparrow has not yet completed an independent third-party security audit.",
      cards: [
        {
          title: "Client-Side Cryptography",
          desc: "Direct chats use libsodium sealed boxes and Ed25519 signatures; groups use XChaCha20-Poly1305-IETF with epoch key rotation and SHA-256 safety numbers."
        },
        {
          title: "Onion Circuits & Decoys",
          desc: "Every mailbox request wraps in layers and travels through 1–5 relays of distinct operators (default 2) with 1–3 parallel circuits and optional decoy envelopes."
        },
        {
          title: "Offline Mailboxes, Zero Push",
          desc: "No Google/Apple push service required. Recipients fetch encrypted, size-padded envelopes (1–256 KiB classes) from capability-protected mailboxes through their circuits."
        },
        {
          title: "Direct & Group Chats",
          desc: "Replies, edits, deletions, reactions, typing indicators, encrypted attachments (photo, video, file, location, contact), and verified QR identity exchange."
        },
        {
          title: "Polls, Expenses & SEPA",
          desc: "Group polls with optional anonymity and expiry, shared expense boards with on-device receipt OCR, node-cached exchange rates, and EPC/SEPA QR settle-up."
        },
        {
          title: "Local Intelligence & Lock",
          desc: "Local Whisper voice transcription, optional on-device semantic search and safety analysis, encrypted identity backups, and device-owner app lock."
        }
      ],
      compareTitle: "Where Sparrow differs",
      compareRows: [
        {
          label: "Trust Model",
          value: "Multiple Control Planes + independent Community Nodes with automatic client failover."
        },
        {
          label: "Metadata Protection",
          value: "Home node sees IP but not destination; middle relays see only next hop; mailbox never sees your IP."
        },
        {
          label: "Not a Tor Replacement",
          value: "Relay count is still small and operators self-declare. Do not expect Tor-level anonymity against global observers."
        }
      ],
      docsLink: "Read “What makes Sparrow different?”"
    },
    comm: {
      eyebrow: "02 / How it works",
      title: "Your message is protected before it leaves your phone.",
      lead:
        "Your phone locks each message before sending it. Servers pass it along without reading it, and it waits in the recipient’s inbox until they’re ready.",
      hopsLabel: "Stops:",
      relayHops: "Number of stops",
      decoysLabel: "Send extra messages for privacy",
      play: "Play",
      pause: "Pause",
      canvasLabels: {
        you: "You",
        homeNode: "First stop",
        relay: "Next stop",
        mailbox: "Recipient’s inbox",
        controlPlane: "Server list",
        community: "Community",
        decoy: "Extra message",
        layersRemaining: "Stops left",
        e2eeLocked: "Message stays locked"
      },
      steps: [
        {
          title: "01. Protect your message",
          desc: "Your phone locks the message so only people in the chat can read it."
        },
        {
          title: "02. Pass it along",
          desc: "The computers that pass it along can’t read what it says."
        },
        {
          title: "03. Wait in their inbox",
          desc: "The recipient can collect it when they’re ready."
        },
        {
          title: "04. Find another route",
          desc: "If one of those computers isn’t available, Sparrow can use another way."
        }
      ],
      docsLink: "Learn more about how messages travel"
    },
    hosting: {
      title: "Help run a Sparrow server",
      lead:
        "If you know your way around setting up computers, you can run a server that forwards messages. Each independently run server gives the network another place to deliver messages. This is optional; most people can use Sparrow on Android without running one.",
      cloneTitle: "Get the server files",
      configureTitle: "Set up your server",
      buildTitle: "Start the server",
      verifyTitle: "Check that it’s working",
      terminal: "Commands",
      configureNoteBefore: "Copy ",
      configureNoteMiddle: " to ",
      configureNoteAfter: " and enter the web address for your server. The secure connection will be set up automatically.",
      buildNote: "This starts the programs that deliver messages and keep the connection secure.",
      verifyNoteBefore: "If everything is working, you’ll see ",
      verifyNoteAfter: ". That means your server is responding.",
      docsLink: "Read the server setup guide →"
    },
    video: {
      eyebrow: "01 / Introduction",
      title: "See Sparrow in action",
      lead:
        "See how Sparrow works on Android and explore its messaging features, from writing and sending a message to receiving one.",
      iframeTitle: "Sparrow video",
      posterBadge: "Sparrow Android video",
      posterTitle: "See how Sparrow works",
      posterSubtitle:
        "The video loads only after you press play.",
      playBtn: "▶ Play the video",
      watchExternal: "Watch on YouTube"
    },
    contribute: {
      eyebrow: "03 / Contribute",
      title: "Help to make Sparrow better",
      lead:
        "Sparrow is built in the open, and its future depends on people taking part. You don’t need to be a developer to help: you can run a server, improve the app, test new changes, or help cover project costs. Choose what fits your skills and time.",
      impactTitle: "What your contribution makes possible",
      impactLead:
        "More independently run servers give people more choices for message delivery. Code contributions and testing help improve the app, while financial support helps pay for test servers, development, and an independent security review. Every kind of help supports a more resilient, community-run messenger.",
      developersTitle: "Code contributions",
      developersLead:
        "Sparrow’s app and server code are public on GitHub. Developers can learn how the project works, fix problems, or suggest improvements. Browse the repository and open issues to see what the project is working on. If you’re unsure where to start, ask a question before tackling a larger change.",
      supportTitle: "Support the project",
      supportLead:
        "Donations help pay for test servers and development, and can help fund an independent security review. This is a separate way to help from contributing code, and donations support the project’s ongoing work.",
      communityTitle: "Community",
      communityLead:
        "You can help without writing code or running a server. Share your experience, ask questions, or report problems so we can learn what is confusing and what needs improvement. Use the contact button or report an issue on GitHub.",
      actions: {
        sponsor: "Support Sparrow",
        contributeCode: "Contribute code",
        donation: "Donate with PayPal",
        contact: "Get in touch"
      },
      links: {
        reportIssues: "Ask a question or report a problem",
        security: "How Sparrow protects your privacy"
      }
    },
    footer: {
      tagline: "Private chats, delivered by servers run by different communities.",
      copyright: "© 2026 Christian Bergmann · Sparrow",
      contact: "Contact",
      linksTitle: "Project",
      docsTitle: "Documentation",
      linkGithub: "GitHub Repository",
      linkReleases: "Releases",
      linkIssues: "Report a Bug",
      linkWebsiteRepo: "Website Repo",
      docHome: "Docs Home",
      docWhy: "Why Sparrow?",
      docServer: "Host a Server",
      docTransport: "Transport Flow"
    },
    modal: {
      close: "Close",
      placeholderBadge: "Configurable Placeholder",
      supporterTitle: "Supporter / Sponsorship Placeholder",
      supporterBody:
        "Add your GitHub Sponsors, Liberapay, Patreon, or Open Collective URL inside SPARROW_CONFIG.supporter in config.js.",
      contactTitle: "Get in touch",
      contactBody: "Email us at {email}. If your email app doesn’t open, copy the address.",
      contactAction: "Open email app",
      copyEmail: "Copy email address",
      emailCopied: "Email address copied"
    },
    common: {
      copy: "Copy command",
      copied: "Copied!"
    }
  },
  de: {
    pageTitle: "Sparrow — Deine Nachrichten bleiben privat",
    metaDescription:
      "Ein privater Messenger für Android. Nachrichten werden auf deinem Handy geschützt und über Server unabhängiger Gemeinschaften zugestellt.",
    nav: {
      features: "Das kann Sparrow",
      transport: "So funktioniert’s",
      docs: "Dokumentation",
      home: "Sparrow-Startseite",
      mainNavigation: "Hauptnavigation",
      mobileNavigation: "Mobile Navigation",
      languageSwitch: "Sprachauswahl",
      toggleNavigation: "Navigation umschalten",
      howItWorks: "So funktioniert’s",
      preview: "Einführung",
      contribute: "Beitragen",
      github: "GitHub"
    },
    hero: {
      title: "Deine Nachrichten bleiben privat.",
      logoAria: "Sparrow-Logo",
      subtitle:
        "Sparrow schützt deine Nachrichten auf deinem Handy, bevor du sie sendest. Unabhängige Gemeinschaften können bei der Zustellung helfen – so muss nicht ein einzelnes Unternehmen den ganzen Dienst betreiben.",
      ctaBeta: "Beta-Zugang anfragen",
      ctaHowItWorks: "So kommen Nachrichten an",
      ctaGithub: "Auf GitHub ansehen",
      ctaVideo: "Produktvideo ansehen",
      replayBtn: "Anflug wiederholen",
      sendHint: "Klicke auf das Sparrow-Logo",
      pillCrypto: "Nachrichten auf dem Handy geschützt",
      pillOnion: "Mehrere Stationen auf dem Weg",
      pillFederated: "Von verschiedenen Gemeinschaften betrieben",
      stack: {
        crypto: "Auf deinem Handy geschützt",
        onion: "Über mehrere Stationen weitergeleitet",
        mailboxes: "Wartet im Postfach",
        kotlin: "Android-App"
      }
    },
    about: {
      eyebrow: "Was ist Sparrow?",
      title: "Verschlüsselte Kommunikation ohne zentralen Pflichtserver",
      lead:
        "Klassische verschlüsselte Messenger setzen meist auf die Server eines einzelnen Anbieters. Sparrow verschlüsselt komplett auf dem Gerät und trennt die Infrastruktur in unabhängige Control Planes und von der Community betriebene Nodes.",
      statusTitle: "Ehrlicher Beta-Status",
      statusText:
        "Sparrow 1.0.0-beta.1 ist eine experimentelle öffentliche Beta für Android (API 29+). iOS-Quellcode existiert zwar im Kotlin-Multiplatform-Projekt, ist aber noch nicht nutzbar. Ein unabhängiges Sicherheitsaudit steht noch aus.",
      cards: [
        {
          title: "Clientseitige Kryptografie",
          desc: "Direktchats nutzen libsodium Sealed Boxes und Ed25519-Signaturen; Gruppen verwenden XChaCha20-Poly1305-IETF mit Epochen-Schlüsseln und SHA-256-Sicherheitsnummern."
        },
        {
          title: "Onion-Circuits & Decoys",
          desc: "Jede Mailbox-Anfrage wird geschichtet verpackt und über 1–5 Relays verschiedener Betreiber (Standard: 2) über 1–3 parallele Circuits sowie optionale Tarnpakete geleitet."
        },
        {
          title: "Offline-Mailboxen ohne Push",
          desc: "Kein Google- oder Apple-Push-Dienst nötig. Empfänger holen verschlüsselte, gepaddete Pakete (1–256 KiB) über ihre eigenen Circuits aus geschützten Postfächern."
        },
        {
          title: "Direkt- & Gruppenchats",
          desc: "Antworten, Bearbeiten, Löschen, Reaktionen, Tipp-Indikatoren, verschlüsselte Anhänge (Foto, Video, Datei, Standort, Kontakt) und QR-Schlüsselabgleich."
        },
        {
          title: "Umfragen, Ausgaben & SEPA",
          desc: "Gruppenumfragen mit optionaler Anonymität und Ablaufzeit, gemeinsame Ausgaben-Boards mit lokalem Beleg-OCR, Node-gecachten Wechselkursen und EPC/SEPA-QR."
        },
        {
          title: "Lokale Intelligenz & Sperre",
          desc: "Lokale Whisper-Sprachtranskription, optionale semantische Suche und Sicherheitsanalyse direkt auf dem Gerät, verschlüsselte Identitäts-Backups und App-Sperre."
        }
      ],
      compareTitle: "Was Sparrow unterscheidet",
      compareRows: [
        {
          label: "Vertrauensmodell",
          value: "Mehrere Control Planes + unabhängige Community Nodes mit automatischem Client-Failover."
        },
        {
          label: "Metadaten-Schutz",
          value: "Der Home-Node kennt deine IP, aber nicht das Ziel; Zwischen-Relays kennen nur den nächsten Hop; die Mailbox sieht deine IP nie."
        },
        {
          label: "Kein Tor-Ersatz",
          value: "Die Zahl der Relays ist noch klein und Betreiber geben sich selbst an. Gegen globale Beobachter bietet Sparrow keine volle Tor-Anonymität."
        }
      ],
      docsLink: "„What makes Sparrow different?“ lesen"
    },
    comm: {
      eyebrow: "02 / So kommen Nachrichten an",
      title: "Dein Handy schützt die Nachricht, bevor sie es verlässt.",
      lead:
        "Dein Handy schützt die Nachricht, bevor du sie sendest. Server leiten sie weiter, ohne sie lesen zu können. Im Postfach wartet sie, bis die andere Person sie abruft.",
      hopsLabel: "Stationen:",
      relayHops: "Anzahl der Stationen",
      decoysLabel: "Zusätzliche Nachrichten für mehr Privatsphäre",
      play: "Start",
      pause: "Pause",
      canvasLabels: {
        you: "Du",
        homeNode: "Erster Halt",
        relay: "Nächster Halt",
        mailbox: "Postfach der empfangenden Person",
        controlPlane: "Serverliste",
        community: "Gemeinschaft",
        decoy: "Zusatznachricht",
        layersRemaining: "Stationen übrig",
        e2eeLocked: "Nachricht bleibt geschützt"
      },
      steps: [
        {
          title: "01. Nachricht schützen",
          desc: "Dein Handy schützt die Nachricht, damit nur die Chat-Teilnehmenden sie lesen können."
        },
        {
          title: "02. Weiterleiten",
          desc: "Die Computer, die sie weiterleiten, können nicht lesen, was darin steht."
        },
        {
          title: "03. Im Postfach warten",
          desc: "Die andere Person kann die Nachricht abrufen, wenn es passt."
        },
        {
          title: "04. Einen anderen Weg finden",
          desc: "Wenn einer dieser Computer nicht verfügbar ist, kann Sparrow einen anderen Weg nehmen."
        }
      ],
      docsLink: "Mehr über den Weg einer Nachricht erfahren"
    },
    hosting: {
      title: "Einen Sparrow-Server mitbetreiben",
      lead:
        "Wenn du dich mit der Einrichtung von Computern auskennst, kannst du einen Server betreiben, der Nachrichten weiterleitet. Jeder unabhängig betriebene Server bietet dem Netzwerk einen weiteren Ort für die Zustellung. Das ist freiwillig – die meisten können Sparrow einfach auf Android nutzen.",
      cloneTitle: "Server-Dateien herunterladen",
      configureTitle: "Server einrichten",
      buildTitle: "Server starten",
      verifyTitle: "Prüfen, ob alles läuft",
      terminal: "Befehle",
      configureNoteBefore: "Kopiere ",
      configureNoteMiddle: " nach ",
      configureNoteAfter:
        " und trage die Internetadresse deines Servers ein. Die sichere Verbindung wird automatisch eingerichtet.",
      buildNote:
        "Damit startest du die Programme, die Nachrichten weiterleiten und die Verbindung sichern.",
      verifyNoteBefore: "Wenn alles funktioniert, erscheint ",
      verifyNoteAfter:
        ". Das bedeutet, dass dein Server erreichbar ist.",
      docsLink: "Anleitung zum Einrichten eines Servers lesen →"
    },
    video: {
      eyebrow: "01 / Einführung",
      title: "Sparrow in Aktion",
      lead:
        "Entdecke Sparrow auf Android und seine Nachrichtenfunktionen – vom Schreiben und Senden bis zum Empfangen einer Nachricht.",
      iframeTitle: "Sparrow-Video",
      posterBadge: "Sparrow für Android",
      posterTitle: "So funktioniert Sparrow",
      posterSubtitle:
        "Das Video wird erst geladen, wenn du auf Abspielen klickst.",
      playBtn: "▶ Video abspielen",
      watchExternal: "Auf YouTube ansehen"
    },
    contribute: {
      eyebrow: "03 / Beitragen",
      title: "Hilf mit, Sparrow zu verbessern",
      lead:
        "Sparrow wird offen entwickelt und seine Zukunft hängt davon ab, dass Menschen mitmachen. Du musst nicht programmieren können: Du kannst einen Server betreiben, die App verbessern, neue Änderungen testen oder Kosten mittragen. Such dir aus, was zu deinen Fähigkeiten und deiner Zeit passt.",
      impactTitle: "Was dein Beitrag möglich macht",
      impactLead:
        "Mehr unabhängig betriebene Server bieten mehr Wege, Nachrichten zuzustellen. Code-Beiträge und Tests helfen, die App zu verbessern. Finanzielle Unterstützung deckt Kosten für Testserver und Entwicklung und kann eine unabhängige Sicherheitsprüfung ermöglichen. Jede Art von Hilfe stärkt einen Messenger, den verschiedene Gemeinschaften mittragen.",
      developersTitle: "Code-Beiträge",
      developersLead:
        "Der Code für Sparrow-App und Server ist öffentlich auf GitHub. Entwicklerinnen und Entwickler können lernen, wie das Projekt funktioniert, Fehler beheben oder Verbesserungen vorschlagen. In Repository und offenen Issues siehst du, woran gerade gearbeitet wird. Wenn du nicht weißt, wo du anfangen sollst, stell erst eine Frage, bevor du größere Änderungen angehst.",
      supportTitle: "Das Projekt unterstützen",
      supportLead:
        "Spenden helfen bei den Kosten für Testserver und Weiterentwicklung und können eine unabhängige Sicherheitsprüfung finanzieren. Das ist eine eigene Möglichkeit zu helfen – getrennt von Code-Beiträgen – und unterstützt die laufende Arbeit am Projekt.",
      communityTitle: "Community",
      communityLead:
        "Du kannst auch ohne Code oder eigenen Server helfen. Teile deine Erfahrungen, stelle Fragen oder melde Probleme, damit wir erfahren, was unklar ist und verbessert werden sollte. Nutze den Kontakt-Button oder melde ein Problem auf GitHub.",
      actions: {
        sponsor: "Sparrow unterstützen",
        contributeCode: "Am Code mitarbeiten",
        donation: "Mit PayPal spenden",
        contact: "Kontakt aufnehmen"
      },
      links: {
        reportIssues: "Frage stellen oder Problem melden",
        security: "So schützt Sparrow deine Privatsphäre"
      }
    },
    footer: {
      tagline: "Private Nachrichten, zugestellt über Server unabhängiger Gemeinschaften.",
      copyright: "© 2026 Christian Bergmann · Sparrow",
      contact: "Kontakt",
      linksTitle: "Projekt",
      docsTitle: "Dokumentation",
      linkGithub: "GitHub-Repository",
      linkReleases: "Releases",
      linkIssues: "Fehler melden",
      linkWebsiteRepo: "Website-Repo",
      docHome: "Docs Startseite",
      docWhy: "Warum Sparrow?",
      docServer: "Server hosten",
      docTransport: "Transport-Ablauf"
    },
    modal: {
      close: "Schließen",
      placeholderBadge: "Konfigurierbarer Platzhalter",
      supporterTitle: "Platzhalter für Supporter-Link",
      supporterBody:
        "Hinterlege deine URL zu GitHub Sponsors, Liberapay, Patreon oder Open Collective in config.js unter SPARROW_CONFIG.supporter.",
      contactTitle: "Kontakt aufnehmen",
      contactBody:
        "Schreib uns an {email}. Falls sich kein E-Mail-Programm öffnet, kannst du die Adresse kopieren.",
      contactAction: "E-Mail-App öffnen",
      copyEmail: "E-Mail-Adresse kopieren",
      emailCopied: "E-Mail-Adresse kopiert"
    },
    common: {
      copy: "Befehl kopieren",
      copied: "Kopiert!"
    }
  }
};
