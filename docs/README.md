# Mall.TV pro tvOS
Neoficiální klient Mall.TV pro Apple TV umožňující sledování videoobsahu veřejně přístupné internetové televize Mall.TV. Postaven s použitím React a [tvdml](https://github.com/a-ignatov-parc/tvdml) frameworku.

Aplikace bude vyvíjena dokud Mall.TV nepřijde se svoji oficiální verzí pro Apple TV. Cílem tohoto projektu je ukázat jednoduchost tvorby aplikací pro tvOS ve snaze přinést na platformu české aplikace a český obsah. Vítám Mall.TV pokud by chtěla použít jakoukoliv část kódu, uzná-li za vhodné.

Problémy hlašte v Issues.

<img src="docs/img/malltv_homepage_light.jpg" width="400"> <img src="docs/img/malltv_homepage_dark.jpg" width="400">
<img src="docs/img/malltv_search.jpg" width="400">
<img src="docs/img/malltv_channel.jpg" width="400">
<img src="docs/img/malltv_show.jpg" width="400">

### Jak tedy aplikaci spustit?
Stačí zkompilovat projekt ve složce native v Xcode a poslat na Apple TV.

Javascriptovou část aplikace hostuji zde na githubu ve složce docs, tedy při případném updatu aplikace postačí vypnout/zapnout aplikaci na Apple TV. Není třeba znovu kompilovat.

Případně mi můžete poslat soukromou zprávu na fórum http://www.xbmc-kodi.cz/prispevek-apple-tv-malltv-pro-tvos nebo do facebookové skupiny Apple TV CZ/SK a přidám vás rád do TestFlightu.

<hr /> 

### Struktura projektu
Projekt je rozdělený do 2 částí

- native: tato složka obsahuje Xcode projekt. Soubor AppDelegate.swift se stará o nastavení TVMLKit frameworku a spuštění JavaScriptové aplikace. Nativní část se měnit nebude, výhoda pro uživatele je tedy, že aplikaci bude muset zkompilovat jen jednou.

- src: tato složka obsahuje JavaScript část zdrojových souborů aplikace. Po spuštění `npm run dist` se vytvoří složka dist, která v sobě obsahuje zabalenou JS část aplikace. Tato složka běží na webovém serveru a načítá se při každém spuštění aplikace na Apple TV.

### Jak začít s vývojem

Pokud máte nainstalovnaný [nodejs](https://nodejs.org/) a [npm](https://www.npmjs.com/) stačí spustit následující příkazy ve složce s projektem:

```shell
$ npm install                  # nainstaluje všechny závislosti z package.json
```

### Spuštění testovacího webserveru
Zkompiluje .js aplikaci a spustí výchozí webserver na portu 9001. Server hlídá změny a při každém uložení zdrojového souboru znovu překompiluje aplikaci.

```shell
$ npm run serve                   # Spustí se webpack-dev-server
```

### Načtení aplikace z testovacího webserveru
V Xcode projektu v souboru AppDelegate.swift odkomentujte řádek s proměnnou tvBaseURL, která odkazuje na localhost. např:

```swift
    // static let tvBaseURL = "https://marhycz.github.io/ivysilani_tvOS/app/"
    static let tvBaseURL = "http://localhost:9001/"
```

Pak stačí jen projekt spustit a tvOS načte aplikaci z běžícího lokálního webového serveru.
