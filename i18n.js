export const TRANSLATIONS = {
  en: {
    pageTitle: "Sparrow — Messages that leave no trail",
    metaDescription:
      "End-to-end encrypted messaging with a federated, independently hostable transport network built with Kotlin Multiplatform.",
    nav: {
      features: "Features",
      howItWorks: "How it works",
      video: "Video",
      beta: "Beta Test",
      support: "Support",
      github: "GitHub"
    },
    hero: {
      badge: "Public Beta · v1.0.0-beta.1 · Android",
      title: "Messages that leave no trail.",
      subtitle:
        "End-to-end encrypted messaging built with Kotlin Multiplatform and a federated, independently hostable network of Community Nodes — so no single server or operator controls your communication.",
      ctaBeta: "Join Beta Test",
      ctaGithub: "View on GitHub",
      ctaVideo: "Watch product video",
      replayBtn: "Replay flight",
      sendHint: "Click Sparrow to pulse",
      pillCrypto: "libsodium E2EE",
      pillOnion: "1–5 Hop Onion Circuits",
      pillFederated: "Self-Hostable Nodes"
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
      eyebrow: "How Communication Works",
      title: "Wrapped in layers. Delivered without exposing both ends.",
      lead:
        "Every message stays encrypted end-to-end on your device, travels through relays of different operators, and lands in a recipient-selected mailbox.",
      hopsLabel: "Circuit hops:",
      decoysLabel: "Decoy envelopes",
      play: "Play",
      pause: "Pause",
      canvasLabels: {
        you: "You",
        homeNode: "Home Node",
        relay: "Relay",
        mailbox: "Mailbox Node",
        controlPlane: "Control Plane (2-hop discovery)",
        decoy: "Decoy",
        layersRemaining: "Onion layers",
        e2eeLocked: "E2EE envelope stored"
      },
      steps: [
        {
          title: "1. Encrypt & Pad on Device",
          desc: "Your device encrypts the message for the recipient (libsodium) and pads it to fixed size classes (1–256 KiB) so packet sizes stay uniform."
        },
        {
          title: "2. Multi-Hop Onion Circuit",
          desc: "Your app wraps the request in onion layers through 1–5 relays of different operators. Each relay peels one layer and only knows the next hop."
        },
        {
          title: "3. Recipient Mailbox & Decoys",
          desc: "The padded ciphertext lands in the recipient’s mailbox without sender or recipient IDs. Optional decoy envelopes mask timing across contacts."
        },
        {
          title: "4. Federated Discovery & Failover",
          desc: "Control Planes provide signed node directories and alias routes (queried via 2 relays). If a node drops, your app automatically fails over."
        }
      ],
      docsLink: "Explore transport architecture in the docs"
    },
    video: {
      eyebrow: "Product Video",
      title: "See Sparrow in action",
      lead:
        "A walkthrough of Sparrow’s Android beta, onboarding tour, encrypted messaging, and onion-routed transport.",
      posterBadge: "Sparrow 1.0 Beta Walkthrough",
      posterTitle: "Watch the Sparrow Product Video",
      posterSubtitle:
        "Click to load the privacy-enhanced YouTube embed (youtube-nocookie.com), or open directly on YouTube.",
      playBtn: "Load & Play Video",
      watchExternal: "Watch on YouTube"
    },
    beta: {
      eyebrow: "Beta Testing",
      title: "Try the Android Beta",
      lead:
        "Sparrow 1.0.0-beta.1 is available for Android (API 29+). Test federated messaging, try out multi-hop onion circuits, and help shape the 1.0 release.",
      note: "Beta tip: Keep an encrypted identity backup (Settings → Identity) so you can restore your keys across updates.",
      ctaBeta: "Join Beta Test (Placeholder)",
      ctaReleases: "GitHub Releases (APK)",
      placeholderTag: "Placeholder link · configure in config.js"
    },
    support: {
      eyebrow: "Support the Project",
      title: "Help keep Sparrow independent",
      lead:
        "A federated messenger gets stronger with every independent node operator, tester, contributor, and supporter.",
      host: {
        badge: "Infrastructure",
        title: "Host a Community Node",
        desc: "More independent operators mean real multi-hop diversity and stronger failover. Deploy the unified Docker + Ktor + Caddy server bundle on Windows, Linux, or macOS.",
        ctaPrimary: "Server Hosting Docs",
        ctaSecondary: "Server Architecture"
      },
      coffee: {
        badge: "Quick Support",
        title: "Buy Me a Coffee",
        desc: "Building a clean, independent messenger takes late nights and lots of espresso. Send a quick one-time thank-you to keep development moving.",
        cta: "Buy Me a Coffee"
      },
      collab: {
        badge: "Collaboration",
        title: "Collaborate & Contact",
        desc: "Interested in Kotlin Multiplatform, cryptography, security reviews, translations, or running relay infrastructure? Reach out or open an issue.",
        ctaEmail: "Contact / Email",
        ctaIssues: "GitHub Issues"
      },
      sponsor: {
        badge: "Sustaining Backer",
        title: "Become a Supporter",
        desc: "Support Sparrow financially on a recurring basis to help fund test infrastructure, servers, and an eventual independent security audit.",
        cta: "Become a Supporter"
      }
    },
    footer: {
      tagline: "End-to-end encrypted messaging on a federated network.",
      copyright: "© 2026 Christian Bergmann · Sparrow",
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
      betaTitle: "Beta Test Link Placeholder",
      betaBody:
        "This button is ready for your beta signup or distribution URL (e.g. Google Play Closed Testing, Firebase App Distribution, or a registration form). Update SPARROW_CONFIG.betaTest in config.js when ready — or grab the latest APK directly from GitHub Releases.",
      betaAction: "Open GitHub Releases",
      coffeeTitle: "Buy Me a Coffee Placeholder",
      coffeeBody:
        "Add your Buy Me a Coffee, Ko-fi, or PayPal link inside SPARROW_CONFIG.buyMeACoffee in config.js to connect this button.",
      supporterTitle: "Supporter / Sponsorship Placeholder",
      supporterBody:
        "Add your GitHub Sponsors, Liberapay, Patreon, or Open Collective URL inside SPARROW_CONFIG.supporter in config.js.",
      contactTitle: "Collaboration Contact Placeholder",
      contactBody:
        "Set your preferred contact email or Matrix/chat handle inside SPARROW_CONFIG.contact in config.js, or direct collaborators to GitHub Issues."
    }
  },
  de: {
    pageTitle: "Sparrow — Nachrichten, die keine Spur hinterlassen",
    metaDescription:
      "Ende-zu-Ende-verschlüsselter Messenger auf einem föderierten, selbst hostbaren Netzwerk aus Kotlin Multiplatform und Ktor.",
    nav: {
      features: "Funktionen",
      howItWorks: "Funktionsweise",
      video: "Video",
      beta: "Beta-Test",
      support: "Unterstützen",
      github: "GitHub"
    },
    hero: {
      badge: "Öffentliche Beta · v1.0.0-beta.1 · Android",
      title: "Nachrichten, die keine Spur hinterlassen.",
      subtitle:
        "Ende-zu-Ende-verschlüsseltes Messaging mit Kotlin Multiplatform und einem föderierten, unabhängig betreibbaren Netzwerk aus Community Nodes – ohne Abhängigkeit von einem einzelnen Betreiber.",
      ctaBeta: "Am Beta-Test teilnehmen",
      ctaGithub: "Auf GitHub ansehen",
      ctaVideo: "Produktvideo ansehen",
      replayBtn: "Anflug wiederholen",
      sendHint: "Klicke auf Sparrow",
      pillCrypto: "libsodium E2EE",
      pillOnion: "1–5 Hop Onion-Circuits",
      pillFederated: "Selbst hostbare Nodes"
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
      eyebrow: "Wie die Kommunikation funktioniert",
      title: "In Schichten verpackt. Zugestellt, ohne beide Enden preiszugeben.",
      lead:
        "Jede Nachricht bleibt Ende-zu-Ende-verschlüsselt auf deinem Gerät, wandert durch Relays verschiedener Betreiber und landet in einer vom Empfänger gewählten Mailbox.",
      hopsLabel: "Circuit-Hops:",
      decoysLabel: "Tarnpakete (Decoys)",
      play: "Start",
      pause: "Pause",
      canvasLabels: {
        you: "Du",
        homeNode: "Home-Node",
        relay: "Relay",
        mailbox: "Mailbox-Node",
        controlPlane: "Control Plane (2-Hop-Discovery)",
        decoy: "Decoy",
        layersRemaining: "Onion-Schichten",
        e2eeLocked: "E2EE-Paket gespeichert"
      },
      steps: [
        {
          title: "1. Verschlüsseln & Padding auf dem Gerät",
          desc: "Deine App verschlüsselt die Nachricht lokal (libsodium) und füllt sie auf feste Größenklassen (1–256 KiB) auf, um Paketgrößen zu vereinheitlichen."
        },
        {
          title: "2. Multi-Hop Onion-Circuit",
          desc: "Die Anfrage wird in Schichten verpackt und über 1–5 Relays unterschiedlicher Betreiber gesendet. Jedes Relay entfernt eine Schicht und kennt nur den nächsten Schritt."
        },
        {
          title: "3. Empfänger-Mailbox & Decoys",
          desc: "Der verschlüsselte Umschlag landet ohne Absender- oder Empfänger-ID in der Mailbox. Optionale Tarnpakete verschleiern Timing-Muster."
        },
        {
          title: "4. Föderierte Suche & Failover",
          desc: "Control Planes liefern signierte Node-Verzeichnisse und Alias-Routen (über 2 Relays abgefragt). Fällt ein Node aus, wechselt die App automatisch."
        }
      ],
      docsLink: "Transport-Architektur in den Docs ansehen"
    },
    video: {
      eyebrow: "Produktvideo",
      title: "Sparrow in Aktion",
      lead:
        "Ein Einblick in die Android-Beta, die interaktive Onboarding-Tour, verschlüsselte Chats und das Onion-Routing.",
      posterBadge: "Sparrow 1.0 Beta Walkthrough",
      posterTitle: "Sparrow Produktvideo ansehen",
      posterSubtitle:
        "Klicke, um den datenschutzfreundlichen YouTube-Embed (youtube-nocookie.com) zu laden, oder öffne das Video direkt auf YouTube.",
      playBtn: "Video laden & abspielen",
      watchExternal: "Auf YouTube ansehen"
    },
    beta: {
      eyebrow: "Beta-Test",
      title: "Android-Beta ausprobieren",
      lead:
        "Sparrow 1.0.0-beta.1 steht für Android (API 29+) bereit. Teste föderiertes Messaging, probiere Multi-Hop-Onion-Circuits aus und hilf mit Feedback für Version 1.0.",
      note: "Beta-Hinweis: Erstelle ein verschlüsseltes Identitäts-Backup (Einstellungen → Identität), um deine Schlüssel bei Updates wiederherstellen zu können.",
      ctaBeta: "Am Beta-Test teilnehmen (Platzhalter)",
      ctaReleases: "GitHub Releases (APK)",
      placeholderTag: "Platzhalter-Link · konfigurierbar in config.js"
    },
    support: {
      eyebrow: "Projekt unterstützen",
      title: "Hilf mit, Sparrow unabhängig zu halten",
      lead:
        "Ein föderierter Messenger wird mit jedem unabhängigen Serverbetreiber, Tester, Mitwirkenden und Unterstützer stärker.",
      host: {
        badge: "Infrastruktur",
        title: "Einen Community-Node hosten",
        desc: "Mehr unabhängige Betreiber sorgen für echte Multi-Hop-Vielfalt und Ausfallsicherheit. Starte das fertige Docker- + Ktor- + Caddy-Serverpaket auf Windows, Linux oder macOS.",
        ctaPrimary: "Server-Anleitung (Docs)",
        ctaSecondary: "Server-Architektur"
      },
      coffee: {
        badge: "Kleine Geste",
        title: "Buy Me a Coffee",
        desc: "Die Entwicklung eines unabhängigen Messengers kostet unzählige Abende und viel Kaffee. Mit einem kleinen Beitrag unterstützt du die Weiterentwicklung direkt.",
        cta: "Buy Me a Coffee"
      },
      collab: {
        badge: "Zusammenarbeit",
        title: "Mitwirken & Kontakt",
        desc: "Du interessierst dich für Kotlin Multiplatform, Kryptografie, Security-Reviews, Übersetzungen oder den Betrieb eigener Relays? Melde dich oder eröffne ein Issue.",
        ctaEmail: "Kontakt / E-Mail",
        ctaIssues: "GitHub Issues"
      },
      sponsor: {
        badge: "Förderer werden",
        title: "Supporter werden",
        desc: "Unterstütze Sparrow regelmäßig finanziell, um Test-Infrastruktur, Serverkosten und ein künftiges unabhängiges Sicherheitsaudit zu ermöglichen.",
        cta: "Supporter werden"
      }
    },
    footer: {
      tagline: "Ende-zu-Ende-verschlüsseltes Messaging in einem föderierten Netzwerk.",
      copyright: "© 2026 Christian Bergmann · Sparrow",
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
      betaTitle: "Platzhalter für Beta-Test-Link",
      betaBody:
        "Dieser Button ist für deinen Beta-Anmelde- oder Test-Link vorbereitet (z. B. Google Play Closed Testing, Firebase App Distribution oder ein Formular). Trage die URL in config.js unter SPARROW_CONFIG.betaTest ein – oder lade die APK direkt über GitHub Releases.",
      betaAction: "GitHub Releases öffnen",
      coffeeTitle: "Platzhalter für Buy Me a Coffee",
      coffeeBody:
        "Hinterlege deinen Link zu Buy Me a Coffee, Ko-fi oder PayPal in config.js unter SPARROW_CONFIG.buyMeACoffee, um diesen Button direkt zu verknüpfen.",
      supporterTitle: "Platzhalter für Supporter-Link",
      supporterBody:
        "Hinterlege deine URL zu GitHub Sponsors, Liberapay, Patreon oder Open Collective in config.js unter SPARROW_CONFIG.supporter.",
      contactTitle: "Platzhalter für Kontakt-Link",
      contactBody:
        "Trage deine gewünschte Kontakt-E-Mail oder Adresse in config.js unter SPARROW_CONFIG.contact ein oder leite Mitwirkende direkt zu GitHub Issues."
    }
  }
};
